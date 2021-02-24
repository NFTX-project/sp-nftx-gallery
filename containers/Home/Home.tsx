import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import useMessage from '@/hooks/useMessage';
import FundGroup, { Columns } from '@/components/FundGroup';
import Poster from '@/components/Poster';
import collections from '@/constants/collections';
import { Fund } from '@/types/fund';
import { getFundKey } from '@/utils/getFundKey';

const HomeContainer = ({ funds }: { funds: Fund[] }) => {
  return (
    <>
      <Head>
        <title>{useMessage('home.meta.title')}</title>
      </Head>
      <div className="container mx-auto pt-24 pb-18 px-4">
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
            tvl: '🦧',
            volume: '🦧',
          })}
        </h2>
        <p className="text-md object-center text-center text-white text-opacity-50 leading-relaxed max-w-xl mx-auto">
          {useMessage('home.text')}
        </p>

        <div className="mt-20 mb-16">
          <h3 className="text-gray-50 font-sans font-bold text-2xl mb-8">
            {useMessage(`home.collections.title`)}
          </h3>
          <section className="flex flex-wrap -m-2">
            {collections.map((cat) => {
              if (funds.length) {
                const fund = funds.find((f) =>
                  cat.items.includes(getFundKey(f))
                );

                if (fund) {
                  return (
                    <Link href={`/collections/${cat.href}`} key={cat.href}>
                      <a className="w-full sm:w-1/3 md:w-1/3 lg:w-1/4 md:p-2 transition-transform duration-300 transform hover:scale-105">
                        <div className="p-2 md:p-0">
                          <Poster
                            title={useMessage(`funds.${cat.namespace}.title`)}
                            text={useMessage('home.collections.poster.text', {
                              count: cat.items.length,
                            })}
                            image={cat.image}
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
              <a className="hidden lg:block lg:w-1/4 p-2">
                <div className="flex h-full items-center justify-center rounded-md bg-gradient-to-t from-gray-800 to-gray-700 text-white">
                  {useMessage('home.collections.poster.all')}
                </div>
              </a>
            </Link>
          </section>
        </div>

        <div className="mb-24">
          {funds.length ? (
            <FundGroup
              namespace="funds.all"
              slug=""
              funds={funds}
              columns={Columns.FOCUS}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default HomeContainer;
