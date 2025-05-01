import { InputBase } from '@mui/material';
import React, { useState } from 'react';
import { translate } from 'src/core/helpers/utils';
import Avatar from 'src/modules/General/components/Avatar';
import Button from 'src/modules/General/components/Button';
import CustomEmojiPicker from 'src/modules/General/components/EmojiPicker';
import Icon from 'src/modules/General/components/Icon';

import css from './index.module.scss';
import { SendBoxProps } from './index.types';

const SendBox: React.FC<SendBoxProps> = ({
  userImg,
  value,
  onChange,
  onEmojiSelect,
  onSend,
  name = '',
  placeholder = translate('feeds-comment-box-placeholder'),
  buttonText = translate('feeds-comment-send'),
  disabled = false,
  className = '',
}) => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false);

  const onEnter = (e: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if ('key' in e && e.key === 'Enter') {
      e.preventDefault();
      onChange?.(value + ' \n ');
    }
  };

  return (
    <div className={`${css.container} ${className}`}>
      <Avatar size="2rem" img={userImg} type="users" />
      <div className="flex-1 flex flex-col rounded-default p-3 border border-solid border-Gray-light-mode-200 emoji-font">
        <InputBase
          name={name}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          inputProps={{ style: { padding: 0 } }}
          multiline
          minRows={2}
          onKeyDown={onEnter}
        />
        <div className="w-full flex gap-4 justify-end">
          <Icon
            name="face-smile"
            fontSize={24}
            className="text-Gray-light-mode-500"
            cursor="pointer"
            onClick={() => setOpenEmojiPicker(true)}
          />

          <Button color="primary" onClick={onSend}>
            {buttonText}
          </Button>
        </div>
      </div>
      {openEmojiPicker && (
        <CustomEmojiPicker
          open={openEmojiPicker}
          handleClose={() => setOpenEmojiPicker(false)}
          onEmojiSelect={value => {
            onEmojiSelect(value.native);
            setOpenEmojiPicker(false);
          }}
          customStyle="sm:left-24 rounded-none rounded-t-lg"
        />
      )}
    </div>
  );
};

export default SendBox;
