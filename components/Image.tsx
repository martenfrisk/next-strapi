import Image from 'next/image'

const ImageComponent = ({
  src,
  width = 400,
  height = 950,
  alt
}: {
  src: any,
  width?: number,
  height?: number,
  alt: string
}) => {
  const cloudinary_id = "dyxbjaih4"
  const hostUrl = `https://res.cloudinary.com/${cloudinary_id}/image/upload/c_fit,q_100,w_${width},h_${height}`

  return (
    <Image
      className="object-cover object-center w-full h-full"
      src={`${hostUrl}/${src}`}
      alt={alt}
      // width={width}
      // height={height}
      objectFit="cover"
      quality={90}
      layout="fill"
    />
  )
}

export default ImageComponent