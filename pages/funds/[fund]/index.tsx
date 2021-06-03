import React from 'react';
import { useRouter } from 'next/router';
import FundTemplate from '@/components/templates/Fund';
import useMessage from '@/hooks/useMessage';
import useFund from '@/hooks/useFund';

const FundPage = () => {
  const router = useRouter();
  const fund = useFund(router.query.fund as string);

  if (fund === false) {
    return (
      <div className="container text-center mx-auto px-4 py-20  dark:text-gray-50 text-gray-800">
        <p>{useMessage('fund.notfound')}</p>
      </div>
    );
  }

  if (fund == null) {
    return (
      <div className="container text-center mx-auto px-4 py-20  dark:text-gray-50 text-gray-800">
        <p>{useMessage('fund.loading')}</p>
      </div>
    );
  }

  return <FundTemplate fundKey={router.query.fund} {...fund} />;
};

export default FundPage;
