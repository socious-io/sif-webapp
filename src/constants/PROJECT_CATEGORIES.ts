export const PROJECT_CATEGORIES = [
  {
    id: '1',
    label: 'Emerging markets',
    value: 'EMERGING_MARKETS',
  },
  {
    id: '2',
    label: 'Open innovation',
    value: 'OPEN_INNOVATION',
  },
  {
    id: '3',
    label: 'Women leaders',
    value: 'WOMEN_LEADERS',
  },
];

export const categoriesAdaptor = value => {
  const category = PROJECT_CATEGORIES.find(cat => cat.value === value);
  return category ? category.label : null;
};
