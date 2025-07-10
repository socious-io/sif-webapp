export type Card = {
  id: string;
  name: string;
  date: string;
  cardNumber: string;
  holderImage: JSX.Element;
};

export interface AddCardModalProps {
  open: boolean;
  handleClose: () => void;
  onSelectCard: (card: Card) => void;
}
