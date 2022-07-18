import React, { CSSProperties } from 'react';

import styleCustomButton from '../../style/CustomButton.module.css';

type ButtonPropsType = {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  style?: CSSProperties | undefined;
};

export const CustomButton = React.memo((props: ButtonPropsType) => {
  const { onClick, title, disabled, style } = props;
  const onButtonClick = (): any => {
    onClick();
  };
  return (
    <button
      className={styleCustomButton.button}
      onClick={onButtonClick}
      disabled={disabled}
      style={style}
    >
      {title}
    </button>
  );
});
