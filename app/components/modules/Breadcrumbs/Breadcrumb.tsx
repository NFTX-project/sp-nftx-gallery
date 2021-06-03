import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Icon, { Icons, Size } from '@/components/elements/Icon';
import useMessage from '@/hooks/useMessage';

const denylist = ['collections'];

const Breadcrumbs = () => {
  const { asPath, pathname } = useRouter();
  const routerPath = pathname.split('/').filter(Boolean);
  const path = useMemo(() => {
    return asPath.split('/').filter(Boolean);
  }, [asPath]);

  return (
    <nav className="flex flex-wrap items-center uppercase text-sm">
      <Link href="/">
        <a className="dark:text-gray-400 text-gray-800">
          {useMessage('breadcrumb.home')}
        </a>
      </Link>
      {path.map((p, i) => {
        if (denylist.includes(p)) {
          return null;
        }

        // join the URL together based on where you are
        const href = path.slice(0, i + 1).join('/');

        let message: string;

        if (routerPath[i] === '[fund]') {
          message = useMessage('breadcrumb.fund', {
            fund: p,
          });
        } else if (routerPath[i] === '[asset]') {
          message = useMessage('breadcrumb.asset', {
            asset: p,
          });
        } else if (routerPath[i] === '[collection]') {
          message = useMessage('breadcrumb.collection', {
            collection: p,
          });
        } else {
          message = useMessage(`breadcrumb.${p}`);
        }

        return (
          <div key={`${i}_${p}`} className="mr-1 flex items-center">
            <span className="mr-1 dark:text-gray-400 text-gray-800">
              <Icon name={Icons.CHEVRON_RIGHT} size={Size.SMALL} />
            </span>
            <Link href={`/${href}/`}>
              <a
                className={
                  i + 1 === path.length
                    ? 'dark:text-gray-50 text-gray-900'
                    : 'dark:text-gray-400 text-gray-800'
                }
              >
                {message}
              </a>
            </Link>
          </div>
        );
      })}
    </nav>
  );
};

Breadcrumbs.displayName = 'Breadcrumbs';

export default React.memo(Breadcrumbs);
