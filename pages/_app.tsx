import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';
import Head from 'next/head';

const App = ({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: {
    [key: string]: any;
  };
}) => (
  <div className="bg-gray-900 min-h-screen flex flex-col">
    <Header />
    <Head>
      <title>NFTX Gallery</title>
      <link rel="icon" href="/favicon.ico" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@100;300&display=swap"
        rel="stylesheet"
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap"
        rel="stylesheet"
      />
    </Head>

    <main className="flex-1">
      <Component {...pageProps} />
    </main>
    <Footer />
  </div>
);

export default App;
