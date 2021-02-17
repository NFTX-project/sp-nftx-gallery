import React, { useEffect, useState } from 'react';
import Logo from '../Logo';
import Link from 'next/link';
import Button from '@/components/Button';
import { Kind, Size } from '@/components/Button/constants';
import Icon, { Icons, Size as IconSize } from '@/components/Icon';
import { getFundKey } from '@/utils/getFundKey';
import { useFundsContext } from '@/contexts/funds';
import useMessage from '@/hooks/message';

const Header = () => {
  const funds = useFundsContext();
  const [feelingLucky, setFeelingLucky] = useState(null);

  useEffect(() => {
    if (funds?.length) {
      setFeelingLucky(funds[Math.floor(Math.random() * funds.length)]);
    }
  }, [funds]);

  return (
    <header className="sticky top-0 z-10 border-b-2 border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 h-16 md:h-18 flex items-center justify-between">
        <nav>
          <Link href="/">
            <a className="flex items-center">
              <Logo />
            </a>
          </Link>
        </nav>
        <aside className="flex justify-center md:justify-end flex-wrap">
          <Link href={`/funds/${getFundKey(feelingLucky)}`} passHref={true}>
            <Button size={Size.SMALL} kind={Kind.ICON}>
              <Icon name={Icons.SPARKLE} size={IconSize.SMALL} />
              <span className="hidden">
                {useMessage('home.cta.feelingLucky')}
              </span>
            </Button>
          </Link>
          <Link href="https://nftx.org/" passHref={true}>
            <Button
              className="ml-3"
              kind={Kind.PRIMARY}
              icon={Icons.EXTERNAL_LINK}
              target="_blank"
              size={Size.SMALL}
            >
              {useMessage('home.cta.app')}
            </Button>
          </Link>
        </aside>
      </div>
    </header>
  );
};

export default Header;
