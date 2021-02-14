import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FormattedNumber } from 'react-intl';
import { useFundsContext } from '../contexts/funds';
import useMessage from '../hooks/message';
import Button from '../components/Button';
import { Kind } from '../components/Button/constants';
import { Icons } from '../components/Icon';
import FundGroup, { Columns } from '../components/FundGroup';
import Poster from '../components/Poster';
import { getCategoryKey } from '../utils/getCategoryKey';
import { Colorway } from '../components/Poster/constants';

const Home = () => {
  const funds = useFundsContext();

  const categories = [
    {
      key: 'hashmasks',
      image: 'hashmasks.jpg',
      colorway: Colorway.LIGHT,
    },
    {
      key: 'wrapped-cryptopunks',
      image: 'wrapped-cryptopunks.png',
      colorway: Colorway.LIGHT,
    },
    {
      key: 'axie',
      image: 'axie.png',
      colorway: Colorway.LIGHT,
    },
    {
      key: 'cryptokitties',
      image: 'cryptokitties.png',
      colorway: Colorway.DARK,
    },
  ];

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
        <h1 className="text-4xl mb-4 font-bold text-center text-gray-50">
          <img
            src="/images/nftx_on_black.svg"
            className="mx-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl"
            alt="NFTX logo"
          />
          <div className="invisible h-0">{useMessage('home.title')}</div>
        </h1>
        <h2 className="text-sm font-bold text-center text-gray-50 leading-loose mb-3">
          {useMessage('home.subtitle', {
            tvl: (
              <FormattedNumber
                value={10000000}
                style="currency"
                currency="USD"
                maximumFractionDigits={0}
                minimumFractionDigits={0}
              />
            ),
            volume: (
              <FormattedNumber
                value={50000}
                style="currency"
                currency="USD"
                maximumFractionDigits={0}
                minimumFractionDigits={0}
              />
            ),
          })}
        </h2>
        <p className="text-md object-center text-center text-white text-opacity-50 leading-relaxed max-w-xl mx-auto">
          {useMessage('home.text')}
        </p>

        <div className="mt-20 mb-16">
          <h3 className="text-gray-50 font-sans font-bold text-2xl mb-8">
            {useMessage(`home.categories.title`)}
          </h3>
          <section className="flex flex-wrap -m-2">
            {categories.map((cat) => {
              const fund = funds.find((f) => getCategoryKey(f) === cat.key);
              const matchingAssets = funds.filter(
                (f) => f.asset.address === fund.asset.address
              );

              if (fund) {
                return (
                  <Link href={`/funds/${cat.key}`} key={cat.key}>
                    <a className="w-1/2 md:flex-1 md:p-2 transition-transform duration-300 transform hover:scale-105">
                      <div className="p-2 md:p-0">
                        <Poster
                          key={cat.key}
                          title={useMessage(`funds.${cat.key}.title`)}
                          text={useMessage('home.categories.poster.text', {
                            count: matchingAssets.length,
                          })}
                          image={`/images/posters/${cat.image}`}
                          colorway={cat.colorway}
                        />
                      </div>
                    </a>
                  </Link>
                );
              }

              return null;
            })}
            <Link href="/funds/">
              <a className="hidden lg:block lg:flex-1 p-2">
                <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-t from-gray-800 to-gray-700 text-white">
                  {useMessage('home.categores.poster.all')}
                </div>
              </a>
            </Link>
          </section>
        </div>

        <div className="mb-24">
          <FundGroup
            namespace="all"
            slug=""
            funds={funds}
            columns={Columns.FOCUS}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
