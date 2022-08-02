import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ChangeEvent } from 'react';
import { describe, expect, test, vi } from 'vitest';
import { SearchBox } from './SearchBox';

describe('SearchBox', () => {
  test('renders without crashing', async () => {
    const { unmount } = render(<SearchBox />);

    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toBeVisible();

    unmount();
  });

  test('is focusable', () => {
    const { unmount } = render(<SearchBox />);

    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toBeVisible();
    expect(inputElement).not.toHaveFocus();

    inputElement.focus();
    expect(inputElement).toHaveFocus();

    unmount();
  });

  test('change value with event notification', async () => {
    const changeHandler = vi.fn();
    const { unmount } = render(<SearchBox onChange={changeHandler} />);

    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toHaveValue('');

    const testValue = 'test value';
    const [firstLetter, ...rest] = testValue;

    changeHandler.mockImplementationOnce((e: ChangeEvent<HTMLInputElement>) => {
      expect(e.currentTarget.value).toEqual(firstLetter);
    });

    await userEvent.type(inputElement, firstLetter);
    expect(inputElement).toHaveValue(firstLetter);
    expect(changeHandler).toHaveBeenCalledTimes(1);

    await userEvent.type(inputElement, rest.join(''));
    expect(inputElement).toHaveValue('test value');
    expect(changeHandler).toHaveBeenCalledTimes('test value'.length);

    unmount();
  });

  test('delete value with event notification', async () => {
    const changeHandler = vi.fn();
    const { unmount } = render(<SearchBox onChange={changeHandler} />);

    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toHaveValue('');

    const testValue = 'test value';

    await userEvent.type(inputElement, testValue);
    expect(inputElement).toHaveValue(testValue);

    changeHandler.mockClear();
    changeHandler.mockImplementationOnce((e: ChangeEvent<HTMLInputElement>) => {
      expect(e.currentTarget.value).toEqual(testValue.slice(0, -1));
    });

    await userEvent.type(inputElement, '{backspace}');
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue(testValue.slice(0, -1));

    changeHandler.mockClear();
    changeHandler.mockImplementationOnce((e: ChangeEvent<HTMLInputElement>) => {
      expect(e.currentTarget.value).toBe('');
    });

    await userEvent.clear(inputElement);
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue('');

    unmount();
  });

  // NOTE: apparently asserting width changes based on
  // :focus pseudo-class is not currently possible in jsdom
  test.todo('expands / collapses based on focus state');
});
