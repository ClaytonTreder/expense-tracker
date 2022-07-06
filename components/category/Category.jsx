import { useState } from 'react';

export default function Category(props) {
  const [state, setState] = useState({
    _id: props._id ?? '',
    title: props.title ?? '',
    amount: props.amount ?? '',
    occurrences: props.occurrences ?? '',
  });

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = () => {
    props.addCategory({
      _id: state._id ?? `${state.title}_new`,
      title: state.title,
      amount: state.amount,
      occurrences: state.occurrences,
    });

    setState({ title: '', amount: '', occurrences: '' });
  };

  const handleDelete = () => props.removeCategory(state._id);

  return (
    <div style={{ flexDirection: 'row', display: 'flex' }}>
      <div>
        Title:
        <input
          type="text"
          name="title"
          value={state.title}
          onChange={handleChange}
        />
      </div>
      <div>
        Amount:
        <input
          type="number"
          name="amount"
          value={state.amount}
          onChange={handleChange}
        />
      </div>
      <div>
        Occurrences:
        <input
          type="number"
          name="occurrences"
          min={1}
          value={state.occurrences}
          onChange={handleChange}
        />
      </div>
      <div>
        {props.title ? (
          <input type="button" value="Delete" onClick={handleDelete} />
        ) : (
          <input type="button" value="Add" onClick={handleAdd} />
        )}
      </div>
    </div>
  );
}
