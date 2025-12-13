import localFont from "next/font/local";

/* Акцентный шрифт Manrope, чтобы логотип и заголовки выглядели одинаково на всех страницах */
export const manrope = localFont({
  src: [
    {
      path: "../../public/fonts/manrope-600.ttf",
      weight: "600",
      style: "normal",
    },
  ],
  display: "swap",
});
