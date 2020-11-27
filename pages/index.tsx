import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react"
// import { getAllProductsForHome } from 'utils/api'
import Layout from "../components/Layout";
import { ProductType } from "@/interfaces/index";

const Tile = ({product, index}: {product: ProductType, index: number}) => {
  let position
  switch (index) {
    case 0:
      position = "col-span-1 sm:col-span-4 col-start-1 row-span-5"
      break;
    case 1:
      position = "col-span-1 sm:col-span-3 col-start-2 sm:col-start-5 row-span-4"
      break;
    case 2:
      position = "col-span-1 sm:col-span-4 col-start-1 row-span-3"
      break;
    case 3:
      position = "col-span-1 sm:col-span-3 col-start-2 sm:col-start-5 row-span-4 row-start-5"
      break;
    default:
      break;
  }
  return (
    <div
      key={product.id}
      className={` ${position} cursor-pointer`}
    >
      <Link href={`/product/${product.slug}`}>
        <div className="relative z-0 flex flex-wrap items-end w-64 h-full max-w-4xl overflow-hidden sm:w-full hover-trigger">
          <Image src={product.imgsrc.src[0]} layout="fill" alt={`Picture of ${product.name}`} objectFit="cover" />
          <div
            className="z-10 flex flex-wrap items-center justify-between w-full px-2 pt-10 -mt-4 text-sm font-light bg-opacity-25 text-coolgray-400 font-sansa hover-side"
            style={{ mixBlendMode: "difference" }}
          >
              <p className="uppercase">
                {product.name}
              </p>
            <p className="tracking-tight ">{product.price}:-</p>
          </div>
          <div
            className="absolute px-2 pt-2 text-xs bg-opacity-50 text-coolgray-700 bg-coolgray-100 hover-target"
            style={{
              WebkitLineClamp: 3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitBoxOrient: 'vertical',
              backdropFilter: 'blur(10px)',
              display: '-webkit-box',
            }}
          >
            {product.description}
          </div>
        </div>
      </Link>
      <style jsx>{`
          .hover-trigger .hover-target {
            transform: translateY(4rem);
            opacity: 0;
            transition: all .4s ease-out;
          }
          .hover-trigger:hover .hover-target {
            transform: translateY(0px);
            padding-bottom: 2px;
            opacity: 1;
            transition: all .4s ease-out;
          }
          .hover-trigger .hover-side {
            transform: translateY(0px);
            transition: transform .4s ease-out;
          }
          .hover-trigger:hover .hover-side {
            transform: translateY(-4rem);
            transition: transform .4s ease-out;
          }

        
      `}
      </style>
    </div>
  )
}

const IndexPage = ({ data }: { data: any }) => {
  const [category, setCategory] = useState('Plant')
  const [items, setItems] = useState(data)
  useEffect(() => {
    setItems(data.filter((item: ProductType) => item.category === category))
  }, [category])
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="flex flex-wrap justify-center w-full mb-32">
        <div className="relative hidden w-full h-48 max-w-4xl mx-20 sm:block">
          <Image src="strapi/hero2.jpg" alt="Plants and frames" layout="fill" objectFit="cover" />
        </div>
        <div className="flex flex-col justify-between w-full max-w-4xl sm:flex-row">
          <div className="w-full px-4 sm:px-0 sm:ml-4 sm:w-20 sm:mt-10">
            <div className="flex flex-row flex-wrap items-center justify-between text-sm font-light uppercase sm:space-y-1 sm:items-start sm:justify-start sm:flex-col font-sansa text-coolgray-600">
              <div>Popular</div>
              <div>New</div>
              <div>Search</div>
              <div>Cart</div>
              <div className="w-full text-xs text-center sm:pt-3 sm:text-lg sm:-ml-2 sm:w-auto text-coolgray-500">Products</div>
              <div className={`cursor-pointer ${category === 'Plant' && 'pl-1 py-2 font-semibold'}`} onClick={() => setCategory('Plant')}>Plants</div>
              <div  className={`cursor-pointer ${category === 'Chair' && 'pl-1 py-2 font-semibold'}`} onClick={() => setCategory('Chair')}>Chairs</div>
              <div  className={`cursor-pointer ${category === 'Camera' && 'pl-1 py-2 font-semibold'}`} onClick={() => setCategory('Camera')}>Cameras</div>
            </div>
          </div>
          <div className="grid w-full h-screen max-w-2xl grid-cols-2 gap-2 p-2 mt-4 sm:mt-10 sm:grid-cols-7 sm:w-2/3 bg-coolgray-300">
            {items.map((product: ProductType, index: number) => (
              <Tile product={product} index={index} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;

export async function getServerSideProps() {
  const res = fetch(process.env.API_URL + "/products");
  const data = await (await res).json();
  return {
    props: { data },
  };
}
