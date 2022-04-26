import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  memo,
  PropsWithChildren,
  RefObject,
  HTMLAttributes,
  MouseEvent
} from 'react';
import { createPortal } from 'react-dom';
import useTheme from '@theme/useTheme';

import { GenericComponentProps } from '../../types';
import { Wrapper, StyledMenu } from './Menu.styles';

export interface MenuProps extends GenericComponentProps<HTMLAttributes<HTMLDivElement>> {
  anchorRef?: RefObject<HTMLElement>;
  open: boolean;
  centered?: boolean;
  triangleLeft?: string;
  onClose: () => void;
}

function Menu({
  children,
  anchorRef,
  open,
  centered,
  triangleLeft = '17px',
  onClose,
  customStyle,
  ...props
}: PropsWithChildren<MenuProps>) {
  const { theme } = useTheme();

  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [menuClose, setMenuClose] = useState<boolean>(false);
  const [menuContentOpen, setMenuContentOpen] = useState<boolean>(false);

  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  }>({
    top: 0,
    left: 0
  });

  const menuPortalRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => setMenuClose(true), []);

  const handleClick = useCallback(
    (event: MouseEvent<HTMLDivElement>) => event.stopPropagation(),
    []
  );

  const handleResize = useCallback(() => {
    if (
      isMounted &&
      menuOpen &&
      menuContentOpen &&
      menuRef.current &&
      anchorRef &&
      anchorRef.current
    ) {
      handleClose();
    }
  }, [isMounted, menuOpen, menuContentOpen, anchorRef, handleClose]);

  useEffect(() => {
    if (open && anchorRef && anchorRef.current) {
      const { top, left } = anchorRef.current.getBoundingClientRect();
      const { clientHeight } = anchorRef.current;
      const { scrollX } = window;

      setMenuPosition({
        top: top + clientHeight,
        left: left + scrollX
      });

      document.body.style.overflow = 'hidden';

      let menu = document.getElementById('menu-root');

      if (!menu) {
        menu = document.createElement('div');
        menu.id = 'menu-root';
        menu.style.position = 'fixed';
        menu.style.top = '0';
        menu.style.left = '0';
        menu.style.width = '100%';
        menu.style.height = '100%';
        menu.style.zIndex = '1000';
        menu.setAttribute('role', 'presentation');

        document.body.appendChild(menu);
      }

      menuPortalRef.current = menu;

      setIsMounted(true);
      setMenuOpen(true);
    }
  }, [open, anchorRef]);

  useEffect(() => {
    if (
      isMounted &&
      menuOpen &&
      !menuContentOpen &&
      menuRef.current &&
      anchorRef &&
      anchorRef.current
    ) {
      const { clientWidth } = menuRef.current;
      const { clientWidth: anchorClientWidth } = anchorRef.current;

      let left = menuPosition.left - clientWidth + anchorClientWidth + 16;

      if (centered) left = menuPosition.left - clientWidth / 2 + anchorClientWidth / 2;

      setMenuPosition({
        top: menuPosition.top + 12,
        left
      });

      setMenuContentOpen(true);
    }
  }, [isMounted, menuOpen, menuContentOpen, anchorRef, menuPosition, centered]);

  useEffect(() => {
    if (menuClose) onClose();
  }, [menuClose, onClose]);

  useEffect(() => {
    if (!open && menuClose && menuContentOpen && menuPortalRef.current) {
      menuPortalRef.current?.remove();
      menuPortalRef.current = null;

      setIsMounted(false);
      setMenuOpen(false);
      setMenuClose(false);
      setMenuContentOpen(false);

      document.body.removeAttribute('style');
    }
  }, [open, menuClose, menuContentOpen]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  if (isMounted && menuPortalRef.current) {
    return createPortal(
      <Wrapper menuOpen={menuOpen} menuClose={menuClose} onClick={handleClose}>
        <StyledMenu
          theme={theme}
          ref={menuRef}
          menuContentOpen={menuContentOpen}
          menuPosition={menuPosition}
          centered={centered}
          triangleLeft={triangleLeft}
          onClick={handleClick}
          css={customStyle}
          role="menu"
          {...props}
        >
          {children}
        </StyledMenu>
      </Wrapper>,
      menuPortalRef.current
    );
  }

  return null;
}

export default memo(Menu);
