import { InputHTMLAttributes, ReactElement, forwardRef, useRef, useState } from 'react';

import { GenericComponentProps, Size } from '../../types';
import { Input, Label, StartIconWrapper, StyledTextBar } from './TextBar.styles';

export interface TextBarProps
  extends GenericComponentProps<Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>> {
  size?: Exclude<Size, 'pico'>;
  fullWidth?: boolean;
  startIcon?: ReactElement;
  label?: string;
  value: string;
}

const TextBar = forwardRef<HTMLInputElement, TextBarProps>(function TextBar(
  { size = 'medium', fullWidth, startIcon, label, value, placeholder, customStyle, ...props },
  ref
) {
  const TextBarRef = useRef<HTMLInputElement | null>(null);

  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => setIsFocused(!isFocused);

  return (
    <StyledTextBar
      ref={ref}
      css={customStyle}
      fullWidth={fullWidth}
      isFocused={isFocused}
      size={size}
    >
      {startIcon && <StartIconWrapper size={size}>{startIcon}</StartIconWrapper>}
      <Input
        ref={TextBarRef}
        fullWidth={fullWidth}
        hasStartIcon={!!startIcon}
        value={value}
        placeholder={label ? undefined : placeholder}
        onFocus={handleFocus}
        onBlur={handleFocus}
        {...props}
      />
      {label && (
        <Label size={size} isFocused={isFocused} hasValue={!!value || !!startIcon}>
          {label}
        </Label>
      )}
    </StyledTextBar>
  );
});

export default TextBar;
