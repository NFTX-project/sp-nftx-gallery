import Head from 'next/head';
import Logo from '../components/Logo';

const Home = () => {
  return (
    <div className="container mx-auto py-24 px-4 text-center">
      <Head>
        <title>NFTX Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-4xl font-bold">
          Welcome to the <a href="https://nftx.org">NFTX</a> Gallery.
        </h1>
        <div className="my-16">
          <Logo
            size={100}
          />
        </div>
      </main>

      <footer>
        <a
          href="https://nftx.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by tokens of the non fungible variety.
        </a>
      </footer>
    </div>
  )
};

export default Home;
