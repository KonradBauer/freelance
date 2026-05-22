import ContactForm from "@/components/ui/ContactForm";

export default function ContactFormSection() {
  return (
    <section id="formularz" className="bg-white py-20 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Napisz do mnie — oddzwonię dziś
          </h2>
          <p className="text-slate-600 text-lg">
            Wypełnij formularz. Skontaktuję się w ciągu 24 godzin i omówimy
            Twój projekt bez zobowiązań.
          </p>
        </div>

        <ContactForm />

        <div className="mt-10 pt-8 border-t border-slate-100 text-center">
          <p className="text-slate-500 text-sm mb-4">Wolisz szybki kontakt?</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+48781573274"
              className="inline-flex items-center justify-center gap-2 border border-slate-200 text-slate-700 font-semibold px-6 py-3 rounded-xl hover:border-slate-300 hover:bg-slate-50 transition-colors duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              +48 781 573 274
            </a>
          </div>
        </div>

        <address className="mt-8 text-center text-slate-500 text-sm not-italic">
          <p>Studio Code Art</p>
        </address>
      </div>
    </section>
  );
}
