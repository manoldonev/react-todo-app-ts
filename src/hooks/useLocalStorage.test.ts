import { act, renderHook } from '@testing-library/react-hooks';
import { useLocalStorage } from './useLocalStorage';

const defaultValue = 'DEFAULT';

describe('useLocalStorage hook', () => {
  beforeAll(() => {
    // HACK: remove when renderHook API adds support for React 18
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    window.localStorage.clear();
  });

  test('should return default value if not set', () => {
    const testKey = 'test-key';
    const { result } = renderHook(() => useLocalStorage<string>(testKey, defaultValue));
    const [value] = result.current;

    expect(value).toBe(defaultValue);
  });

  test('should return stored value if set', () => {
    const testKey = 'test-key2';
    const testValue = 'test-value2';

    window.localStorage.setItem(testKey, JSON.stringify(testValue));

    const { result } = renderHook(() => useLocalStorage<string>(testKey, defaultValue));
    const [value] = result.current;

    expect(value).toBe(testValue);
  });

  test('should persist to local storage', () => {
    const testKey = 'test-key3';
    const testValue = 'test-value3';
    const { result } = renderHook(() => useLocalStorage<string>(testKey, defaultValue));
    let [value, setValue] = result.current;

    expect(value).toBe(defaultValue);

    act(() => setValue(testValue));

    [value, setValue] = result.current;
    expect(value).toBe(testValue);
  });

  test('should overwrite local storage', () => {
    const testKey = 'test-key3';
    const testValueOld = 'test-value3';
    const testValueNew = 'test-value3';

    window.localStorage.setItem(testKey, JSON.stringify(testValueOld));

    const { result } = renderHook(() => useLocalStorage<string>(testKey, defaultValue));
    let [value, setValue] = result.current;

    expect(value).toBe(testValueOld);

    act(() => setValue(testValueNew));

    [value, setValue] = result.current;
    expect(value).toBe(testValueNew);
  });
});
