import { Organization } from 'src/core/api';

import { SelectProps } from '../../components/SearchDropdown/index.types';

export type CompanySearchDropdownProps = SelectProps & { onSetCompanies?: (companies: Organization[]) => void };
