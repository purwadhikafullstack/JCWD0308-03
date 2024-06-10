import Image from 'next/image'
import styles from './page.module.css'
import Transactions from '@/components/book/trasactions'

export default function Home() {
  return (
    <main className='bg bg-white'>
      <Transactions/>
    </main>
  )
}
