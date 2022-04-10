import { act, renderHook } from '@testing-library/react-hooks';
import { matchMedia } from '../../../jest.setup';
import { useColorMode, ColorMode } from './useColorMode';

describe('useColorMode hook', () => {
  beforeEach(() => {
    matchMedia.clear();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    (<any>matchMedia).currentMediaQuery = '';

    localStorage.clear();
  });

  test('should default to light', () => {
    const { result } = renderHook(() => useColorMode());

    const [colorMode] = result.current;
    expect(colorMode).toBe(ColorMode.Light);
  });

  test('should respect media query preference', () => {
    matchMedia.useMediaQuery('(prefers-color-scheme: dark)');
    const { result } = renderHook(() => useColorMode());

    const [colorMode] = result.current;
    expect(colorMode).toBe(ColorMode.Dark);
  });

  test('should support toggling to dark', () => {
    const { result } = renderHook(() => useColorMode());

    let [colorMode, setColorMode] = result.current;
    expect(colorMode).toBe(ColorMode.Light);

    act(() => setColorMode(ColorMode.Dark));

    [colorMode, setColorMode] = result.current;
    expect(colorMode).toBe(ColorMode.Dark);
  });
});
