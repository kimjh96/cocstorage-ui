import { Theme } from '@emotion/react';

export const dark: Theme = {
  type: 'dark',
  palette: {
    primary: {
      main: '#3C89FF',
      sub1: '#67A4FF',
      sub2: '#1F6BDE',
      sub3: '#B7D4FF',
      bg1: 'rgba(59, 137, 255, 0.15)',
      bg2: 'rgba(59, 137, 255, 0.13)',
      bg3: 'rgba(59, 137, 255, 0.07)'
    },
    secondary: {
      red: {
        main: '#FC4F4F',
        sub1: '#FF8585',
        sub2: '#DE3838',
        sub3: '#FFC6C6',
        bg: 'rgba(252, 79, 79, 0.15)'
      },
      green: {
        main: '#4AD871',
        sub1: '#84D89C',
        sub2: '#28B14E',
        sub3: '#C0DEC9',
        bg: 'rgba(74, 216, 113, 0.15)'
      },
      yellow: {
        main: '#FFBF44',
        sub1: '#FFD687',
        sub2: '#E5AD3F',
        sub3: '#FFE9BD',
        bg: 'rgba(255, 191, 68, 0.15)'
      }
    },
    text: {
      light: {
        main: '#232A3D',
        text1: 'rgba(35, 42, 61, 0.7)',
        text2: 'rgba(35, 42, 61, 0.5)',
        text3: 'rgba(35, 42, 61, 0.3)'
      },
      dark: {
        main: '#EEF3FF',
        text1: 'rgba(238, 243, 255, 0.7)',
        text2: 'rgba(238, 243, 255, 0.5)',
        text3: 'rgba(238, 243, 255, 0.3)'
      }
    },
    box: {
      filled: {
        normal: 'rgba(238, 243, 255, 0.08)',
        focused: 'rgba(238, 243, 255, 0.04)',
        pressed: 'rgba(238, 243, 255, 0.11)',
        disabled: 'rgba(204, 218, 255, 0.03)'
      },
      stroked: {
        normal: 'rgba(238, 243, 255, 0.15)'
      }
    },
    background: {
      bg: '#1D1F27',
      fg1: '#282B33',
      fg2: '#343740'
    },
    gradation: {
      first: '#63DAFF',
      second: '#4891FF',
      third: '#717EFF'
    },
    common: {
      white: '#FFFFFF',
      black: '#000000'
    }
  },
  breakpoints: {
    xs: 0,
    sm: 425,
    md: 768,
    lg: 1024,
    xl: 1440
  }
};
