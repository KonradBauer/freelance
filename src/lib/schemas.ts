import { z } from "zod";

export const INDUSTRIES = [
  "Restauracja / gastronomia",
  "Budownictwo / remonty",
  "Uroda / kosmetyka",
  "Slub / event",
  "Meble / wnetrza",
  "Zdrowie / medycyna",
  "Uslugi lokalne",
  "Inna branza",
] as const;

export const BUDGETS = [
  "do 1500 zl",
  "1500-3000 zl",
  "3000-6000 zl",
  "6000+ zl",
] as const;

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Imie musi miec min. 2 znaki")
    .max(100, "Za dlugie imie"),
  phone: z
    .string()
    .regex(
      /^(\+48[\s]?)?(\d{3}[\s-]?\d{3}[\s-]?\d{3})$/,
      "Podaj prawidlowy numer telefonu (9 cyfr)"
    ),
  industry: z.enum(INDUSTRIES, {
    errorMap: () => ({ message: "Wybierz branze z listy" }),
  }),
  budget: z.enum(BUDGETS, {
    errorMap: () => ({ message: "Wybierz orientacyjny budzet" }),
  }),
  honeypot: z.string().max(0).optional(),
});

export type ContactFormData = z.infer<typeof contactSchema>;
