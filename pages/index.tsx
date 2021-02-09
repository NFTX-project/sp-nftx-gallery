import React, { useState } from 'react';
import Link from 'next/link';
import funds from '../constants/funds.json';
import VaultCard from '../components/VaultCard';
import FilterResults from 'react-filter-search';
import Search from '../components/Search';
import Button from '../components/Button';
import { Kind } from '../components/Button/constants';
import Icon, { Icons } from '../components/Icon';
import FundStatus from '../components/FundStatus';
import Head from 'next/head';
import useMessage from '../hooks/message';

const Home = () => {
  const [value, setValue] = useState('');

  function handleChange(event: { target: HTMLInputElement }) {
    const { value } = event.target;
    setValue(value);
  }

  return (
    <>
      <Head>
        <title>{useMessage('home.meta.title')}</title>
      </Head>
      <div className="container mx-auto pt-12 pb-24 px-4">
        <nav className="mb-16 mt-12 flex justify-center md:justify-end flex-wrap">
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
            <Button
              className="mb-2 ml-3"
              kind={Kind.PRIMARY}
              icon={Icons.EXTERNAL_LINK}
              target="_blank"
            >
              {useMessage('home.cta.app')}
            </Button>
          </Link>
        </nav>
        <h1 className="text-4xl mb-2 font-bold text-center text-gray-50">
          {useMessage('home.title')}
        </h1>
        <h2 className="text-sm font-bold text-center text-gray-50 leading-loose mb-3">
          {useMessage('home.subtitle', {
            funds: 21,
            days: 31,
            redeemed: 5,
          })}
        </h2>
        <p className="text-md object-center text-center text-white text-opacity-50 leading-relaxed max-w-xl mx-auto">
          {useMessage('home.text')}
        </p>

        <div className="flex items-end justify-end max-w-full my-20">
          <Search value={value} handleChange={handleChange} />
        </div>

        <section className="mb-24 font-sans font-bold">
          <header className="flex items-center justify-between mb-6">
            <h3 className="text-gray-50 font-sans text-2xl">
              {useMessage('home.funds.title')}
            </h3>
            <Link href={`/funds/`}>
              <a className="text-gray-50 text-lg font-sans flex items-center">
                {useMessage('home.funds.categories.link')}
                <Icon name={Icons.CHEVRON_RIGHT} />
              </a>
            </Link>
          </header>
          <div className="bg-gradient-to-r from-yellow-500 via-green-500 to-purple-500 h-0.5 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <FilterResults
              value={value}
              data={funds}
              renderResults={(results) =>
                results.length === 0
                  ? 'None found!'
                  : results.map((fund) => (
                      <Link
                        key={fund.asset.name}
                        href={`/funds/${fund.fundToken.name.toLocaleLowerCase()}/`}
                      >
                        <a>
                          <VaultCard
                            image={`https://via.placeholder.com/160x160.png?text=${fund.fundToken.name}`}
                            eyebrow={`${fund?.holdings?.length || ''} ${
                              fund.asset.name
                            }`}
                            title={fund.fundToken.name}
                            stack={true}
                            text={
                              <FundStatus amm={true} fin={true} ver={true} />
                            }
                          />
                        </a>
                      </Link>
                    ))
              }
            />
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
