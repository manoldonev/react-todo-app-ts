import { ArrowPathIcon } from '@heroicons/react/24/outline';

const LoadingIndicator = ({ className = '' }: { className?: string }): JSX.Element => (
  <div className={`m-4 ${className}`}>
    <ArrowPathIcon className="inline-block h-6 w-6 animate-spin" /> Loading...
  </div>
);

export { LoadingIndicator };
