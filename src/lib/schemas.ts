import { z } from "zod";

export const INDUSTRIES = [
  "Restauracja / gastronomia",
  "Budownictwo / remonty",
  "Uroda / kosmetyka",
  "Ślub / event",
  "Meble / wnętrza",
  "Zdrowie / medycyna",
  "Usługi lokalne",
  "Inna branża",
] as const;

export const BUDGETS = [
  "do 1500 zł",
  "1500-3000 zł",
  "3000-6000 zł",
  "6000+ zł",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Imię musi mieć min. 2 znaki")
    .max(100, "Za długie imię"),
  phone: z
    .string()
    .regex(
      /^(\+48[\s]?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$/,
      "Podaj prawidłowy numer telefonu (9 cyfr)"
    ),
  industry: z.enum(INDUSTRIES, {
    errorMap: () => ({ message: "Wybierz branżę z listy" }),
  }),
  budget: z.enum(BUDGETS, {
    errorMap: () => ({ message: "Wybierz orientacyjny budżet" }),
  }),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
