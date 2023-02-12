import Navbar from "@/components/Navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className="bg-gray-50">
        <Navbar />
        <main className="w-full h-full  container mx-auto">
          <div className="w-full flex justify-center items-center">
            <div className="w-2/3 h-56 flex justify-center items-center bg-gray-300 p-8 m-8 font-bold text-xl text-gray-500">
              header ads
            </div>
          </div>
          <div className="w-full flex">
            <div className="w-3/4 m-2">{children}</div>
            <div className="w-1/4 bg-gray-300 m-2 rounded-md">ads</div>
          </div>
        </main>
      </body>
    </html>
  );
}
