export interface TokensDropdownProps {
  open: boolean;
  onClose: () => void;
  tokens: string[];
  onSelectToken: (token: string) => void;
}
