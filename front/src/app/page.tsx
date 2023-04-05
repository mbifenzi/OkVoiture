import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "./page.module.css";
import CarList from "@/components/CarList";
import RootLayout from "./layout";
import { MantineProvider } from "@mantine/core";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main>
      <CarList />
    </main>
  );
}
