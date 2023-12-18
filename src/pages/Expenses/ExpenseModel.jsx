import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { HiPencilAlt, HiOutlineTrash } from 'react-icons/hi';
import ExpenseContext from '../../store/expense-context';

const ExpenseModel = ({ expense }) => {
  const expenseCtx = useContext(ExpenseContext);

  const deleteExpenseHandler = async (id) => {
    expenseCtx.deleteExpense(id);
  };

  return (
    <div className='flex w-full p-4 border bg-slate-100/80 border-slate-300 rounded-md shadow-md justify-between gap-3 md:gap-10 items-center'>
      <div className='flex flex-col md:flex-row md:items-center flex-1 items-start gap-0 md:gap-5'>
        <h3 className='font-bold text-lg md:text-xl min-w-[100px]'>
          {expense.category}
        </h3>
        <p className='flex-1'>{expense.description}</p>
        <h2 className='font-bold text-xl md:text-2xl mt-2 md:mt-0 w-fit'>
          &#8377; {expense.amount}
        </h2>
      </div>

      <div className='flex gap-2'>
        <button onClick={() => deleteExpenseHandler(expense.id)}>
          <HiOutlineTrash className='text-red-400' size={24} />
        </button>
        <Link to={`/expenses/${expense.id}?editMode=true`}>
          <HiPencilAlt size={24} />
        </Link>
      </div>
    </div>
  );
};

export default ExpenseModel;
