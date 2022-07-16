import { useState } from 'react';
import ExpenseRecorder from 'components/expenseRecorder';
import ExpenseCounter from 'components/expenseCounter';

export default function Components() {
  const [state, setState] = useState({
    amount: [0, 0, 0],
  });
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="row center">
        <ExpenseCounter amount={state.amount} />
      </div>
      <div style={{ paddingLeft: '25%', paddingRight: '25%' }}>
        <ExpenseRecorder state={state} setState={setState} />
      </div>
    </div>
  );
}
