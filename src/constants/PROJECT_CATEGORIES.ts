export type ProjectCategory = {
  id: string;
  label: string;
  value: string;
};

export const PROJECT_CATEGORIES: ProjectCategory[] = [
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

export const categoriesAdaptor = (value: string): string | null => {
  const category = PROJECT_CATEGORIES.find(cat => cat.value === value);
  return category ? category.label : null;
};
