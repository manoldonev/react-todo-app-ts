/* eslint-disable react/jsx-props-no-spreading */
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateTodo } from './useCreateTodo';

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative">
        <input
          id="title"
          type="text"
          placeholder="Title"
          {...register('title')}
          className="w-full h-12 px-3 text-lg text-gray-900 placeholder-transparent border border-gray-300 rounded-md outline-blue-700 bg-gray-50 focus:border-blue-500 peer"
        />
        <label
          htmlFor="title"
          className="absolute left-0 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3.5 peer-focus:first-line:-top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg text-sm -top-6 transition-all"
        >
          Title
        </label>
        {touchedFields.title != null && errors.title != null && (
          <span className="text-sm text-red-500">{errors.title.message}</span>
        )}
      </div>
      <div className="relative my-8">
        <textarea
          id="note"
          placeholder="Note"
          {...register('note')}
          rows={2}
          className="block w-full p-3 text-lg text-gray-900 placeholder-transparent border border-gray-300 rounded-md resize-y min-h-[3.5rem] bg-gray-50 outline-blue-700 focus:border-blue-500 peer"
        />
        <label
          htmlFor="note"
          className="absolute left-0 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3.5 peer-focus:first-line:-top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg text-sm -top-6 transition-all"
        >
          Note
        </label>
        {touchedFields.note != null && errors.note != null && (
          <span className="text-sm text-red-500">{errors.note.message}</span>
        )}
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-24 h-12 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2"
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-24 h-12 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export { AddNewForm };
/* eslint-enable react/jsx-props-no-spreading */