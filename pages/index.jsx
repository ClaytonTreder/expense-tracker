import { useState } from 'react'
import { useEffect } from 'react'
import months from 'shared/constants/months'
import strings from 'shared/functions/strings'

export default function Home() {
    const [expenses, setExpenses] = useState()
    const [budget, setBudget] = useState()
    const [shownExpense, setShownExpense] = useState()
    const [month, setMonth] = useState()

    useEffect(() => {
        setMonth(months.at(new Date().getMonth()))
    }, [])

    const getExpenses = async () => {
        await fetch(
            `/api/expense?month=${month}&year=${new Date().getFullYear()}`
        )
            .then((res) => res.json())
            .then((data) => setExpenses(data))
    }

    const getBudget = async () => {
        await fetch(`/api/budget/${month}`)
            .then((res) => res.json())
            .then((data) => setBudget(data[0]))
    }

    useEffect(() => {
        getBudget()
        getExpenses()
    }, [month])

    const showExpenses = (title) => () =>
        setShownExpense(title === shownExpense ? '' : title)

    const deleteExpense = (id) => async () => {
        await fetch(`/api/expense/${id}`, { method: 'DELETE' })
        getExpenses()
    }

    const handleMonthChange = (e) => {
        setMonth(e.target.value)
        console.log(
            budget?.categories.map((c) => {
                return c.amount
            })
        )
    }
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <select value={month} onChange={handleMonthChange}>
                    {months.map((m, i) => (
                        <option value={m} key={i}>
                            {strings.capitalizeFirstLetter(m)}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingLeft: '2%',
                    }}
                >
                    <h4 style={{ margin: '0' }}>
                        Monthly income:{' '}
                        {budget?.income
                            .map((e) =>
                                e.amount ? e.amount * (e.occurrences ?? 1) : 0
                            )
                            .reduce((a, b) => a + b, 0)}
                    </h4>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingLeft: '2%',
                    }}
                >
                    <h4 style={{ margin: '0' }}>
                        Income remaining:{' '}
                        {budget &&
                            expenses &&
                            budget.income
                                .map((e) =>
                                    e.amount
                                        ? e.amount * (e.occurrences ?? 1)
                                        : 0
                                )
                                .reduce((a, b) => a + b, 0) -
                                expenses
                                    .map((e) => e.amount ?? 0)
                                    .reduce((a, b) => a + b, 0) /
                                    100}
                    </h4>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingLeft: '2%',
                    }}
                >
                    <h4 style={{ margin: '0' }}>
                        Total Budgeted:{' '}
                        {budget &&
                            budget.categories
                                .map((e) =>
                                    e.amount
                                        ? e.amount * (e.occurrences ?? 1)
                                        : 0
                                )
                                .reduce((a, b) => a + b, 0)}
                    </h4>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingLeft: '2%',
                    }}
                >
                    <h4 style={{ margin: '0' }}>
                        Total Spent:{' '}
                        {expenses &&
                            expenses
                                .map((e) => e.amount)
                                .reduce((a, b) => a + b, 0) / 100}
                    </h4>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        paddingLeft: '2%',
                    }}
                >
                    <h4 style={{ marginTop: '0' }}>
                        Over / Under:{' '}
                        {budget &&
                            expenses &&
                            budget.categories
                                .map((e) =>
                                    e.amount
                                        ? e.amount * (e.occurrences ?? 1)
                                        : 0
                                )
                                .reduce((a, b) => a + b, 0) -
                                expenses
                                    .map((e) => e.amount)
                                    .reduce((a, b) => a + b, 0) /
                                    100}
                    </h4>
                </div>

                <main>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            paddingLeft: '2%',
                            paddingRight: '2%',
                            justifyContent: 'space-between',
                            paddingBottom: '1.5%',
                        }}
                    >
                        <u style={{ width: '31%' }}>Title</u>
                        <u style={{ width: '27%' }}>Amount</u>
                        <u style={{ width: '27%' }}>Spent</u>
                        <u style={{ width: '27%' }}>Remaining</u>
                    </div>
                    {budget &&
                        expenses &&
                        budget.categories?.map((cat) => (
                            <>
                                <div
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        paddingLeft: '2%',
                                        paddingRight: '2%',
                                        justifyContent: 'space-between',
                                        paddingBottom: '1%',
                                    }}
                                >
                                    <div style={{ width: '32%' }}>
                                        {cat.title}
                                    </div>
                                    <div style={{ width: '27%' }}>
                                        {cat.amount * (cat.occurrences ?? 1)}
                                    </div>
                                    <div style={{ width: '27%' }}>
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
                                    <div style={{ width: '27%' }}>
                                        {cat.amount * (cat.occurrences ?? 1) -
                                            (expenses &&
                                                expenses
                                                    .map((e) =>
                                                        e.category === cat.title
                                                            ? e.amount
                                                            : 0
                                                    )
                                                    .reduce(
                                                        (a, b) => a + b,
                                                        0
                                                    ) / 100) ?? 0}
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
                                                    paddingLeft: '5%',
                                                    paddingRight: '2%',
                                                    justifyContent:
                                                        'space-between',
                                                }}
                                            >
                                                <u
                                                    style={{
                                                        width: '30%',
                                                    }}
                                                >
                                                    Title
                                                </u>
                                                <u
                                                    style={{
                                                        width: '25%',
                                                    }}
                                                >
                                                    Amount
                                                </u>
                                                <u
                                                    style={{
                                                        width: '30%',
                                                    }}
                                                >
                                                    Added On
                                                </u>
                                                <div
                                                    style={{
                                                        width: '15%',
                                                    }}
                                                >
                                                    &nbsp;
                                                </div>
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
                                                            paddingLeft: '5%',
                                                            paddingRight: '2%',
                                                            paddingBottom: '3%',
                                                            justifyContent:
                                                                'space-between',
                                                        }}
                                                    >
                                                        <div
                                                            style={{
                                                                width: '30%',
                                                            }}
                                                        >
                                                            {e.title}
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: '25%',
                                                            }}
                                                        >
                                                            {e.amount / 100}
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: '25%',
                                                            }}
                                                        >
                                                            {new Date(
                                                                e.addedOn
                                                            ).toLocaleDateString()}
                                                        </div>
                                                        <div
                                                            style={{
                                                                width: '20%',
                                                            }}
                                                        >
                                                            <input
                                                                type="button"
                                                                onClick={deleteExpense(
                                                                    e._id
                                                                )}
                                                                value="Delete"
                                                            />
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
