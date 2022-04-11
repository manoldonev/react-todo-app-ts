/* eslint-disable react/jsx-props-no-spreading */
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateTodo } from './hooks/useCreateTodo';

const validationSchema = yup.object().shape(
  {
    title: yup
      .string()
      .trim()
      .max(20, 'Must be 20 characters or less')
      .when('note', {
        is: (note?: string) => note == null || note.length === 0,
        then: yup.string().required('At least one of the fields is required'),
      }),
    note: yup
      .string()
      .trim()
      .max(20000, 'Must be 20000 characters or less')
      .when('title', {
        is: (title?: string) => title == null || title.length === 0,
        then: yup.string().required('At least one of the fields is required'),
      }),
  },
  [['title', 'note']],
);

interface Inputs {
  title: string;
  note: string;
}

const AddNewForm = ({ onSubmitted, onCancel }: { onSubmitted: () => void; onCancel: () => void }): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<Inputs>({ resolver: yupResolver(validationSchema) });

  const { mutate: createTodo } = useCreateTodo();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    // TODO: extend db schema with real 'title' field
    // TODO: user management (auth)
    createTodo({ input: { task: data.note || data.title, done: false, user_id: '1' } });
    onSubmitted();
  };

  return (
    <form data-testid="add-new-form" className="bg-surface" onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <input
          id="title"
          type="text"
          placeholder="Title"
          {...register('title')}
          className="peer h-12 w-full rounded-md border border-outline/50 bg-primary-container/20 px-3 text-lg text-on-primary-container placeholder-transparent outline-primary"
        />
        <label
          htmlFor="title"
          className="absolute left-0 -top-6 text-sm transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3.5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-outline/60 peer-focus:first-line:-top-3.5"
        >
          Title
        </label>
        {(touchedFields.title != null || touchedFields.note == null) && errors.title != null && (
          <span className="text-sm text-error">{errors.title.message}</span>
        )}
      </div>
      <div className="relative my-8">
        <textarea
          id="note"
          placeholder="Note"
          {...register('note')}
          rows={2}
          className="peer block min-h-[3.5rem] w-full resize-y rounded-md border border-outline/50 bg-primary-container/20 p-3 text-lg text-on-primary-container placeholder-transparent outline-primary"
        />
        <label
          htmlFor="note"
          className="absolute left-0 -top-6 text-sm transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3.5 peer-placeholder-shown:text-lg peer-placeholder-shown:text-outline/60 peer-focus:first-line:-top-3.5"
        >
          Note
        </label>
        {(touchedFields.note != null || touchedFields.title == null) && errors.note != null && (
          <span className="text-sm text-error">{errors.note.message}</span>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="mr-2 h-12 w-24 rounded-lg bg-secondary px-5 py-2.5 text-center text-sm font-medium text-on-secondary outline-none hover:bg-secondary-variant focus:ring-4 focus:ring-secondary/50"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="h-12 w-24 rounded-lg border border-secondary bg-background px-5 py-2.5 text-center text-sm font-medium text-secondary outline-none hover:border-secondary-variant hover:bg-secondary-variant hover:text-on-secondary focus:ring-4 focus:ring-secondary/50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export { AddNewForm };
/* eslint-enable react/jsx-props-no-spreading */
