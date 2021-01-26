import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '../components/Logo';
import vaults from '../constants/vaults.json';

const colorMap = {
  'PUNK-BASIC': 'bg-green-50',
  'PUNK-FEMALE': 'bg-green-100',
  'PUNK-ATTR-4': 'bg-green-200',
  'PUNK-ATTR-5': 'bg-green-300',
  'PUNK-ZOMBIE': 'bg-green-400',
  'AXIE-ORIGIN': 'bg-blue-50',
  'AXIE-MYSTIC-1': 'bg-blue-100',
  'AXIE-MYSTIC-2': 'bg-blue-200',
  'KITTY-GEN-0': 'bg-red-50',
  'KITTY-GEN-0-F': 'bg-red-100',
  'KITTY-FOUNDER': 'bg-red-200',
  'AVASTR-BASIC': 'bg-yellow-50',
  'AVASTR-RANK-30': 'bg-yellow-100',
  'AVASTR-RANK-60': 'bg-yellow-200',
  GLYPH: 'bg-pink-50',
  JOY: 'bg-indigo-50',
};

const Home = () => (
  <div className="container mx-auto py-24 px-4">
    <Head>
      <title>NFTX Gallery</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <h1 className="text-4xl font-bold text-center">
      Welcome to the <a href="https://nftx.org">NFTX</a> Vault.
    </h1>
    <div className="my-16 text-center">
      <Logo size={100} />
    </div>

    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {vaults.map((vault) => (
          <Link
            key={vault.name}
            href={`/vault/${vault.name.toLocaleLowerCase()}/`}
          >
            <a
              className={`flex p-6 font-mono break-all ${colorMap[vault.name]}`}
            >
              <div className="flex-none h-20 w-20 sm:w-28 sm:h-28 relative">
                <img
                  src={`https://via.placeholder.com/160x160.png?text=${vault.name}%20image`}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover border border-black shadow-offset-lime"
                />
              </div>
              <div className="flex-auto pl-6">
                <div className="flex flex-wrap items-baseline pl-20 md:pl-28 -mt-6 -mr-6 -ml-20 md:-ml-28 py-6 pr-6 bg-black text-white">
                  <h1 className="w-full flex-none text-2xl leading-7 mb-2 font-bold">
                    {vault.name}
                  </h1>
                  <div className="text-sm mb-2 font-bold">{vault.address}</div>
                  <div className="text-sm text-green-300 font-medium">
                    {`${vault.ids.length} in vault`}
                  </div>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </section>
  </div>
);

export default Home;
