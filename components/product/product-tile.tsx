import Link from "next/link";
import { ProductType } from "@/interfaces/index";
import { useDispatchCart, useCart } from "@/components/cart/cart-context";
import ImageComponent from "@/components/Image";

const ProductTile = ({ product, index }: { product: ProductType; index: number }) => {
  const { showCart } = useCart();
  const dispatch: any = useDispatchCart();
  const [, setVisible] = showCart;
  const handleAddToCart = (event: any) => {
    event.preventDefault();
    dispatch({
      type: "ADD_ITEM",
      payload: {
        name: product.name,
        slug: product.slug,
        price: product.price,
        image: product.imgsrc,
        quantity: 1,
      },
    });
    setVisible(true);
  };
  let position;
  switch (index % 4) {
    case 0:
      position = "col-span-1 sm:col-span-4 col-start-1 row-span-5";
      break;
    case 1:
      position =
        "col-span-1 sm:col-span-3 col-start-2 sm:col-start-5 row-span-4";
      break;
    case 2:
      position = "col-span-1 sm:col-span-4 col-start-1 row-span-3";
      break;
    case 3:
      position =
        "col-span-1 sm:col-span-3 col-start-2 sm:col-start-5 row-span-4";
      break;
    default:
      break;
  }
  return (
    <div key={product.slug} className={` ${position} cursor-pointer productitem`} style={{ opacity: '100%', transition: 'opacity 2s ease-out' }}>
      <Link href={`/product/${product.slug}`}>
        <div className="relative z-0 flex flex-wrap items-end w-auto h-full max-w-4xl overflow-hidden sm:w-full hover-trigger">
          <ImageComponent
            src={product.imgsrc.src[0]}
            alt={`Picture of ${product.name}`}
          />
          <div
            className="z-10 flex flex-wrap items-center justify-between w-full px-2 pt-10 -mt-4 text-sm text-coolgray-400 font-sansa hover-side"
            style={{ mixBlendMode: 'difference' }}
          >
            <p className="uppercase">{product.name}</p>
            <p className="tracking-tight ">{product.price}:-</p>
          </div>
          <div
            className="absolute grid px-2 pt-1 text-xs bg-opacity-50 text-coolgray-700 bg-coolgray-100 hover-target"
            style={{
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="col-span-1 col-start-1 px-2 italic underline border-r border-coolgray-600"
              onClick={handleAddToCart}
            >
              Buy
            </div>
            <div
              className="col-start-2 pl-2"
              style={{
                WebkitLineClamp: 3,
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                display: "-webkit-box",
              }}
            >
              {product.description}
            </div>
          </div>
        </div>
      </Link>
      <style jsx>
        {`
          .hover-trigger .hover-target {
            transform: translateY(4rem);
            opacity: 0;
            transition: all 0.4s ease-out;
          }
          .hover-trigger:hover .hover-target {
            transform: translateY(0px);
            padding-bottom: 2px;
            opacity: 1;
            transition: all 0.4s ease-out;
          }
          .hover-trigger .hover-side {
            transform: translateY(0px);
            transition: transform 0.4s ease-out;
          }
          .hover-trigger:hover .hover-side {
            transform: translateY(-4rem);
            transition: transform 0.4s ease-out;
          }
          .productitem:last-child:nth-child(odd) {
            grid-column: auto / span 7;
          }
          .productitem:last-child:nth-child(even) {
            grid-row-end: -1;
          }
          

        `}
      </style>
    </div>
  );
};

export default ProductTile