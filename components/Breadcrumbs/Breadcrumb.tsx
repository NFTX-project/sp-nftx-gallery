import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Icon, { Icons, Size } from '../Icon';
import useMessage from '../../hooks/message';

const Breadcrumbs = () => {
  const { asPath } = useRouter();
  const path = useMemo(() => {
    return asPath.split('/').filter((p) => p !== '');
  }, [asPath]);

  return (
    <nav className="flex flex-wrap items-center uppercase text-sm">
      {path.map((p, i) => {
        // join the URL together based on where you are
        const href = path.slice(0, i + 1).join('/');

        return (
          <div key={`${i}_${p}`} className="mr-1 flex items-center">
            {i !== 0 && (
              <span className="mr-1">
                <Icon name={Icons.CHEVRON_RIGHT} size={Size.SMALL} />
              </span>
            )}
            <Link href={`/${href}/`}>
              <a
                className={
                  i + 1 === path.length ? 'text-gray-50' : 'text-gray-300'
                }
              >
                {useMessage(`breadcrumb.${p}`)}
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
