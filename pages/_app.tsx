import React from 'react';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import Head from 'next/head';
import { FundsProvider } from '../contexts/funds';
import { VaultsProvider } from '../contexts/vaults';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as locales from '../lang';
import '../styles/globals.css';

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
      <div className="bg-gray-900 min-h-screen flex flex-col">
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
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#fb287f" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta name="theme-color" content="#ffffff" />
          <link rel="preconnect" href="//nftx.xyz" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;300&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
            rel="stylesheet"
          />
        </Head>

        <main className="flex-1">
          <FundsProvider>
            <VaultsProvider>
              <Component {...props} />
            </VaultsProvider>
          </FundsProvider>
        </main>
        <Footer />
      </div>
    </IntlProvider>
  );
};

export default App;
