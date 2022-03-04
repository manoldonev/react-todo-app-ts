// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import MatchMediaMock from 'jest-matchmedia-mock';

// eslint-disable-next-line no-new
const matchMedia = new MatchMediaMock();

Object.defineProperty(window, 'scrollTo', {
  value: (_x: number, y: number) => {
    document.documentElement.scrollTop = y;
  },
  writable: true,
});

export { matchMedia };
