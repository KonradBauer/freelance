"use client";

import { useEffect, useRef } from "react";

const GOLD: [number, number, number] = [201, 168, 76];
const INDIGO: [number, number, number] = [99, 102, 241];

type NodeKind = "cpu" | "cache" | "ram" | "io" | "node";

interface CNode {
  x: number;
  y: number;
  kind: NodeKind;
  label?: string;
  pulse: number;
}

interface Packet {
  route: number[];
  step: number;
  t: number;
  speed: number;
  rgb: [number, number, number];
}

const W = 480;
const H = 320;

// Fixed circuit topology
const NODES: CNode[] = [
  { x: 240, y: 155, kind: "cpu",   label: "CPU",  pulse: 0 }, // 0
  { x: 155, y: 155, kind: "cache", label: "L1",   pulse: 0 }, // 1
  { x: 325, y: 155, kind: "cache", label: "L1",   pulse: 0 }, // 2
  { x:  52, y: 155, kind: "ram",   label: "RAM",  pulse: 0 }, // 3
  { x: 428, y: 155, kind: "ram",   label: "RAM",  pulse: 0 }, // 4
  { x: 240, y:  52, kind: "io",    label: "I/O",  pulse: 0 }, // 5
  { x: 240, y: 258, kind: "io",    label: "I/O",  pulse: 0 }, // 6
  { x: 155, y:  52, kind: "node",  pulse: 0 },               // 7
  { x: 325, y:  52, kind: "node",  pulse: 0 },               // 8
  { x: 155, y: 258, kind: "node",  pulse: 0 },               // 9
  { x: 325, y: 258, kind: "node",  pulse: 0 },               // 10
  { x:  52, y:  52, kind: "node",  pulse: 0 },               // 11
  { x: 428, y:  52, kind: "node",  pulse: 0 },               // 12
  { x:  52, y: 258, kind: "node",  pulse: 0 },               // 13
  { x: 428, y: 258, kind: "node",  pulse: 0 },               // 14
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2],               // CPU ↔ caches
  [1, 3], [2, 4],               // cache ↔ RAM
  [0, 5], [0, 6],               // CPU ↔ I/O
  [1, 7], [2, 8],               // cache ↔ upper junctions
  [1, 9], [2, 10],              // cache ↔ lower junctions
  [7, 11], [8, 12],             // upper junctions → corners
  [9, 13], [10, 14],            // lower junctions → corners
  [11, 12], [13, 14],           // top / bottom border
  [11, 13], [12, 14],           // left / right border
  [7, 8], [9, 10],              // inner horizontal
  [5, 7], [5, 8], [6, 9], [6, 10], // I/O → junctions
  [3, 11], [3, 13], [4, 12], [4, 14], // RAM → corners
];

// Every step must be a connected edge pair
const ROUTES: number[][] = [
  [11, 7, 1, 0, 2, 4],
  [4, 2, 0, 1, 3],
  [3, 1, 0, 5, 7, 11],
  [13, 9, 6, 0, 2, 10, 14],
  [0, 2, 10, 6, 9, 1],
  [12, 8, 5, 0, 6, 10, 14],
  [14, 10, 2, 0, 1, 7, 5],
  [11, 13, 9, 1, 0, 2, 8, 12],
  [5, 0, 6, 9, 13],
  [3, 11, 7, 5, 0, 2, 4],
];

