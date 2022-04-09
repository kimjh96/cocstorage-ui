import React, { useEffect, useRef, PropsWithChildren, HTMLAttributes, MouseEvent } from 'react';
import { SerializedStyles } from '@emotion/react';

import { StyledTabs, TabsInner } from './Tabs.styles';

export interface TabsProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  centered?: boolean;
  onChange: (value: number | string) => void;
  value: number | string;
  customStyle?: SerializedStyles;
}

function Tabs({
  children,
  centered = false,
  onChange,
  value,
  customStyle,
  ...props
}: PropsWithChildren<TabsProps>) {
  const tabsInnerRef = useRef<HTMLDivElement | null>(null);
  const prevValueRef = useRef<number | string>(0);
  const isMountedRef = useRef<boolean>(false);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    const dataValue = (event.target as Element).getAttribute('data-value');

    if (!dataValue) return;

    if (!Number.isNaN(Number(dataValue))) {
      onChange(Number(dataValue));
    } else {
      onChange(dataValue);
    }
  };

  useEffect(() => {
    if (tabsInnerRef.current && (!isMountedRef.current || prevValueRef.current !== value)) {
      isMountedRef.current = true;

      const { children: childrenEl } = tabsInnerRef.current;

      for (let i = 0; i < childrenEl.length; i += 1) {
        childrenEl[i].className = childrenEl[i].className.replace(/ selected/g, '');

        const dataValue = childrenEl[i].getAttribute('data-value');

        if (!Number.isNaN(Number(dataValue)) && Number(dataValue) === value) {
          childrenEl[i].className = `${childrenEl[i].className} selected`;
        } else if (dataValue === value) {
          childrenEl[i].className = `${childrenEl[i].className} selected`;
        }
      }
    }

    prevValueRef.current = value;
  }, [value]);

  return (
    <StyledTabs
      css={customStyle}
      centered={centered}
      onClick={handleClick}
      role="tablist"
      {...props}
    >
      <TabsInner ref={tabsInnerRef}>{children}</TabsInner>
    </StyledTabs>
  );
}

export default Tabs;