import MonthSelect from 'components/monthSelect';
import ExpenseRecorder from 'components/expenseRecorder';
import ExpenseCounter from 'components/expenseCounter';
import { useState } from 'react';
import { useEffect } from 'react';
import months from 'shared/constants/months';
import strings from 'shared/functions/strings';

export default function Expense() {
  const [state, setState] = useState({ amount: [0, 0, 0] });

  const handleMonthChange = (value) => {
    setState((prevState) => ({
      ...prevState,
      month: value,
      category: '',
    }));
  };
  const handleCategoryChange = (e) =>
    setState((prevState) => ({ ...prevState, category: e.target.value }));
  const handleTitleChange = (e) =>
    setState((prevState) => ({ ...prevState, title: e.target.value }));

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      month: months.at(new Date().getMonth()),
    }));
  }, []);

  useEffect(() => {
    fetch('/api/budget', { method: 'GET' })
      .then((res) => res.json())
      .then((data) => {
        setState((prevState) => ({
          ...prevState,
          categories: data.find(
            (d) =>
              d.month === state.month && d.year === new Date().getFullYear()
          )?.categories,
        }));
      });
  }, [state.month]);

  const record = () => {
    fetch('/api/expense', {
      method: 'POST',
      body: JSON.stringify({
        title: state.title,
        amount: state.amount.join().replace(/,/g, ''),
        category: state.category,
        month: state.month,
        year: new Date().getFullYear(),
      }),
    });
    setState((prevState) => ({ ...prevState, title: '', amount: [0, 0, 0] }));
  };

  return (
    <div>
      <div
        className="row center"
        style={{
          paddingLeft: '25%',
          paddingRight: '25%',
        }}
      >
        <MonthSelect monthOffset={0} onChange={handleMonthChange} />
      </div>
      <div
        className="row center"
        style={{
          paddingLeft: '25%',
          paddingRight: '25%',
        }}
      >
        {state.categories && (
          <select value={state.category} onChange={handleCategoryChange}>
            <option value={''}>Select a category</option>
            {state.categories
              .sort((a, b) => (a.title > b.title ? 1 : -1))
              .map((m, i) => (
                <option value={m.title} key={i}>
                  {strings.capitalizeFirstLetter(m.title)}
                </option>
              ))}
          </select>
        )}
      </div>
      {state.category && (
        <>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="row center">
              <ExpenseCounter amount={state.amount} />
            </div>
            <div style={{ paddingLeft: '25%', paddingRight: '25%' }}>
              <ExpenseRecorder state={state} setState={setState} />
            </div>
          </div>
          <div
            className="row center"
            style={{
              paddingLeft: '25%',
              paddingRight: '25%',
            }}
          >
            <input
              type="text"
              value={state.title}
              onChange={handleTitleChange}
            />
          </div>
          <div
            className="row center"
            style={{
              paddingLeft: '25%',
              paddingRight: '25%',
            }}
          >
            <input type="submit" value="Record" onClick={record} />
          </div>
        </>
      )}
    </div>
  );
}
