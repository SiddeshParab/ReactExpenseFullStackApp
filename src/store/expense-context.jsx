import React, { useEffect, useReducer, useContext } from 'react';
import {
  addExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from '../services/expenseServices';

import AuthContext from './auth-context';
import { toast } from 'react-toastify';

export const STATUS = Object.freeze({
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
});

const ExpenseContext = React.createContext({
  expenses: [],
  totalExpenseAmount: null,
  status: STATUS.IDLE,
  addExpense: async (expense) => {},
  deleteExpense: async (id) => {},
  updatedExpense: async (id, expense) => {},
});

const initialExpenseState = {
  expenses: [],
  status: STATUS.IDLE,
  totalExpenseAmount: 0,
};

const expensesReducer = (state, action) => {
  if (action.type === 'GET_EXPENSES') {
    const initialTotalAmount = action.expenses.reduce(
      (acc, curr) => acc + +curr.amount,
      0
    );

    return {
      expenses: action.expenses,
      totalExpenseAmount: initialTotalAmount,
    };
  }
  if (action.type === 'ADD_EXPENSE') {
    const updatedExpenses = [...state.expenses, action.expense];
    const totalAmount = state.totalExpenseAmount + +action.expense.amount;

    return {
      ...state,
      expenses: updatedExpenses,
      totalExpenseAmount: totalAmount,
    };
  }
  if (action.type === 'DELETE_EXPENSE') {
    const updatedExpenses = state.expenses.filter(
      (item) => item.id !== action.id
    );

    const expense = state.expenses.find((i) => i.id === action.id);
    const totalAmount = state.totalExpenseAmount - expense.amount;

    return {
      ...state,
      expenses: updatedExpenses,
      totalExpenseAmount: totalAmount,
    };
  }
  if (action.type === 'UPDATE_EXPENSE') {
    const expenseIndex = state.expenses.findIndex(
      (item) => item.id === action.payload.id
    );
    const expense = state.expenses[expenseIndex];

    let updatedExpenses = [...state.expenses];

    let totalAmount = state.totalExpenseAmount;

    if (expense) {
      let updatedExpense = { ...expense, ...action.payload.expense };
      updatedExpenses[expenseIndex] = updatedExpense;

      totalAmount =
        totalAmount - expense.amount + +action.payload.expense.amount;
    }

    return {
      ...state,
      expenses: updatedExpenses,
      totalExpenseAmount: totalAmount,
    };
  }

  // Status dispatches
  if (action.type === STATUS.LOADING) {
    return { ...state, status: STATUS.LOADING };
  }
  if (action.type === STATUS.IDLE) {
    return { ...state, status: STATUS.IDLE };
  }
  if (action.type === STATUS.ERROR) {
    return { ...state, status: STATUS.ERROR };
  }

  return state;
};

export const ExpenseProvider = (props) => {
  const [expensesState, dispatchExpenses] = useReducer(
    expensesReducer,
    initialExpenseState
  );

  const authCtx = useContext(AuthContext);
  let { isLoggedIn, userEmail } = authCtx;

  const getExpensesHandler = async () => {
    try {
      dispatchExpenses({ type: STATUS.LOADING });

      const { data } = await getExpenses(userEmail);
      const expenses = [];

      if (data) {
        for (const [key, value] of Object.entries(data)) {
          expenses.push({ id: key, ...value });
        }
      }

      dispatchExpenses({ type: 'GET_EXPENSES', expenses });
      dispatchExpenses({ type: STATUS.IDLE });
    } catch (error) {
      console.log(error);
      dispatchExpenses({ type: STATUS.ERROR });
    }
  };

  useEffect(() => {
    const tId = setTimeout(() => getExpensesHandler(), 10);

    return () => clearTimeout(tId);
  }, [isLoggedIn, userEmail]);

  const addExpenseHandler = async (expense) => {
    try {
      dispatchExpenses({ type: STATUS.LOADING });

      const {
        data: { name: id },
      } = await addExpense(expense, userEmail);

      dispatchExpenses({
        type: 'ADD_EXPENSE',
        expense: { id, ...expense },
      });
      dispatchExpenses({ type: STATUS.IDLE });
      toast.success('Expense added successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to add expense!');
      dispatchExpenses({ type: STATUS.IDLE });
    }
  };

  const deleteExpenseHandler = async (id) => {
    try {
      dispatchExpenses({ type: STATUS.LOADING });

      await deleteExpense(id, userEmail);

      dispatchExpenses({ type: 'DELETE_EXPENSE', id });
      dispatchExpenses({ type: STATUS.IDLE });
      toast.success('Expense deleted successfully!');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete expense!');
      dispatchExpenses({ type: STATUS.IDLE });
    }
  };

  const updatedExpenseHandler = async (id, expense, cb) => {
    try {
      dispatchExpenses({ type: STATUS.LOADING });
      const { data } = await updateExpense(id, expense, userEmail);

      dispatchExpenses({
        type: 'UPDATE_EXPENSE',
        payload: { id, expense: data },
      });
      dispatchExpenses({ type: STATUS.IDLE });
      toast.success('Expense updated successfully!');
      cb();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update expense!');
      dispatchExpenses({ type: STATUS.IDLE });
    }
  };

  const expenseContext = {
    expenses: expensesState.expenses,
    totalExpenseAmount: expensesState.totalExpenseAmount,
    status: expensesState.status,

    addExpense: addExpenseHandler,
    deleteExpense: deleteExpenseHandler,
    updatedExpense: updatedExpenseHandler,
  };

  return (
    <ExpenseContext.Provider value={expenseContext}>
      {props.children}
    </ExpenseContext.Provider>
  );
};

export default ExpenseContext;
