import { RefreshIcon } from '@heroicons/react/outline';

const LoadingIndicator = ({ className = '' }: { className?: string }): JSX.Element => (
  <div className={`m-4 ${className}`}>
    <RefreshIcon className="inline-block w-6 h-6 animate-spin" /> Loading...
  </div>
);

export { LoadingIndicator };
