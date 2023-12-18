import { useState, useContext, useEffect, useRef } from 'react';
import ExpenseContext, { STATUS } from '../../store/expense-context';
import { useNavigate, useParams } from 'react-router-dom';

const ExpenseForm = (props) => {
  const expenseCtx = useContext(ExpenseContext);
  const { status } = expenseCtx;

  const isLoading = status === STATUS.LOADING;

  const amountInputRef = useRef();

  const [isOpenedForm, setIsOpenedForm] = useState(false);

  const { editMode } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
  });

  useEffect(() => {
    let tId;
    if (editMode) {
      const expense = expenseCtx.expenses.find((item) => item.id === id);

      if (expense) {
        const { amount, description, category } = expense;
        setFormData({ amount, description, category });
        setIsOpenedForm(true);
        tId = setTimeout(() => amountInputRef.current?.focus(), 0);
      }
    } else {
      setFormData({ amount: '', description: '', category: '' });
      setIsOpenedForm(false);
    }

    return () => tId && clearTimeout(tId);
  }, [id, expenseCtx.expenses]);

  const inputHandler = (e) => {
    setFormData((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    expenseCtx.addExpense({ ...formData });

    setFormData({
      amount: '',
      description: '',
      category: '',
    });
  };

  const updateFormHandler = async (e) => {
    e.preventDefault();

    expenseCtx.updatedExpense(id, formData, () => navigate('/'));
  };

  return (
    <form
      onSubmit={!editMode ? submitFormHandler : updateFormHandler}
      className='w-full'
    >
      <div className='border-b border-gray-900/10 pb-10 md:pb-12 flex items-center justify-center'>
        {isOpenedForm ? (
          <div className='grid grid-cols-4 gap-x-3 gap-y-3 w-full'>
            <div className='col-span-4 md:col-span-2 lg:col-span-1 '>
              <label
                htmlFor='amount'
                className='block text-sm font-semibold w-fit leading-6 text-gray-900 cursor-pointer'
              >
                Amount
              </label>

              <input
                ref={amountInputRef}
                onChange={inputHandler}
                value={formData.amount}
                required
                name='amount'
                id='amount'
                type='text'
                placeholder='expense amount here...'
                className={`mt-1 text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200`}
              />
            </div>

            <div className='col-span-4 md:col-span-2 lg:col-span-1'>
              <label
                htmlFor='description'
                className='block text-sm font-semibold w-fit leading-6 text-gray-900 cursor-pointer'
              >
                Description
              </label>

              <input
                onChange={inputHandler}
                value={formData.description}
                required
                name='description'
                id='description'
                type='text'
                placeholder='expense description here...'
                className={`mt-1 text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200`}
              />
            </div>

            <div className='col-span-4 md:col-span-2 lg:col-span-1'>
              <label
                htmlFor='category'
                className='block text-sm font-semibold w-fit leading-6 text-gray-900 cursor-pointer'
              >
                Category
              </label>

              <select
                onChange={inputHandler}
                value={formData.category}
                required
                name='category'
                id='category'
                className={`mt-1 text-slate-900 bg-white rounded-md block w-full px-3 h-10 shadow-sm sm:text-sm focus:outline-none placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 ring-1 ring-slate-200`}
              >
                <option disabled value=''>
                  Select Category
                </option>
                <option value='Food'>Food</option>
                <option value='Fuel'>Fuel</option>
                <option value='Health'>Health</option>
              </select>
            </div>

            <div className='col-span-4 flex items-end  md:col-span-2 lg:col-span-1'>
              <button
                disabled={isLoading}
                type='submit'
                className='inline-flex h-fit justify-center rounded-lg text-sm font-semibold py-2.5 px-4 bg-slate-900 text-white hover:bg-slate-700 w-full disabled:bg-slate-700'
              >
                {!isLoading ? (
                  <span>{!editMode ? 'Add Expense' : 'Update Expense'}</span>
                ) : (
                  <>
                    <div className='h-5 w-5 mr-3 rounded-full animate-spin border-2 border-solid border-yellow-400 border-t-transparent' />
                    <span>
                      {!editMode ? 'Adding Expense...' : 'Updating Expense...'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsOpenedForm(true)}
            type='button'
            className='rounded-lg text-md md:text-lg font-semibold py-2.5 px-8 bg-slate-900 text-white hover:bg-slate-700 w-fit disabled:bg-slate-700'
          >
            <span>Add Expense</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default ExpenseForm;
