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
      <meta name="Description" content="Next.js test ecommerce site with Strapi backend" />
    </Head>
    <div className="mx-10 my-8 border border-blue-800">
      <header className="flex justify-center w-full mt-4">
        <div className="mb-6 text-2xl tracking-wide cursor-pointer sm:text-5xl font-rozha">
          <Link href="/">
            <a>
              <h1
                className="animate-under"
              >
                Store
              </h1>
            </a>
          </Link>
        </div>
      </header>
      {children}
      <footer>
      </footer>
    </div>
    <style jsx>{`
      .animate-under {
        background-image: 
          linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)), 
          linear-gradient(#27303F,#27303F);
        background-position: 100% 90%, 0 90%;
        background-size: 0 5px, 100% 5px;
        background-repeat: no-repeat;
        animation: floatline 3s cubic-bezier(0.45,0.05,0.55,0.95) 2s;
      }

      @keyframes floatline {
        from {
          background-size: 100% 5px, 0 5px;
        }
        to {
          background-size: 0 5px, 100% 5px;
        }
      }

    `}</style>
  </div>
)

export default Layout
