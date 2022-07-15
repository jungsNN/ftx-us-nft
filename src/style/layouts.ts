import { MediaQueries, Breakpoints, Spacing } from "./types";

export const breakpointMap: { [key: string]: number } = {
  mobile: 639,
  tablet: 1023,
  desktop: 2560,
};

const breakpoints: Breakpoints = Object.values(breakpointMap).map((breakpoint) => `${breakpoint}px`);

const mediaQueries: MediaQueries = {
  mobile: `@media screen and (min-width: ${breakpointMap.mobile}px)`,
  tablet: `@media screen and (min-width: ${breakpointMap.tablet}px)`,
  desktop: `@media screen and (min-width: ${breakpointMap.desktop}px)`,
};

const spacing: Spacing = [0, 4, 8, 16, 24, 32, 48, 64];

const radii = {
    default: "8px",
    small: "4px",
    circle: "50%",
    };

const zIndices = {
  dropdown: 10,
  modal: 100,
};

const sizes = {
  card: {
    default: '345px',
    small: '287px',
    mobile:  '100%',
    tablet: 'calc(100vw / 3.2)'
  },
  button: {
    default: '160px',
    sm: '64',
  }
}

export default {
  siteWidth: 1200,
  breakpoints,
  mediaQueries,
  spacing,
  radii,
  zIndices,
  sizes,
};