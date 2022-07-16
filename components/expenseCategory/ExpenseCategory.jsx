import ExpenseItem from 'components/expenseItem';
import { useState } from 'react';

export default function ExpenseCategory({ category, expenses }) {
  const [state, setState] = useState({ showExpenses: false, expenses });

  const handleExpensesClick = () => {
    setState((prevState) => ({
      ...prevState,
      showExpenses: !prevState.showExpenses,
    }));
  };

  return (
    <>
      <div className="row" style={{ width: '100%', marginBottom: '1.5%' }}>
        <div style={{ width: '31%' }}>{category.title}</div>
        <div style={{ width: '27%' }}>
          {(category.amount * (category.occurrences ?? 1)).toFixed(2)}
        </div>
        <div style={{ width: '27%' }}>
          <u onClick={handleExpensesClick}>
            {(
              state.expenses
                ?.map((e) => e.amount ?? 0)
                .reduce((a, b) => a + b, 0) / 100
            ).toFixed(2)}
          </u>
        </div>
        <div style={{ width: '27%' }}>
          {(
            category.amount * (category.occurrences ?? 1) -
            state.expenses
              ?.map((e) => e.amount ?? 0)
              .reduce((a, b) => a + b, 0) /
              100
          ).toFixed(2)}
        </div>
      </div>
      {state.showExpenses && (
        <>
          <div className="row" style={{ width: '100%', marginBottom: '1.5%' }}>
            <div style={{ width: '25%', marginLeft: '5%' }}>
              <u>Title</u>
            </div>
            <div style={{ width: '20%' }}>
              <u>Amount</u>
            </div>
            <div style={{ width: '20%' }}>
              <u>Added On</u>
            </div>
            <div style={{ width: '12.5%' }}>&nbsp;</div>
            <div style={{ width: '12.55%' }}>&nbsp;</div>
          </div>
          <div className="column" style={{ width: '100%', margin: '0.5% 0%' }}>
            {state.expenses.map((e) => (
              <ExpenseItem
                key={e._id}
                expense={e}
              />
            ))}
          </div>
          <hr style={{ width: '100%' }} />
        </>
      )}
    </>
  );
}
