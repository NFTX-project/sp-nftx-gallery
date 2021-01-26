import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/globals.css';

const App = ({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: {
    [key: string]: any;
  };
}) => (
  <div className="min-h-screen flex flex-col">
    <Header/>
    <main className="flex-1">
      <Component {...pageProps} />;
    </main>
    <Footer/>
  </div>
);

export default App;
