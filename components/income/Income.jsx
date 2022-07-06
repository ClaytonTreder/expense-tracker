import { useState } from 'react';

export default function Income(props) {
  const [state, setState] = useState({
    _id: props._id ?? '',
    amount: props.amount ?? '',
    user: props.user ?? '',
    occurrences: props.occurrences ?? '',
  });

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = () => {
    props.addIncome({
      _id: state.user ?? `${state.user}_new`,
      user: state.user,
      amount: state.amount,
      occurrences: state.occurrences,
    });
    setState({
      _id: '',
      amount: '',
      user: '',
      occurrences: '',
    });
  };

  const handleDelete = () => props.removeIncome(state._id);

  return (
    <>
      <div style={{ flexDirection: 'row', display: 'flex' }}>
        <div>
          User:
          <input
            type="text"
            value={state.user}
            name="user"
            onChange={handleChange}
          />
        </div>
        <div>
          Amount:
          <input
            type="number"
            value={state.amount}
            name="amount"
            onChange={handleChange}
          />
        </div>
        <div>
          Occurrences:
          <input
            type="number"
            min={1}
            value={state.occurrences}
            name="occurrences"
            onChange={handleChange}
          />
        </div>
        <div>
          {props.user ? (
            <input type="button" value="Delete" onClick={handleDelete} />
          ) : (
            <input type="button" value="Save" onClick={handleAdd} />
          )}
        </div>
      </div>
    </>
  );
}
