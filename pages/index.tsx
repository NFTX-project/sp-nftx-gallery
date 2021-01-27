import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '../components/Logo';
import vaults from '../constants/vaults.json';
import VaultCard from '../components/VaultCard';
import useAxios from 'axios-hooks';

const Home = () => {
  const [limit, setLimit] = useState(50);
  const [offset, setOffset] = useState(0);
  const [collection, setCollection] = useState([]);

  const url = useMemo(() => {
    const idsArray = vaults.map((vault) => vault.ids.slice(0, 5));
    const firstFiveIds = idsArray.flat(1);
    const tokenIds = firstFiveIds.slice(offset, limit).join('&token_ids=');

    return `https://api.opensea.io/api/v1/assets?owner=0xaf93fcce0548d3124a5fc3045adaf1dde4e8bf7e&token_ids=${tokenIds}&offset=${offset}&limit=${limit}`;
  }, []);

  const [{ data, loading, error }, refetch] = useAxios(url);

  useEffect(() => {
    if (offset === 0) return;
    refetch();
  }, [limit]);

  useEffect(() => {
    if (!data?.assets) return;
    console.log('DATA', data);
    setCollection([...collection, ...data.assets]);
  }, [data]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-off-white">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-off-white">
        <p>Error!{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-24 px-4">
      <Head>
        <title>NFTX Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold text-center text-off-white">
        Welcome to the <a href="https://nftx.org">NFTX</a> Vault.
      </h1>
      <div className="my-16 text-center text-off-white">
        <Logo size={100} />
      </div>

      {vaults.map((vault) => (
        <section className="mb-24" key={vault.name}>
          <header className="flex items-center justify-between mb-6">
            <h3 className="text-off-white font-bold text-2xl">{vault.name}</h3>
            <Link href={`/vault/${vault.name.toLocaleLowerCase()}/`}>
              <a className="text-off-white text-lg">
                {'See details '}
                <span className="text-2xl">&rsaquo;</span>
              </a>
            </Link>
          </header>
          <div className="bg-gradient-to-r from-yellow-500 via-green-500 to-purple-500 h-0.5 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5 gap-4">
            {vault.ids.map(
              (v, i) =>
                i < 5 && (
                  <Link
                    key={i}
                    href={`/vault/${vault.name.toLocaleLowerCase()}/`}
                  >
                    <a>
                      <VaultCard
                        image={`https://via.placeholder.com/160x160.png?text=${
                          collection[
                            collection.findIndex((i) => i.token_id === v)
                          ].image_url
                        }`}
                        eyebrow={vault.name}
                        title={v}
                      />
                    </a>
                  </Link>
                )
            )}
          </div>
        </section>
      ))}
    </div>
  );
};

export default Home;
