import '../styles/globals.css';

const App = ({ Component, pageProps }: {
  Component: React.FC<{}>,
  pageProps: {
    [key:string]: any,
  }
}) => (
  <Component {...pageProps} />
);

export default App;
