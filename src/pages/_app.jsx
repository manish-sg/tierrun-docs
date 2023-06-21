import Head from 'next/head'
import { Router, useRouter } from 'next/router'
import { MDXProvider } from '@mdx-js/react'
import ProgressBar from '@badrap/bar-of-progress'

import { Layout } from '@/layouts/DocumentationLayout.jsx'
import { DefaultLayout } from '@/layouts/DefaultLayout.jsx'
import { BlogIndexLayout } from '@/layouts/DefaultLayout.jsx'
import * as mdxComponents from '@/components/mdx/Components'
import { useMobileNavigationStore } from '@/components/nav/MobileNav'

import '@/styles/globals.css'
import 'focus-visible'

const progress = new ProgressBar({
  size: 2,
  color: '#0091FF',
  className: 'bar-of-progress',
  delay: 100,
})

Router.events.on('routeChangeStart', () => progress.start())
Router.events.on('routeChangeComplete', () => progress.finish())
Router.events.on('routeChangeError', () => progress.finish())

Router.events.on('routeChangeStart', onRouteChange)
Router.events.on('hashChangeStart', onRouteChange)
function onRouteChange() {
  useMobileNavigationStore.getState().close()
}

export default function App({ Component, pageProps }) {
  let router = useRouter()
  return (
    <>
      <Head>
        {router.pathname === '/docs' ? (
          <title>Tier Docs</title>
        ) : (
          <title>{`${pageProps.title} - Tier Docs`}</title>
        )}
        <meta name="description" content={pageProps.description} />
      </Head>
      <div>
        <MDXProvider components={mdxComponents}>
          {router.pathname.startsWith('/docs') ? (
            <Layout {...pageProps}>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <DefaultLayout {...pageProps}>
              <Component {...pageProps} />
            </DefaultLayout>
          )}
        </MDXProvider>
      </div>
    </>
  )
}
