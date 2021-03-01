import { useIntl } from 'react-intl';

const useMessage = (id: string, values = {}) => {
  const { formatMessage } = useIntl();

  return formatMessage({ id }, values);
};

export default useMessage;
