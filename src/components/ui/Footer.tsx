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

        <div className="flex justify-center gap-3 mb-8">
          <a
            href="https://www.facebook.com/profile.php?id=61590539004345"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook Studio Code Art"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-opacity duration-200 hover:opacity-70"
            style={{ border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>
          <a
            href="https://www.instagram.com/studiocodeart_/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Studio Code Art"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-opacity duration-200 hover:opacity-70"
            style={{ border: "1px solid rgba(201,168,76,0.3)", color: "#C9A84C" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
        </div>

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
