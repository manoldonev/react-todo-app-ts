import { useNavigate } from 'react-router-dom';
import { AddNewForm } from './AddNewForm';

const NewTask = (): JSX.Element => {
  const navigate = useNavigate();
  const onDismiss = (): void => navigate('/tasks');
  return (
    <div className="m-auto flex max-w-3xl flex-col px-5">
      <h1 id="label" className="py-4 text-on-surface">
        Add New Item
      </h1>
      <AddNewForm onSubmitted={onDismiss} onCancel={onDismiss} />
    </div>
  );
};

export { NewTask };
