import { useNavigate } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog } from '@reach/dialog';
import { VisuallyHidden } from '@reach/visually-hidden';
import { AddNewForm } from './AddNewForm';

const NewTaskModal = (): JSX.Element => {
  const navigate = useNavigate();
  const onDismiss = (): void => navigate('/tasks');

  return (
    <Dialog
      data-testid="add-new-modal"
      onDismiss={onDismiss}
      className="m-auto flex h-full w-full max-w-3xl flex-col bg-background p-0 pb-8 text-on-surface md:my-20 md:h-auto md:w-2/3"
      aria-labelledby="label"
    >
      <div className="mb-8 flex items-center bg-primary px-8 pt-6 pb-4">
        <h1 id="label" className="mr-auto bg-primary text-on-primary">
          Add New Item
        </h1>
        <button type="button" onClick={onDismiss}>
          <VisuallyHidden>Close</VisuallyHidden>
          <XMarkIcon className="h-10 w-10 text-on-primary" aria-hidden />
        </button>
      </div>

      <div className="px-8">
        <AddNewForm onSubmitted={onDismiss} onCancel={onDismiss} />
      </div>
    </Dialog>
  );
};

export { NewTaskModal };
