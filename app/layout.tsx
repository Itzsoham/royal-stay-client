import "./globals.css";
import { Josefin_Sans } from "next/font/google";

import Header from "./_components/Header";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | The Royal Stay",
    default: "The Royal Stay | Feel The Luxary",
  },
  description:
    "The Wild Oasis clone in Next Typescript. Made for the learning purpose and improve skills.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div
          className={`${josefin.className} antialiased bg-primary-950 text-primary-100 min-h-screen flex flex-col relative`}
        >
          <Header />
          <div className="flex-1 px-8 py-12 grid">
            <main className="max-w-7xl mx-auto w-full">{children}</main>
          </div>
          {/* <footer>Copyright by The Royal Stay</footer> */}
        </div>
      </body>
    </html>
  );
}
