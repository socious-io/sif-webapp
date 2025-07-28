import { Divider, IconButton, MenuItem, MenuList } from '@mui/material';
import { config } from 'src/config';
import { translate } from 'src/core/helpers/utils';

import styles from './index.module.scss';
import { IconDropDownProps } from './index.types';
import { useIconDropDown } from './useIconDropDown';
import Avatar from '../Avatar';
import AvatarLabelGroup from '../AvatarLabelGroup';
import IconListItem from './IconListItem';

const IconDropDown: React.FC<IconDropDownProps> = props => {
  const {
    size = '40px',
    type,
    img,
    iconName,
    customStyle,
    accounts = [],
    iconItems = [],
    customItems = [],
    createItem = false,
  } = props;
  const { open, handleOpen, handleClose, onSwitchAccount, handleClick } = useIconDropDown();
  const currentAccount = accounts.find(a => a.current);
  const otherAccounts = accounts.filter(a => !a.current);

  return (
    <div className="flex flex-col items-end relative">
      <IconButton
        className={`${styles['avatarBtn']} ${open && `${styles['avatarBtnOpen']}`}`}
        disableRipple
        onClick={handleClick}
        aria-label="icon-button"
      >
        <Avatar
          size={size}
          type={type}
          img={img || currentAccount?.img}
          iconName={iconName}
          iconCustomStyle="!cursor-pointer"
        />
      </IconButton>
      {open && (
        <MenuList autoFocusItem className={`${styles['menuList']} ${customStyle}`} onMouseLeave={handleClose}>
          {!!currentAccount && (
            <MenuItem
              key={currentAccount.id}
              className={styles['menuItem']}
              onFocus={handleOpen}
              onBlur={handleClose}
              onMouseDown={handleClose}
              onClick={handleClose}
            >
              <AvatarLabelGroup account={currentAccount} />
            </MenuItem>
          )}
          <Divider className="!m-0" />
          {otherAccounts.map(a => (
            <MenuItem
              key={a.id}
              className={styles['menuItem']}
              onFocus={handleOpen}
              onBlur={handleClose}
              onMouseDown={() => onSwitchAccount(a.id)}
              onClick={() => onSwitchAccount(a.id)}
            >
              <AvatarLabelGroup account={a} />
            </MenuItem>
          ))}
          {createItem && (
            <MenuItem
              key="create-account"
              className={styles['menuItem']}
              onFocus={handleOpen}
              onBlur={handleClose}
              onMouseDown={() =>
                (window.location.href = `${config.sociousIDBaseURL}/organizations/register/pre?next=${config.appBaseURL}/home`)
              }
              onClick={() =>
                (window.location.href = `${config.sociousIDBaseURL}/organizations/register/pre?next=${config.appBaseURL}/home`)
              }
            >
              <IconListItem
                iconName="plus"
                label={translate('header-create-org')}
                customIconClass="text-Brand-700"
                customLabelClass={styles['createLabel']}
              />
            </MenuItem>
          )}
          {iconItems.length ? <Divider className="!m-0" /> : ''}
          {iconItems.map(i => (
            <div key={i.label}>
              <MenuItem
                className={styles['menuItem']}
                onFocus={handleOpen}
                onBlur={handleClose}
                onMouseDown={i.onClick}
                onClick={i.onClick}
              >
                <IconListItem iconName={i.iconName} label={i.label} />
              </MenuItem>
              <Divider className="!m-0 w-full" />
            </div>
          ))}
          {customItems.length ? <Divider className="!m-0" /> : ''}
          {customItems.map((i, index) => (
            <MenuItem
              key={index}
              sx={{ padding: '0' }}
              className={styles['menuItem']}
              onFocus={handleOpen}
              onBlur={handleClose}
            >
              {i}
            </MenuItem>
          ))}
        </MenuList>
      )}
    </div>
  );
};

export default IconDropDown;
