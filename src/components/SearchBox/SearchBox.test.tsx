import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ChangeEvent } from 'react';
import { SearchBox } from './SearchBox';

describe('SearchBox', () => {
  test('renders without crashing', async () => {
    render(<SearchBox />);

    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toBeVisible();
  });

  test('is focusable', () => {
    render(<SearchBox />);

    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toBeVisible();
    expect(inputElement).not.toHaveFocus();

    inputElement.focus();
    expect(inputElement).toHaveFocus();
  });

  test('change value with event notification', () => {
    const changeHandler = jest.fn();
    render(<SearchBox onChange={changeHandler} />);

    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toHaveValue('');

    const testValue = 'test value';
    const [firstLetter, ...rest] = testValue;

    changeHandler.mockImplementationOnce((e: ChangeEvent<HTMLInputElement>) => {
      expect(e.currentTarget.value).toEqual(firstLetter);
    });

    userEvent.type(inputElement, firstLetter);
    expect(inputElement).toHaveValue(firstLetter);
    expect(changeHandler).toHaveBeenCalledTimes(1);

    userEvent.type(inputElement, rest.join(''));
    expect(inputElement).toHaveValue('test value');
    expect(changeHandler).toHaveBeenCalledTimes('test value'.length);
  });

  test('delete value with event notification', () => {
    const changeHandler = jest.fn();
    render(<SearchBox onChange={changeHandler} />);

    const inputElement = screen.getByRole('searchbox');
    expect(inputElement).toHaveValue('');

    const testValue = 'test value';

    userEvent.type(inputElement, testValue);
    expect(inputElement).toHaveValue(testValue);

    changeHandler.mockClear();
    changeHandler.mockImplementationOnce((e: ChangeEvent<HTMLInputElement>) => {
      expect(e.currentTarget.value).toEqual(testValue.slice(0, -1));
    });

    userEvent.type(inputElement, '{backspace}');
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue(testValue.slice(0, -1));

    changeHandler.mockClear();
    changeHandler.mockImplementationOnce((e: ChangeEvent<HTMLInputElement>) => {
      expect(e.currentTarget.value).toEqual('');
    });

    userEvent.clear(inputElement);
    expect(changeHandler).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue('');
  });

  // NOTE: apparently asserting width changes based on
  // :focus pseudo-class is not currently possible in jsdom
  test.todo('expands / collapses based on focus state');
});
