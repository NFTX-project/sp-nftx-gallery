import React from 'react';
import { useRouter } from 'next/router';
import FundContainer from '@/containers/Fund';
import useMessage from '@/hooks/message';
import useFund from '@/hooks/fund';

const FundPage = () => {
  const router = useRouter();
  const fund = useFund(router.query.fund as string);

  if (fund === false) {
    return (
      <div className="container text-center mx-auto px-4 py-20 text-gray-50">
        <p>{useMessage('fund.notfound')}</p>
      </div>
    );
  }

  if (fund == null) {
    return (
      <div className="container text-center mx-auto px-4 py-20 text-gray-50">
        <p>{useMessage('fund.loading')}</p>
      </div>
    );
  }

  return <FundContainer fundKey={router.query.fund} {...fund} />;
};

export default FundPage;
