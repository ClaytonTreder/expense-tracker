export default function ExpenseCounter({ amount }) {
  return (
    <>
      {amount.map((a, i) => (
        <>
          {i === amount.length - 2 && '.'}
          {a}
        </>
      ))}
    </>
  );
}
