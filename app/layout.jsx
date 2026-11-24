import "./globals.css";

export const metadata = {
  title: "Paw & Co. | Petshop",
  description:
    "Temukan makanan, vitamin, aksesoris, dan perlengkapan terbaik untuk sahabat berbulu di Paw & Co.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
