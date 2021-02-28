import useAxios from 'axios-hooks';
import { WORDPRESS_CMS } from '@/constants/api';

export const useFundCms = (vaultId: string | number, fields = []) => {
  const fieldData = fields.join(',');
  const [{ data, loading, error }] = useAxios(
    `${WORDPRESS_CMS}/funds/?vaultid=${vaultId}&${fieldData}`
  );

  return {
    cmsData: data,
    loading,
    error,
  };
};
