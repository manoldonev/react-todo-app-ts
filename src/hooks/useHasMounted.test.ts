import { renderHook } from '@testing-library/react-hooks';
import { useHasMounted } from './useHasMounted';

describe('useHasMounted hook', () => {
  test('should be mounted after render', () => {
    const { result, rerender } = renderHook(() => useHasMounted());

    expect(result.current).toBe(true);

    rerender();

    expect(result.current).toBe(true);
  });
});
