import Link from 'next/link'
import Image from 'next/image'
import '../styles/page-404.css'

export default function Page() {
  return (
    <div className="page-404">
      <Image
        src="/assets/404.png"
        width={200}
        height={200}
        alt="page-not-found image"
        className="image-404"
        priority
      ></Image>
      <h3>Page not found. Incorrect URL or page does not exist anymore.</h3>
      <Link href="/">Back to home</Link>
    </div>
  )
}
