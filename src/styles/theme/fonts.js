import { ASSETS } from 'config/constants';
import colors from './colors';

export default {
  roboto: {
    name: 'roboto',
    url: {
      regular: `${ASSETS.FONTS.PATH}roboto/roboto-regular.woff2`,
      bold: `${ASSETS.FONTS.PATH}roboto/roboto-medium.woff2`,
      semibold: `${ASSETS.FONTS.PATH}roboto/roboto-bold.woff2`,
    },
  },
  eina: {
    name: 'eina',
    url: {
      light: `${ASSETS.FONTS.PATH}eina-light.woff`,
      regular: `${ASSETS.FONTS.PATH}eina-regular.woff`,
      semibold: `${ASSETS.FONTS.PATH}eina-semibold.woff`,
      bold: `${ASSETS.FONTS.PATH}eina-bold.woff`,
      italic: `${ASSETS.FONTS.PATH}eina-regular_italic.woff`,
      bold_italic: `${ASSETS.FONTS.PATH}eina-bold_italic.woff`,
    },
  },
  colors: {
    primary: colors.elements.black,
    secondary: colors.elements.grey50,
    gradient: colors.background.gradient,
  },
  sizes: {
    xsmall: '12px',
    small: '13px',
    default: '14px',
    normal: '16px',
    medium: '20px',
    large: '24px',
    mlarge: '26px',
    xlarge: '32px',
  },
  lineheights: {
    xsmall: '1.33',
    small: '1.38',
    default: '1.43',
    normal: '1.5',
    medium: '1.25',
    large: '1.5',
    xlarge: '1.25',
  }
};
