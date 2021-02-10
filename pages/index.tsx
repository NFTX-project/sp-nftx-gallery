import React, { useState } from 'react';
import Link from 'next/link';
import FilterResults from 'react-filter-search';
import Search from '../components/Search';
import Button from '../components/Button';
import { Kind } from '../components/Button/constants';
import { Icons } from '../components/Icon';
import Head from 'next/head';
import useMessage from '../hooks/message';
import { useFundsContext } from '../contexts/funds';
import FundGroup from '../components/FundGroup';

const Home = () => {
  const [value, setValue] = useState('');

  function handleChange(event: { target: HTMLInputElement }) {
    const { value } = event.target;
    setValue(value);
  }

  const funds = useFundsContext();

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
            funds: funds.length,
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
          <FilterResults
            value={value}
            data={funds || []}
            renderResults={(results) => (
              <FundGroup namespace="all" slug="" funds={results} />
            )}
          />
        </section>
      </div>
    </>
  );
};

export default Home;
