// You can include shared interfaces/types in a separate file
// and then use them in any component by importing them. For
// example, to import the interface below do:
//
// import User from 'path/to/interfaces';

export type User = {
  id: number
  name: string
}

export type ProductType = {
  id: number,
  imgsrc: { 
    src: string[] 
  }, 
  name: string,
  slug: string,
  price: number,
  description: string,
  category: string,
}