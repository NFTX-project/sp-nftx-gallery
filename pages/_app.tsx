import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import { FundsProvider } from '@/contexts/funds';
import { VaultsProvider } from '@/contexts/vaults';
import Header from '@/components/modules/Header';
import Footer from '@/components/modules/Footer';
import * as locales from '@/lang';
import '@/styles/globals.css';

interface AppProps {
  Component: React.ComponentType;
  pageProps: {
    [key: string]: any;
  };
}

const App = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();
  const { locale = 'en', defaultLocale = 'en' } = router;

  const { ...props } = pageProps;

  return (
    <IntlProvider
      locale={locale}
      defaultLocale={defaultLocale}
      messages={locales[locale] || locales[defaultLocale]}
    >
      <FundsProvider>
        <VaultsProvider>
          <div className="dark:bg-gray-900 bg-gray-50 min-h-screen flex flex-col">
            <Header />
            <Head>
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
              />
              <link rel="manifest" href="/site.webmanifest" />
              <link
                rel="mask-icon"
                href="/safari-pinned-tab.svg"
                color="#fb287f"
              />
              <meta name="msapplication-TileColor" content="#ffffff" />
              <meta name="theme-color" content="#ffffff" />
              <link rel="preconnect" href="//nftx.xyz" />
            </Head>

            <main className="flex-1 flex flex-col">
              <Component {...props} />
            </main>
            <Footer />
          </div>
        </VaultsProvider>
      </FundsProvider>
    </IntlProvider>
  );
};

export default App;
