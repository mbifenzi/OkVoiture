import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import CarList from "@/components/CarList";
import RootLayout from "./layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <div className="container mx-auto">
        <div className="w-full flex justify-center items-center">
          <div className="w-2/3 h-56 flex justify-center items-center bg-gray-300 p-8 m-8 font-bold text-xl text-gray-500">
            header ads
          </div>
        </div>
        <CarList />
      </div>
    </main>
  );
}
