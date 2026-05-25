const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://studiocodeart.pl";

const NAV_LINKS = [
  { label: "Realizacje", href: "#portfolio" },
  { label: "Proces", href: "#proces" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#formularz" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 border-t border-slate-800 py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-slate-400 hover:text-amber-400 text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="text-center">
          <p className="text-slate-300 font-semibold mb-1">Studio Code Art</p>
          <p className="text-slate-500 text-sm mb-4">
            Profesjonalne strony internetowe dla firm · Polska
          </p>
          <p className="text-slate-600 text-xs">
            © {year} Studio Code Art. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
