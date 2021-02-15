import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { FormattedNumber } from 'react-intl';
import { useFundsContext } from '../contexts/funds';
import useMessage from '@/hooks/message';
import Button from '@/components/Button';
import { Kind } from '@/components/Button/constants';
import Icon, { Icons } from '@/components/Icon';
import FundGroup, { Columns } from '@/components/FundGroup';
import Poster from '@/components/Poster';
import { getCategoryKey } from '@/utils/getCategoryKey';
import { Colorway } from '@/components/Poster/constants';
import { getFundKey } from '@/utils/getFundKey';

const Home = ({ funds }: { funds: any }) => {
  // Popular categories - hard coded for now
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

  const feelingLucky = funds[Math.floor(Math.random() * funds.length)];

  return (
    <>
      <Head>
        <title>{useMessage('home.meta.title')}</title>
      </Head>
      <div className="container mx-auto pt-12 pb-24 px-4">
        <nav className="mb-16 mt-12 flex justify-center md:justify-end flex-wrap">
          <Link href={`/funds/${getFundKey(feelingLucky)}`} passHref={true}>
            <Button className="mb-2" kind={Kind.ICON}>
              <Icon name={Icons.SPARKLE} />
              <span className="hidden">
                {useMessage('home.cta.feelingLucky')}
              </span>
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
              if (funds.length) {
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
          {funds.length && (
            <FundGroup
              namespace="all"
              slug=""
              funds={funds}
              columns={Columns.FOCUS}
            />
          )}
        </div>
      </div>
    </>
  );
};

const Guard = () => {
  const funds = useFundsContext();

  if (funds.length) {
    return <Home funds={funds} />;
  }

  return (
    <>
      <Head>
        <title>{useMessage('home.meta.title')}</title>
      </Head>
      <div className="flex-1 flex items-center justify-center container mx-auto pt-12 pb-24 px-4">
        <h1 className="text-4xl mb-4 font-bold text-center text-gray-50 animate-pulse">
          <img
            src="/images/logo_on_black.svg"
            className="mx-auto max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl"
            alt="NFTX logo"
          />
          <div className="invisible h-0">{useMessage('home.title')}</div>
        </h1>
      </div>
    </>
  );
};

export default Guard;
