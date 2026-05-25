const NAV_LINKS = [
  { label: "Realizacje", href: "#portfolio" },
  { label: "Proces", href: "#proces" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#formularz" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-12 px-6"
      style={{
        background: "#04060C",
        borderTop: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <div className="max-w-5xl mx-auto">
        <nav
          aria-label="Footer"
          className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-10"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="footer-link text-sm"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-center">
          <p
            className="font-heading font-bold text-lg mb-1"
            style={{
              background:
                "linear-gradient(135deg, #C9A84C 0%, #F0D060 50%, #C9A84C 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Studio Code Art
          </p>
          <p className="text-sm mb-5" style={{ color: "#334155" }}>
            Profesjonalne strony internetowe dla firm · Polska
          </p>
          <div className="divider-gold max-w-xs mx-auto mb-5" />
          <p className="text-xs mb-2" style={{ color: "#1E293B" }}>
            © {year} Studio Code Art. Wszelkie prawa zastrzeżone.
          </p>
          <a
            href="/polityka-prywatnosci"
            className="footer-legal text-xs"
          >
            Polityka prywatności
          </a>
        </div>
      </div>
    </footer>
  );
}
