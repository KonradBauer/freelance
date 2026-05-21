import ContactForm from "@/components/ui/ContactForm";

export default function ContactFormSection() {
  return (
    <section id="formularz" className="bg-white py-20 px-6">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {/* TODO: naglowek formularza */}
            Napisz do mnie, oddzwonie dzis
          </h2>
          <p className="text-slate-600 text-lg">
            {/* TODO: sub-naglowek formularza */}
            Wypelnij formularz. Skontaktuje sie w ciagu 24 godzin i omowimy
            Twoj projekt bez zobowiazan.
          </p>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
