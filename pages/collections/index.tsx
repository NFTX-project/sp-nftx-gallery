import React, { useMemo, useState } from 'react';
import Head from 'next/head';
import { GetServerSideProps } from 'next';
import FilterResults from 'react-filter-search';
import Search from '@/components/modules/Search';
import Breadcrumb from '@/components/modules/Breadcrumbs';
import FundGroup from '@/components/modules/FundGroup';
import { useFundsContext } from '@/contexts/funds';
import { Collection } from '@/types/wp';
import useMessage from '@/hooks/useMessage';
import { WORDPRESS_CMS } from '@/constants/api';

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch(
    `${WORDPRESS_CMS}/collections/?_fields=title,slug,acf.collection_title,acf.collection_related_fund_vault_ids`
  );
  const collections = (await res.json()) as Collection[];

  return {
    props: {
      collections,
    },
  };
};

interface CollectionsPageProps {
  collections: Collection[];
}

const CollectionsPage = ({ collections }: CollectionsPageProps) => {
  const funds = useFundsContext();
  const [value, setValue] = useState('');

  function handleChange(event: { target: HTMLInputElement }) {
    const { value } = event.target;
    setValue(value);
  }

  // loop the funds and include any in the collections array
  const collectionFunds = useMemo(() => {
    if (funds && collections) {
      return collections
        .map((c, i) => {
          // get the vault ids from the collections
          const vaultIds = c.acf.collection_related_fund_vault_ids.split(',');
          // map them to our funds
          const holdings = funds.filter((f) =>
            vaultIds.includes(String(f.vaultId))
          );
          return {
            holdings,
            title: c.acf.collection_title,
            slug: c.slug,
            key: i,
          };
        })
        .filter(Boolean);
    }
    return [];
  }, [funds, collections]);

  return (
    <>
      <Head>
        <title>{useMessage('collections.meta.title')}</title>
      </Head>
      <div className="container mx-auto pt-16 pb-18 px-4">
        <Breadcrumb />
        <div className="flex items-end justify-end max-w-full my-10">
          <Search value={value} handleChange={handleChange} />
        </div>
        <FilterResults
          value={value}
          data={collectionFunds}
          renderResults={(results) =>
            results.map((collection) => (
              <div key={collection.key} className="mb-24">
                <FundGroup
                  namespace="collection"
                  title={collection.title}
                  funds={collection.holdings}
                  slug={`/collections/${collection.slug}`}
                />
              </div>
            ))
          }
        />
      </div>
    </>
  );
};

export default CollectionsPage;
