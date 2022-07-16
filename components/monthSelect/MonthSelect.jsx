import { useEffect } from 'react';
import { useState } from 'react';
import months from 'shared/constants/months';
import strings from 'shared/functions/strings';

export default function MonthSelect({ monthOffset, onChange }) {
  const [state, setState] = useState({
    month: null,
  });

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      month: months.at(new Date().getMonth() + (monthOffset ?? 0)),
    }));
  }, []);

  useEffect(() => {
    onChange(state.month);
  }, [state.month]);

  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, month: e.target.value }));
  };

  return (
    <select value={state.month ?? ''} onChange={handleChange}>
      {months.map((m, i) => (
        <option value={m} key={i}>
          {strings.capitalizeFirstLetter(m)}
        </option>
      ))}
    </select>
  );
}
