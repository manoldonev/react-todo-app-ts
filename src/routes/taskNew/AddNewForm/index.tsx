/* eslint-disable react/jsx-props-no-spreading */
import { Formik } from 'formik';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';
import { useCreateTodoMutation } from '../../../generated';

const AddNewForm = ({ onSubmit, onCancel }: { onSubmit: () => void; onCancel: () => void }): JSX.Element => {
  const queryClient = useQueryClient();
  const { mutate } = useCreateTodoMutation<Error>({
    onSuccess: async () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      queryClient.invalidateQueries('Todos.infinite');
    },
  });

  return (
    <Formik
      initialValues={{ title: '', note: '' }}
      validationSchema={Yup.object().shape(
        {
          title: Yup.string()
            .trim()
            .max(20, 'Must be 20 characters or less')
            .when('note', {
              is: (note?: string) => note == null || note.length === 0,
              then: Yup.string().required('At least one of the fields is required'),
            }),
          note: Yup.string()
            .trim()
            .max(20000, 'Must be 20000 characters or less')
            .when('title', {
              is: (title?: string) => title == null || title.length === 0,
              then: Yup.string().required('At least one of the fields is required'),
            }),
        },
        [['title', 'note']],
      )}
      onSubmit={(values, { setSubmitting }) => {
        // TODO: extend db schema with real 'title' field
        // TODO: user management (auth)
        mutate({ input: { task: values.note || values.title, done: false, user_id: '1' } });
        setSubmitting(false);
        onSubmit();
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="relative">
            <input
              id="title"
              type="text"
              placeholder="Title"
              {...formik.getFieldProps('title')}
              className="w-full h-12 px-3 text-lg text-gray-900 placeholder-transparent border border-gray-300 rounded-md outline-blue-700 bg-gray-50 focus:border-blue-500 peer"
            />
            <label
              htmlFor="title"
              className="absolute left-0 peer-placeholder-shown:top-2.5 peer-placeholder-shown:left-3.5 peer-focus:first-line:-top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg text-sm -top-6 transition-all"
            >
              Title
            </label>
            {(formik.touched.title ?? false) && formik.errors.title != null && formik.errors.title.length > 0 && (
              <span className="text-sm text-red-500">{formik.errors.title}</span>
            )}
          </div>
          <div className="relative my-8">
            <textarea
              id="note"
              placeholder="Note"
              {...formik.getFieldProps('note')}
              rows={2}
              className="block w-full p-3 text-lg text-gray-900 placeholder-transparent border border-gray-300 rounded-md resize-y min-h-[3.5rem] bg-gray-50 outline-blue-700 focus:border-blue-500 peer"
            />
            <label
              htmlFor="note"
              className="absolute left-0 peer-placeholder-shown:top-3.5 peer-placeholder-shown:left-3.5 peer-focus:first-line:-top-3.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-lg text-sm -top-6 transition-all"
            >
              Note
            </label>
            {(formik.touched.note ?? false) && formik.errors.note != null && formik.errors.note.length > 0 && (
              <span className="text-sm text-red-500">{formik.errors.note}</span>
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
      )}
    </Formik>
  );
};

export { AddNewForm };
/* eslint-enable react/jsx-props-no-spreading */
