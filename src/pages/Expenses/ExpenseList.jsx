import { useContext } from 'react';
import ExpenseContext, { STATUS } from '../../store/expense-context';
import ExpenseModel from './ExpenseModel';
import Loader from '../../components/UI/Loader';

const ExpenseList = () => {
  const expenseCtx = useContext(ExpenseContext);

  const { status } = expenseCtx;

  let content = (
    <h3 className='text-center text-xl font-bold'>No Expense found...</h3>
  );

  if (expenseCtx.expenses.length > 0)
    content = expenseCtx.expenses.map((expense) => (
      <ExpenseModel key={expense.id} expense={expense} />
    ));

  if (status === STATUS.LOADING)
    return <Loader className='p-4 border-4 border-blue-500' />;

  if (status === STATUS.ERROR && expenseCtx.expenses.length === 0)
    return (
      <h1 className='text-center text-xl font-bold'>
        Oops! Something went wrong!
      </h1>
    );

  return (
    <div className='flex flex-col items-center w-full gap-3 mt-2 md:mt-4'>
      {content}
      {expenseCtx.expenses.length > 0 && (
        <h1 className='mt-1 flex md:self-end text-xl py-2 px-4 text-white bg-[#2f4883] rounded-md shadow-md'>
          Total Expense : &nbsp;
          <span className='font-bold'>
            {' '}
            &#8377; {expenseCtx.totalExpenseAmount.toFixed(2)}
          </span>
        </h1>
      )}
    </div>
  );
};

export default ExpenseList;
