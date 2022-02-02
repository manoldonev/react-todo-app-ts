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
        <div className="px-4 py-2 font-bold text-white bg-red-500 rounded-t">Oops!</div>
        <div className="flex flex-col px-4 py-3 text-red-700 bg-red-100 border border-t-0 border-red-400 rounded-b">
          <h3>Something went wrong:</h3>
          <pre className="whitespace-pre-wrap">{error.message}</pre>
          <button
            type="button"
            onClick={resetErrorBoundary}
            className="mx-auto mt-5 w-24 h-12 text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center whitespace-nowrap bg-red-50"
          >
            Try again
          </button>
        </div>
      </div>
    </main>
  );
};

export { ErrorFallback };
