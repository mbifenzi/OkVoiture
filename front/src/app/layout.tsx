import Navbar from "@/components/Navbar";
import { FooterSimple } from "@/components/Footer";
import "./globals.css";
import { createGetInitialProps } from "@mantine/next";

interface FooterSimpleProps {
  links: { link: string; label: string }[];
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Links: FooterSimpleProps = {
    links: [
      { link: "home", label: "home" },
      { link: "dashboard", label: "dashboard" },
      { link: "contact", label: "contact" },
      { link: " terms", label: "terms" },
      { link: "about", label: "about" },
    ],
  };

  return (
    <html lang="en">
      <head />
      <body className="bg-gray-50">
        <Navbar />
        <main className="w-full h-full container mx-auto">
          <div className="w-full flex justify-center items-center">
            <div className="w-2/3 h-56 flex justify-center items-center bg-gray-300 p-8 m-8 font-bold text-xl text-gray-500">
              header ads
            </div>
          </div>
          <div className="w-full flex min-h-max">
            <div className="lg:w-3/4 w-full m-2 ">{children}</div>
            <div className="  lg:w-1/4 lg:flex  w-full hidden bg-gray-300 m-2 justify-center items-center text-gray-500 font-bold rounded-md ">
              ads
            </div>
          </div>
        </main>
        <div className="relative bottom-0">
          <FooterSimple links={Links.links} />
        </div>
      </body>
    </html>
  );
}
