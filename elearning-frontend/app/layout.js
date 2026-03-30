import "./globals.css";

export const metadata = {
  title: "ELearn - Learn Without Limits",
  description: "E-Learning Platform built with Django and Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}