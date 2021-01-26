import React from 'react';
import '../styles/globals.css';

const App = ({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: {
    [key: string]: any;
  };
}) => <Component {...pageProps} />;

export default App;
