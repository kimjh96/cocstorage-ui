import React, { memo, HTMLAttributes } from 'react';
import { SerializedStyles } from '@emotion/react';
import useTheme from '@theme/useTheme';

import { StyledAvatar } from './Avatar.styles';

export interface AvatarProps extends HTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  round?: boolean;
  customStyle?: SerializedStyles;
}

function Avatar({ src, alt, width, height, round, customStyle, ...props }: AvatarProps) {
  const { theme } = useTheme();

  return (
    <StyledAvatar
      theme={theme}
      src={src}
      alt={alt}
      avatarWidth={width}
      avatarHeight={height}
      round={round}
      css={customStyle}
      {...props}
    />
  );
}

export default memo(Avatar);