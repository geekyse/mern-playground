import { getLang } from '@util/query-param';

export const formatCurrency = (price) => {
  price = price.toFixed(2);
  const locale = getLang();
  const currency = locale == 'en' ? 'AED' : 'د.إ.';

  return <span className={'price-container'}>
        <span className={'currency-sign'}>{currency}</span>
        <span className={'price-value'}>{price}</span>
    </span>;
};

