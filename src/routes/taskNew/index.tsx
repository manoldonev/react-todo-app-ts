import { XIcon } from '@heroicons/react/outline';
import Dialog from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import { useNavigate } from 'react-router-dom';
import { AddNewForm } from './AddNewForm';

const NewTask = (): JSX.Element => {
  const navigate = useNavigate();
  const onDismiss = (): void => navigate('/tasks');
  return (
    <div className="flex flex-col max-w-3xl px-5 m-auto">
      <h1 id="label" className="py-4 text-slate-600">
        Add New Item
      </h1>
      <AddNewForm onSubmit={onDismiss} onCancel={onDismiss} />
    </div>
  );
};

const NewTaskModal = (): JSX.Element => {
  const navigate = useNavigate();
  const onDismiss = (): void => navigate(-1);

  return (
    <Dialog
      onDismiss={onDismiss}
      className="flex flex-col w-full h-full max-w-3xl m-auto md:w-2/3 md:h-auto md:my-20"
      aria-labelledby="label"
    >
      <div className="flex items-center mb-10">
        <h1 id="label" className="mr-auto text-slate-600">
          Add New Item
        </h1>
        <button type="button" onClick={onDismiss}>
          <VisuallyHidden>Close</VisuallyHidden>
          <XIcon className="w-10 h-10 text-slate-600" aria-hidden />
        </button>
      </div>

      <AddNewForm onSubmit={onDismiss} onCancel={onDismiss} />
    </Dialog>
  );
};

export { NewTask, NewTaskModal };
