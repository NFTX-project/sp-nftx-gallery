import React, { useEffect, useState } from 'react';
import Logo from '@/components/elements/Logo';
import Link from 'next/link';
import Button, { Kind } from '@/components/elements/Button';
import Icon, { Icons, Size as IconSize } from '@/components/elements/Icon';
import { getFundKey } from '@/utils/getFundKey';
import { useFundsContext } from '@/contexts/funds';
import useMessage from '@/hooks/useMessage';
import { useRouter } from 'next/router';
import { FormattedMessage } from 'react-intl';

const Header = () => {
  const funds = useFundsContext();
  const { asPath } = useRouter();
  const [feelingLucky, setFeelingLucky] = useState(null);

  useEffect(() => {
    // @TODO make this smarter so it can't link to itself and get stuck
    if (funds?.length) {
      setFeelingLucky(funds[Math.floor(Math.random() * funds.length)]);
    }
  }, [funds, asPath]);

  return (
    <header className="border-b-2 border-gray-800 bg-gray-900">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-gray-50">
        <div className="container mx-auto text-xs px-4 py-1 flex justify-between font-bold">
          {useMessage('header.beta.text', {
            version: process.env.appVersion,
          })}
          <Link href="https://nftx.canny.io/">
            <a className="ml-2 underline hover:no-underline" target="_blank">
              {useMessage('header.beta.feedback')}
            </a>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-5 flex items-center">
        <nav className="flex">
          <Link href="https://nftx.org/">
            <a className="flex items-center mr-4">
              <Logo />
            </a>
          </Link>
          <Link href="https://app.nftx.org/" passHref={true}>
            <Button kind={Kind.INVERT} className="hidden sm:block mr-2">
              <FormattedMessage id="header.menu.app" />
            </Button>
          </Link>
          <Link href="https://gallery.nftx.org/" passHref={true}>
            <Button kind={Kind.OUTLINE} className="hidden sm:block mr-2">
              <FormattedMessage id="header.menu.gallery" />
            </Button>
          </Link>
          <Link href="https://discord.gg/SAZRt6m5Yw" passHref={true}>
            <Button
              kind={Kind.INVERT}
              className="hidden sm:block mr-2"
              target="_blank"
            >
              <FormattedMessage id="header.menu.discord" />
            </Button>
          </Link>
          <Link href="https://docs.nftx.org" passHref={true}>
            <Button kind={Kind.INVERT} className="hidden sm:block mr-2">
              <FormattedMessage id="header.menu.docs" />
            </Button>
          </Link>
        </nav>
        <aside className="flex justify-center ml-auto flex-wrap">
          <Link href={`/funds/${getFundKey(feelingLucky)}`} passHref={true}>
            <Button kind={Kind.ICON}>
              <Icon name={Icons.SPARKLE} size={IconSize.SMALL} />
              <span className="hidden">
                {useMessage('home.cta.feelingLucky')}
              </span>
            </Button>
          </Link>
          <Link href="https://app.nftx.org/" passHref={true}>
            <Button className="ml-3" kind={Kind.PRIMARY}>
              {useMessage('home.cta.app')}
            </Button>
          </Link>
        </aside>
      </div>
    </header>
  );
};

export default Header;
