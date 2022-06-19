import { useState } from 'react'
import { useEffect } from 'react'
import months from 'shared/constants/months'

export default function Home() {
    const [expenses, setExpenses] = useState()
    const [budget, setBudget] = useState()
    const [shownExpense, setShownExpense] = useState()

    useEffect(() => {
        fetch(
            `/api/expense?month=${months.at(
                new Date().getMonth()
            )}&year=${new Date().getFullYear()}`
        )
            .then((res) => res.json())
            .then((data) => setExpenses(data))
    }, [])

    useEffect(() => {
        fetch(`/api/budget/${months.at(new Date().getMonth())}`)
            .then((res) => res.json())
            .then((data) => {
                setBudget(data[0])
                console.log(data)
            })
    }, [])

    const showExpenses = (title) => () => {
        setShownExpense(title === shownExpense ? '' : title)
    }

    return (
        <>
            <div>
                <main>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingLeft: '25%',
                            paddingRight: '25%',
                            justifyContent: 'space-between',
                            paddingBottom: '1.5%',
                        }}
                    >
                        <u style={{ width: '33%' }}>Title</u>
                        <u style={{ width: '33%' }}>Amount</u>
                        <u style={{ width: '33%' }}>Spent</u>
                    </div>
                    {budget &&
                        expenses &&
                        budget.categories?.map((cat) => (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        paddingLeft: '25%',
                                        paddingRight: '25%',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <div style={{ width: '33%' }}>
                                        {cat.title}
                                    </div>
                                    <div style={{ width: '33%' }}>
                                        {cat.amount}
                                    </div>
                                    <div style={{ width: '33%' }}>
                                        <u onClick={showExpenses(cat.title)}>
                                            {expenses &&
                                                expenses
                                                    .map((e) =>
                                                        e.category === cat.title
                                                            ? e.amount
                                                            : 0
                                                    )
                                                    .reduce(
                                                        (a, b) => a + b,
                                                        0
                                                    ) / 100}
                                        </u>
                                    </div>
                                </div>
                                {shownExpense &&
                                    shownExpense === cat.title &&
                                    expenses && (
                                        <>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    flexDirection: 'row',
                                                    paddingLeft: '30%',
                                                    paddingRight: '25%',
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                <u
                                                    style={{
                                                        width: '33%',
                                                    }}
                                                >
                                                    Title
                                                </u>
                                                <u
                                                    style={{
                                                        width: '33%',
                                                    }}
                                                >
                                                    Amount
                                                </u>
                                                <u
                                                    style={{
                                                        width: '33%',
                                                    }}
                                                >
                                                    Added On
                                                </u>
                                            </div>
                                            {expenses
                                                .filter(
                                                    (e) =>
                                                        cat.title ===
                                                            e.category &&
                                                        e.category ===
                                                            shownExpense
                                                )
                                                .map((e, i) => (
                                                    <div
                                                        key={i}
                                                        style={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            paddingLeft: '30%',
                                                            paddingRight: '25%',
                                                            justifyContent:
                                                                'space-between',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: '33%',
                                                            }}
                                                        >
                                                            {e.title}
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: '33%',
                                                            }}
                                                        >
                                                            {e.amount / 100}
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: '33%',
                                                            }}
                                                        >
                                                            {new Date(
                                                                e.addedOn
                                                            ).toLocaleDateString()}
                                                            -
                                                            {new Date(
                                                                e.addedOn
                                                            ).toLocaleTimeString()}
                                                        </div>
                                                    </div>
                                                ))}
                                        </>
                                    )}
                            </>
                        ))}
                </main>
            </div>
        </>
    )
}
