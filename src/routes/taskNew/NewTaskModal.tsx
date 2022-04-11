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
      className="m-auto flex h-full w-full max-w-3xl flex-col bg-surface text-on-surface md:my-20 md:h-auto md:w-2/3"
      aria-labelledby="label"
    >
      <div className="mb-10 flex items-center">
        <h1 id="label" className="mr-auto">
          Add New Item
        </h1>
        <button type="button" onClick={onDismiss}>
          <VisuallyHidden>Close</VisuallyHidden>
          <XIcon className="h-10 w-10" aria-hidden />
        </button>
      </div>

      <AddNewForm onSubmitted={onDismiss} onCancel={onDismiss} />
    </Dialog>
  );
};

export { NewTaskModal };
