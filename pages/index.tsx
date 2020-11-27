// import Image from "next/image";
import { useState, useEffect } from "react";
import ImageComponent from "@/components/Image";
import Cart from "@/components/cart/cart";
// import { getAllProductsForHome } from 'utils/api'
import Layout from "@/components/Layout";
import { ProductType } from "@/interfaces/index";
import ProductTile from '@/components/product/product-tile'


const IndexPage = ({ data }: { data: any }) => {
  const [category, setCategory] = useState("Plant");
  const [items, setItems] = useState(data);
  useEffect(() => {
    setItems(data.filter((item: ProductType) => item.category === category));
  }, [category]);
  return (
    <Layout title="Home | Next.js + TypeScript Example">
      <div className="flex flex-wrap justify-center w-full mb-32">
        <div className="relative block w-full h-40 max-w-4xl">
          <ImageComponent
            src="strapi/hero2.jpg"
            alt="Plants and frames"
            height={600}
            width={900}
          />
        </div>
        <div className="flex flex-col justify-between w-full max-w-4xl sm:flex-row">
          <div className="w-full px-4 sm:px-0 sm:ml-4 sm:w-20 sm:mt-10">
            <div className="flex flex-row flex-wrap items-center justify-between text-sm font-light uppercase sm:space-y-1 sm:items-start sm:justify-start sm:flex-col font-sansa text-coolgray-600">
              <div>Popular</div>
              <div>New</div>
              <div>Search</div>
              <Cart />
              <div className="w-full text-xs text-center sm:pt-3 sm:text-lg sm:-ml-2 sm:w-auto text-coolgray-500">
                Products
              </div>
              <div
                className={`cursor-pointer ${
                  category === "Plant" && "pl-1 py-2 font-semibold"
                }`}
                onClick={() => setCategory("Plant")}
              >
                Plants
              </div>
              <div
                className={`cursor-pointer ${
                  category === "Chair" && "pl-1 py-2 font-semibold"
                }`}
                onClick={() => setCategory("Chair")}
              >
                Chairs
              </div>
              <div
                className={`cursor-pointer ${
                  category === "Camera" && "pl-1 py-2 font-semibold"
                }`}
                onClick={() => setCategory("Camera")}
              >
                Cameras
              </div>
            </div>
          </div>
          <div className="grid w-full h-screen max-w-2xl grid-cols-2 gap-2 p-2 mt-4 sm:mt-10 sm:grid-cols-7 sm:w-2/3 bg-coolgray-300">
            {items.map((product: ProductType, index: number) => (
              <ProductTile product={product} index={index} />
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
