import { useState, useEffect } from 'react';
import CategoryComp from 'components/category';
import Income from 'components/income';
import MonthSelect from 'components/monthSelect';

export default function Category() {
  const [state, setState] = useState({
    month: null,
    categories: [],
    income: [],
  });

  const [categories, setCategories] = useState([]);

  const handleMonthChange = (month) => {
    setState((prevState) => ({ ...prevState, month }));
  };

  useEffect(() => {
    if (state.month) {
      fetch('/api/budget/' + state.month)
        .then((res) => res.json())
        .then((data) => {
          const budget = data[0];
          if (budget) {
            setState((prevState) => ({
              ...prevState,
              categories: budget.categories,
              income: budget.income,
            }));
          } else {
            setState((prevState) => ({
              ...prevState,
              categories: [],
              income: [],
            }));
          }
        });
    }
  }, [state.month]);

  const addCategory = (category) => {
    setState((prevState) => ({
      ...prevState,
      categories: [...prevState.categories, category],
    }));
  };

  const saveCateory = (category) => {
    const lessCategories = state.categories.filter(
      (cat) => cat._id !== category._id
    );
    setState((prevState) => ({
      ...prevState,
      categories: [...lessCategories, category],
    }));
  };

  const removeCategory = (_id) => {
    const lessCategories = state.categories.filter((cat) => cat._id !== _id);
    setState((prevState) => ({
      ...prevState,
      categories: lessCategories,
    }));
  };

  const addIncome = ({_id, user, amount, occurrences}) => {
    setState((prevState) => ({
      ...prevState,
      income: [
        ...prevState.income,
        { _id, user, amount, occurrences },
      ],
    }));
  };

  const saveIncome = ({ _id, user, amount, occurrences }) => {
    const lessIncome = state.income.filter(
      (inc) => inc._id !== _id 
    );
    setState((prevState) => ({
      ...prevState,
      income: [...lessIncome, { _id, user, amount, occurrences }],
    }));
  };

  const removeIncome = (_id) => {
    const lessIncome = state.income.filter((inc) => inc._id !== _id);
    setState((prevState) => ({
      ...prevState,
      income: lessIncome,
    }));
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    const data = JSON.stringify({
      month: state.month,
      year: new Date().getFullYear(),
      income: state.income.map((i) => {
        const { user, amount, occurrences } = i;
        return { user, amount, occurrences };
      }),
      categories: state.categories.map((c) => {
        const { title, amount, occurrences } = c;
        return { title, amount, occurrences };
      }),
    });
    await fetch('/api/budget', {
      method: 'POST',
      body: data,
    });
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        Months:
        <MonthSelect monthsOffset={1} handleChange={handleMonthChange} />
      </div>
      <br />
      Income:
      <br />
      <br />
      {state.income?.map((inc) => (
        <>
          <div>
            {inc.user && (
              <>
                {inc.user}:
                <br />
              </>
            )}
            <Income
              key={inc._id}
              _id={inc._id}
              user={inc.user}
              amount={inc.amount}
              occurrences={inc.occurrences}
              addIncome={saveIncome}
              removeIncome={removeIncome}
            />
          </div>
          <br />
        </>
      ))}
      <Income addIncome={addIncome} />
      <br />
      Categories:
      <br />
      <br />
      {state.categories
        ?.sort((a, b) => (a.title > b.title ? 1 : -1))
        .map((cat) => (
          <CategoryComp
            key={cat._id}
            _id={cat._id}
            removeCategory={removeCategory}
            addCategory={saveCateory}
            title={cat.title}
            amount={cat.amount}
            occurrences={cat.occurrences}
          />
        ))}
      <CategoryComp addCategory={addCategory} />
      <br />
      <br />
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
}
