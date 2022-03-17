import { useNavigate } from 'react-router-dom';
import { XIcon } from '@heroicons/react/outline';
import Dialog from '@reach/dialog';
import VisuallyHidden from '@reach/visually-hidden';
import { AddNewForm } from './AddNewForm';

const NewTaskModal = (): JSX.Element => {
  const navigate = useNavigate();
  const onDismiss = (): void => navigate('/tasks');

  return (
    <Dialog
      data-testid="add-new-modal"
      onDismiss={onDismiss}
      className="flex flex-col w-full h-full max-w-3xl m-auto md:w-2/3 md:h-auto md:my-20 bg-surface text-on-surface"
      aria-labelledby="label"
    >
      <div className="flex items-center mb-10">
        <h1 id="label" className="mr-auto">
          Add New Item
        </h1>
        <button type="button" onClick={onDismiss}>
          <VisuallyHidden>Close</VisuallyHidden>
          <XIcon className="w-10 h-10" aria-hidden />
        </button>
      </div>

      <AddNewForm onSubmitted={onDismiss} onCancel={onDismiss} />
    </Dialog>
  );
};

export { NewTaskModal };
