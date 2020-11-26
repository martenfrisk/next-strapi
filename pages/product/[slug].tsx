import Image from 'next/image'
import Layout from '@/components/Layout'
import { ProductType } from '@/interfaces/index'

export default function Product({ product }: {product: ProductType}) {
  return (
    <Layout>
      {product && (
        <>
          <h1>{product.name}</h1>
          <Image
            src={product.imgsrc.src[1]}
            height={500}
            width={500}
            />
        </>
      )}
    </Layout>
  )
}


export async function getServerSideProps({ params }: { params: { slug: string }}) {
  const res = fetch( process.env.API_URL + '/products?slug=' + params.slug)
  const data = await (await res).json()
  const product = data[0]
  return {
    props: { product }
  }
}