import React, { ReactNode } from 'react'
import Link from 'next/link'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
  <div className="font-serif text-coolgray-800">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header className="flex justify-center w-full mt-4">
      <div className="mb-6 text-2xl tracking-wide cursor-pointer sm:text-5xl font-rozha">
        <Link href="/">
          <a><h1>Store</h1></a>
        </Link>
      </div>
    </header>
    {children}
    <footer>
    </footer>
  </div>
)

export default Layout
