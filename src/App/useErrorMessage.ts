import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const useErrorMessage = (): string => {
  const error = useRouteError();
  let message;

  if (isRouteErrorResponse(error)) {
    message = `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    message = error.message;
  } else {
    message = JSON.stringify(error);
  }

  return message;
};

export { useErrorMessage };
