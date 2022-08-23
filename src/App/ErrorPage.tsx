import { useErrorMessage } from './useErrorMessage';

const ErrorPage = (): JSX.Element => {
  const errorMessage = useErrorMessage();

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl items-center justify-center p-3">
      <div role="alert">
        <div className="rounded-t bg-error px-4 py-2 font-bold text-on-error">Oops!</div>
        <div className="flex flex-col rounded-b border border-t-0 border-error bg-error-container px-4 py-3 text-on-error-container">
          <h2>Something went wrong:</h2>
          <pre className="whitespace-pre-wrap break-all">{errorMessage}</pre>
        </div>
      </div>
    </main>
  );
};

export { ErrorPage };
