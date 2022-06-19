import { useState } from 'react'

export default function Income(props) {
    const [amount, setAmount] = useState()
    const [user] = useState(props.user)
    const [occurrences, setOccurrences] = useState()

    const addIncome = () => {
        props.addIncome({ user, amount, occurrences })
    }

    return (
        <>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
                <div>
                    Amount:
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    Occurrences:
                    <input
                        type="number"
                        min={1}
                        value={occurrences}
                        onChange={(e) => setOccurrences(e.target.value)}
                    />
                </div>
                <div>
                    <input type="button" value="Save" onClick={addIncome} />
                </div>
            </div>
        </>
    )
}
