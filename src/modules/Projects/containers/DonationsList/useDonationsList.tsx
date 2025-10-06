import { useEffect, useState } from 'react';
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
  };
};
