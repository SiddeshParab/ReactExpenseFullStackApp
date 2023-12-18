import { useLocation } from 'react-router-dom';
import ExpenseForm from './Expenses/ExpenseForm';
import ExpenseList from './Expenses/ExpenseList';

const Home = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  let editMode = false;
  editMode = query.get('editMode');

  // console.log(editMode);
  return (
    <div className='p-6 flex flex-col container max-w-5xl items-center justify-center gap-8'>
      <div className='flex flex-col items-center'>
        <h2 className='text-lg font-semibold text-gray-900 mb-0'>
          Welcome to expense tracker app!
        </h2>
        <p className='mt-1 text-sm leading-6 text-gray-600'>
          Make all your expenses of your pocket size.
        </p>
      </div>

      <ExpenseForm editMode={editMode === 'true' ? true : false} />
      <ExpenseList />
    </div>
  );
};

export default Home;
