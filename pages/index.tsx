import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Logo from '../components/Logo';
import vaults from '../constants/vaults.json';
import VaultCard from '../components/VaultCard';
import FilterResults from 'react-filter-search';
import Search from '../components/Search';
import Button from '../components/Button';
import { Kind } from '../components/Button/constants';

const Home = () => {
  const [value, setValue] = useState('');

  function handleChange(event: { target: HTMLInputElement }) {
    const { value } = event.target;
    setValue(value);
  }

  return (
    <div className="container mx-auto pt-12 pb-24 px-4">
      <Head>
        <title>NFTX Gallery</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className="mb-16 flex justify-center md:justify-end flex-wrap">
        <Link href="https://nftx.org/" passHref={true}>
          <Button className="mb-2" kind={Kind.ICON}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </Button>
        </Link>
        <Link href="https://nftx.org/" passHref={true}>
          <Button className="mb-2 ml-3" kind={Kind.PRIMARY}>
            {'Create Fund'}
          </Button>
        </Link>
        <Link href="https://nftx.org/#/" passHref={true}>
          <Button className="mb-2 ml-3" kind={Kind.SECONDARY}>
            {'Manage Fund'}
          </Button>
        </Link>
      </nav>
      <h1 className="text-4xl font-bold text-center text-off-white">
        <a href="https://nftx.org">NFTX</a> Vaults
      </h1>
      <h2 className="text-sm font-bold text-center text-off-white leading-loose mb-3">
        [#] funds created in the last [#] days · [#] redeemed in last 24h
      </h2>
      <p className="text-md object-center text-center text-light-text-gray leading-relaxed max-w-xl mx-auto">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua.
      </p>

      <div className="flex items-end justify-end max-w-full my-20">
        <Search value={value} handleChange={handleChange} />
      </div>

      <FilterResults
        value={value}
        data={vaults}
        renderResults={(results) =>
          results.length === 0
            ? 'None found!'
            : results.map((vault) => (
                <section className="mb-24 font-sans font-bold" key={vault.name}>
                  <header className="flex items-center justify-between mb-6">
                    <h3 className="text-off-white font-sans text-2xl">
                      {vault.name}
                    </h3>
                    <Link href={`/vault/${vault.name.toLocaleLowerCase()}/`}>
                      <a className="text-off-white text-lg font-sans">
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
                                image={`https://via.placeholder.com/160x160.png?text=${v}`}
                                eyebrow={vault.name}
                                title={v}
                              />
                            </a>
                          </Link>
                        )
                    )}
                  </div>
                </section>
              ))
        }
      />
    </div>
  );
};

export default Home;
