import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'
import CarList from '@/components/CarList'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="w-screen h-screen">
      <div className='container mx-auto'>
        <CarList />
      </div>
    </main>
  )
}
