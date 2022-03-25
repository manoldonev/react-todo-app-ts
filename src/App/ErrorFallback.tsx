const ErrorFallback = ({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}): JSX.Element => {
  return (
    <main className="flex items-center justify-center max-w-2xl min-h-screen p-3 mx-auto">
      <div role="alert">
        <div className="px-4 py-2 font-bold rounded-t text-on-error bg-error">Oops!</div>
        <div className="flex flex-col px-4 py-3 border border-t-0 rounded-b border-error text-on-error-container bg-error-container">
          <h2>Something went wrong:</h2>
          <pre className="break-all whitespace-pre-wrap">{error.message}</pre>
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="mx-auto mt-5 w-24 h-12 text-error hover:text-on-error border border-error hover:bg-error focus:ring-4 focus:ring-error/25 font-medium rounded-lg text-sm px-5 py-2.5 text-center whitespace-nowrap bg-on-error"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
};

export { ErrorFallback };
