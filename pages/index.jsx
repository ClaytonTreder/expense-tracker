import ExpenseCategory from 'components/expenseCategory';
import MonthSelect from 'components/monthSelect';
import { useState, useEffect } from 'react';
import months from 'shared/constants/months';

export default function Home() {
  const [state, setState] = useState({
    month: null,
    expenses: null,
    budget: null,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      month: months.at(new Date().getMonth()),
    }));
    getData(months.at(new Date().getMonth()));
  }, []);

  const getData = (month) => {
    getExpenses(month).then(() => getBudget(month));
  };

  const getExpenses = async (month) => {
    await fetch(`/api/expense?month=${month}&year=${new Date().getFullYear()}`)
      .then((res) => res.json())
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          expenses: data,
        }));
      });
  };

  const getBudget = async (month) => {
    await fetch(`/api/budget/${month}`)
      .then((res) => res.json())
      .then((data) =>
        setState((prevState) => ({
          ...prevState,
          budget: data[0],
        }))
      );
  };

  const handleMonthChange = async (value) => {
    setState((prevState) => ({ ...prevState, month: value }));
    getData(value);
  };

  return (
    <>
      <div className="row center">
        <MonthSelect monthOffset={0} onChange={handleMonthChange} />
      </div>
      <div>
        <main>
          <div
            className="row"
            style={{
              paddingLeft: '2%',
              paddingRight: '2%',
              justifyContent: 'space-between',
              paddingBottom: '1.5%',
              maxWidth: '100%',
              overflowX: 'hidden',
            }}
          >
            <u style={{ width: '31%' }}>Title</u>
            <u style={{ width: '27%' }}>Amount</u>
            <u style={{ width: '27%' }}>Spent</u>
            <u style={{ width: '27%' }}>Remaining</u>
          </div>
          {state.budget?.categories
            ?.sort((a, b) => (a.title > b.title ? 1 : -1))
            .map((cat) => (
              <div
                key={cat._id}
                className="column"
                style={{
                  paddingLeft: '2%',
                  paddingRight: '2%',
                  justifyContent: 'space-between',
                  paddingBottom: '1%',
                }}
              >
                <ExpenseCategory
                  category={cat}
                  expenses={state.expenses?.filter(
                    (e) => e.category === cat.title
                  )}
                />
              </div>
            ))}
        </main>
      </div>
    </>
  );
}
