import { useNavigate } from 'react-router-dom';
import { AddNewForm } from './AddNewForm';

const NewTask = (): JSX.Element => {
  const navigate = useNavigate();
  const onDismiss = (): void => navigate('/tasks');
  return (
    <div className="flex flex-col max-w-3xl px-5 m-auto">
      <h1 id="label" className="py-4 text-on-surface">
        Add New Item
      </h1>
      <AddNewForm onSubmitted={onDismiss} onCancel={onDismiss} />
    </div>
  );
};

export { NewTask };
