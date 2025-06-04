import styles from './index.module.scss';
import { CreditCardProps } from './index.types';

const CreditCard: React.FC<CreditCardProps> = ({ name, date, cardNumber, holderImage }) => {
  return (
    <div className={styles['card']}>
      <img src="/icons/pay-pass.svg" className={styles['card__icon']} />
      <img src="/images/lines.svg" className={styles['card__lines']} />
      <div className={styles['card__info']}>
        <div className={styles['card__number']}>
          <div className={styles['card__name']}>
            {name}
            <span>{date}</span>
          </div>
          {cardNumber}
        </div>
        {holderImage}
      </div>
    </div>
  );
};

export default CreditCard;
