import { useEffect, useState } from 'react';
import { CURRENCIES } from 'src/constants/CURRENCIES';
import { Donate, getProjectDonationsAdaptor } from 'src/core/adaptors';

export const useDonationsList = projectId => {
  const [donationsList, setDonationsList] = useState<Donate[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(10);

  const fetchData = async (pageNum: number) => {
    const { data } = await getProjectDonationsAdaptor(projectId, pageNum, limit);
    if (data) {
      setDonationsList(data.items);
      setTotal(data.total);
      setLimit(data.limit);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const onChangePage = async (newPage: number) => {
    setPage(newPage);
    await fetchData(newPage);
  };

  const totalPage = Math.ceil(total / limit);

  const getCurrencyLabel = (currencyValue: string) => {
    const currency = CURRENCIES.find(c => c.value === currencyValue);
    return currency?.label || currencyValue;
  };

  return {
    data: {
      donationsList,
      page,
      totalPage,
      total,
    },
    operations: {
      onChangePage,
    },
    utils: {
      getCurrencyLabel,
    },
  };
};
