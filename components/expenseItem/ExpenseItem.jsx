import { useState } from 'react';

export default function ExpenseItem({ expense }) {
  const [state, setState] = useState({
    editing: false,
    deleted: false,
    loading: false,
    resMessage: null,
    initAmount: expense.amount / 100,
    amount: expense.amount / 100,
  });

  const setLoading = (loading) =>
    setState((prevState) => ({ ...prevState, loading }));

  const handleEdit = (value) => () =>
    setState((prevState) => ({
      ...prevState,
      editing: value,
      amount: value ? prevState.amount : prevState.initAmount,
    }));

  const handleEditChange = (e) =>
    setState((prevState) => ({
      ...prevState,
      amount: e.target.value,
    }));

  const handleSave = (id) => () => {
    setLoading(true);
    fetch(`/api/expense/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ amount: parseFloat(state.amount) * 100 }),
    }).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        
        setState((prevState) => ({
          ...prevState,
          editing: false,
          resMessage: 'Saved!',
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          editing: false,
          resMessage: 'Failed to save, let Clay know.',
        }));
      }
    });
  };

  const handleDelete = (id) => async () => {
    setLoading(true);
    fetch(`/api/expense/${id}`, { method: 'DELETE' }).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setState({ deleted: true });
      } else {
        setState((prevState) => ({
          ...prevState,
          resMessage: 'Failed to delete, let Clay know.',
        }));
      }
    });
  };

  return (
    <>
      {!state.deleted && (
        <div className="row" style={{ width: '100%', marginBottom: '2%' }}>
          <div style={{ width: '25%', marginLeft: '5%' }}>{expense.title}</div>
          <div style={{ width: '20%' }}>
            {state.editing ? (
              <input
                disabled={state.loading}
                type="text"
                onChange={handleEditChange}
                value={state.amount}
              />
            ) : (
              parseFloat(state.amount).toFixed(2)
            )}
          </div>
          <div style={{ width: '20%' }}>
            {' '}
            {new Date(expense.addedOn).toLocaleDateString()}
          </div>
          <div style={{ width: '12.5%' }}>
            {!state.editing ? (
              <button disabled={state.loading} onClick={handleEdit(true)}>
                Edit
              </button>
            ) : (
              <button disabled={state.loading} onClick={handleEdit(false)}>
                Cancel
              </button>
            )}
          </div>
          <div style={{ width: '12.5%' }}>
            {state.editing ? (
              <>
                <button
                  disabled={state.loading}
                  onClick={handleSave(expense._id)}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                disabled={state.loading}
                onClick={handleDelete(expense._id)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      )}
      <div className="row center">{state.resMessage}</div>
    </>
  );
}