export default function CircuitAnimation({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);

    const nodes: CNode[] = NODES.map((n) => ({ ...n }));
    const packets: Packet[] = [];
    let lastSpawn = 0;
    let raf: number;

    function spawn() {
      if (packets.length >= 9) return;
      const route = ROUTES[Math.floor(Math.random() * ROUTES.length)];
      packets.push({
        route: [...route],
        step: 0,
        t: Math.random() * 0.3, // stagger start
        speed: 0.009 + Math.random() * 0.007,
        rgb: Math.random() > 0.45 ? GOLD : INDIGO,
      });
    }

    function radialGlow(
      x: number,
      y: number,
      r: number,
      rgb: [number, number, number],
      a: number
    ) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(${rgb},${a})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }

    function frame(ts: number) {
      ctx.clearRect(0, 0, W, H);

      if (ts - lastSpawn > 480) {
        spawn();
        lastSpawn = ts;
      }

      // ── Edges ──
      ctx.strokeStyle = "rgba(201,168,76,0.13)";
      ctx.lineWidth = 1;
      for (const [a, b] of EDGES) {
        ctx.beginPath();
        ctx.moveTo(nodes[a].x, nodes[a].y);
        ctx.lineTo(nodes[b].x, nodes[b].y);
        ctx.stroke();
      }

      // ── Nodes ──
      for (const n of nodes) {
        // Expanding pulse ring
        if (n.pulse > 0) {
          const pr = (1 - n.pulse) * 20 + 5;
          ctx.beginPath();
          ctx.arc(n.x, n.y, pr, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(201,168,76,${n.pulse * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          n.pulse -= 0.02;
          if (n.pulse < 0) n.pulse = 0;
        }

        if (n.kind === "cpu") {
          const w = 52, h = 36;
          radialGlow(n.x, n.y, 48, GOLD, 0.06);
          ctx.fillStyle = "rgba(201,168,76,0.07)";
          ctx.fillRect(n.x - w / 2, n.y - h / 2, w, h);
          ctx.strokeStyle = "rgba(201,168,76,0.65)";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(n.x - w / 2, n.y - h / 2, w, h);
          // inner grid lines
          ctx.strokeStyle = "rgba(201,168,76,0.15)";
          ctx.lineWidth = 0.5;
          for (let gx = 1; gx < 4; gx++) {
            ctx.beginPath();
            ctx.moveTo(n.x - w / 2 + (w / 4) * gx, n.y - h / 2);
            ctx.lineTo(n.x - w / 2 + (w / 4) * gx, n.y + h / 2);
            ctx.stroke();
          }
          for (let gy = 1; gy < 3; gy++) {
            ctx.beginPath();
            ctx.moveTo(n.x - w / 2, n.y - h / 2 + (h / 3) * gy);
            ctx.lineTo(n.x + w / 2, n.y - h / 2 + (h / 3) * gy);
            ctx.stroke();
          }
          ctx.fillStyle = "rgba(201,168,76,0.9)";
          ctx.font = "bold 9px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText("CPU", n.x, n.y);
        } else if (n.kind === "cache") {
          const w = 28, h = 20;
          ctx.fillStyle = "rgba(201,168,76,0.05)";
          ctx.fillRect(n.x - w / 2, n.y - h / 2, w, h);
          ctx.strokeStyle = "rgba(201,168,76,0.38)";
          ctx.lineWidth = 1;
          ctx.strokeRect(n.x - w / 2, n.y - h / 2, w, h);
          ctx.fillStyle = "rgba(201,168,76,0.75)";
          ctx.font = "7px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(n.label!, n.x, n.y);
        } else if (n.kind === "ram" || n.kind === "io") {
          const r = 12;
          radialGlow(n.x, n.y, r * 2.5, GOLD, 0.07);
          ctx.beginPath();
          ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(201,168,76,0.07)";
          ctx.fill();
          ctx.strokeStyle = "rgba(201,168,76,0.48)";
          ctx.lineWidth = 1.2;
          ctx.stroke();
          ctx.fillStyle = "rgba(201,168,76,0.82)";
          ctx.font = "6px monospace";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(n.label!, n.x, n.y);
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(201,168,76,0.22)";
          ctx.fill();
        }
      }

      // ── Packets ──
      for (let i = packets.length - 1; i >= 0; i--) {
        const p = packets[i];
        p.t += p.speed;

        if (p.t >= 1) {
          p.step++;
          p.t = 0;
          if (p.step >= p.route.length - 1) {
            packets.splice(i, 1);
            continue;
          }
          // Trigger pulse on arrival node
          nodes[p.route[p.step]].pulse = 1;
        }

        const from = nodes[p.route[p.step]];
        const to = nodes[p.route[p.step + 1]];
        const px = from.x + (to.x - from.x) * p.t;
        const py = from.y + (to.y - from.y) * p.t;

        // Trail
        radialGlow(px, py, 10, p.rgb, 0.45);
        // Core dot
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.rgb},1)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    for (let i = 0; i < 5; i++) spawn();
    raf = requestAnimationFrame(frame);

    return () => cancelAnimationFrame(raf);
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}
