import Link from 'next/link'
import Image from 'next/image'
// import { getAllProductsForHome } from 'utils/api'
import Layout from '../components/Layout'

const IndexPage = ({ data }: { data: any}) => {
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <h1>Hello Next.js 👋</h1>
      <p>
        {data.map((product: { imgsrc: { src: string[] } }) => (
          <Image
            src={product.imgsrc.src[0]}
            width={500}
            height={500}
          />

        ))}
        <Link href="/about">
          <a className="text-red-500">About</a>
        </Link>
      </p>
    </Layout>
  )
}

export default IndexPage

export async function getServerSideProps() {
  const res = fetch(process.env.API_URL + '/products')
  const data = await (await res).json()
  return {
    props: { data }
  }
}