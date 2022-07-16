import styles from 'styles/components/ExpenseRecorder.module.css';

export default function ExpenseRecorder({ state, setState }) {
  const onClick = (val) => () => {
    const amount = state.amount;

    if (val !== undefined) {
      const newAmount = [...amount];
      if (amount[0] === 0) {
        newAmount.splice(0, 1);
      }
      newAmount.push(val);

      setState((prevState) => ({
        ...prevState,
        amount: newAmount,
      }));
    } else {
      const lessAmount = amount.filter((_, i) => i !== amount.length - 1);
      if (lessAmount.length === 0) lessAmount = [0, 0, 0];
      if (lessAmount.length === 1) lessAmount = [0, 0, ...lessAmount];
      if (lessAmount.length === 2) lessAmount = [0, ...lessAmount];

      setState((prevState) => ({
        ...prevState,
        amount: lessAmount,
      }));
    }
  };

  return (
    <>
      <div className={`row ${styles.Row}`}>
        <div className={`column center ${styles.Column}`}>
          <button onClick={onClick(1)}>1</button>
          <button onClick={onClick(4)}>4</button>
          <button onClick={onClick(7)}>7</button>
        </div>
        <div className={`column center ${styles.Column}`}>
          <button onClick={onClick(2)}>2</button>
          <button onClick={onClick(5)}>5</button>
          <button onClick={onClick(8)}>8</button>
          <button onClick={onClick(0)}>0</button>
        </div>
        <div className={`column center ${styles.Column}`}>
          <button onClick={onClick(3)}>3</button>
          <button onClick={onClick(6)}>6</button>
          <button onClick={onClick(9)}>9</button>
          <button onClick={onClick()}>⌫</button>
        </div>
      </div>
    </>
  );
}
