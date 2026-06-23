"use client";

import { useEffect, useRef } from "react";
import { Bubble } from "@typebot.io/react";

// Replace with actual bot ID from cloud.typebot.io after Typebot setup (Unit 1)
const TYPEBOT_ID = "lead-kwalifikacja";

export default function LeadChatbot() {
  const hasScrolled50 = useRef(false);
  const hasWaited20s = useRef(false);
  const triggered = useRef(false);

  useEffect(() => {
    if (
      sessionStorage.getItem("chatbotShown") === "1" ||
      sessionStorage.getItem("formSubmitted") === "1"
    ) {
      return;
    }

    if (window.innerWidth < 768) return;

    const isReturnVisitor = localStorage.getItem("chatbotVisited") === "1";
    localStorage.setItem("chatbotVisited", "1");

    function triggerOpen() {
      if (triggered.current) return;
      triggered.current = true;
      import("@typebot.io/js").then(({ open }) => {
        open();
        sessionStorage.setItem("chatbotShown", "1");
      });
    }

    if (isReturnVisitor) {
      triggerOpen();
      return;
    }

    const timerId = setTimeout(() => {
      hasWaited20s.current = true;
      if (hasScrolled50.current) triggerOpen();
    }, 20000);

    function handleScroll() {
      if (hasScrolled50.current) return;
      const total = document.body.scrollHeight - window.innerHeight;
      if (total > 0 && window.scrollY / total >= 0.5) {
        hasScrolled50.current = true;
        if (hasWaited20s.current) triggerOpen();
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timerId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Bubble
      typebot={TYPEBOT_ID}
      theme={{
        button: { backgroundColor: "#C9A84C" },
        chatWindow: { backgroundColor: "#060A14" },
      }}
      onOpen={() => sessionStorage.setItem("chatbotShown", "1")}
    />
  );
}
