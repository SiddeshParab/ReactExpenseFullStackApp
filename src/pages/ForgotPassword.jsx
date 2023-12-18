import { useRef, useState } from 'react';
import Input from '../components/UI/Input';
import { sendPasswordResetEmail } from '../services/userServices';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const PasswordReset = () => {
  const emailInputRef = useRef();

  const [isLoading, setIsLoading] = useState(false);

  const submitFormHandler = async (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim();
    if (enteredEmail.length < 1) return alert('Please enter valid email!');

    setIsLoading(true);
    try {
      const { success } = await sendPasswordResetEmail(enteredEmail);

      if (success) {
        emailInputRef.current.value = '';
        alert('email sent successfully!');
      }
      // else alert('Something went wrong!');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col gap-4 items-center justify-evenly container px-6 m-10 min-h-[50vh]'>
      <h1 className='text-xl font-semibold inline-block'>
        Request Password Reset Email
      </h1>

      <form
        onSubmit={submitFormHandler}
        className='w-full max-w-md mt-10 shadow-xl rounded-lg p-10'
      >
        <Input
          label={'Registered Email:'}
          input={{
            type: 'email',
            name: 'email',
            ref: emailInputRef,
            id: 'email',
            placeholder: 'Johndoe@gmail.com',
            required: true,
          }}
        />
        <button
          disabled={isLoading}
          type='submit'
          className='inline-flex justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full disabled:bg-slate-700'
        >
          {!isLoading ? (
            <span>Request email</span>
          ) : (
            <>
              <div className='h-5 w-5 mr-3 rounded-full animate-spin border-2 border-solid border-yellow-400 border-t-transparent' />
              <span>Sending request...</span>
            </>
          )}
        </button>

        <p className='mt-8 text-center max-w-fit'>
          <Link
            to='/login'
            className='text-sm hover:text-blue-600 flex items-center justify-center gap-1 '
          >
            <ArrowLeftIcon width={20} height={20} />
            <span>Back to login</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default PasswordReset;
