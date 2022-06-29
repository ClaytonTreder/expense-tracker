import { useState } from 'react'
import { useEffect } from 'react'
import months from 'shared/constants/months'
import strings from 'shared/functions/strings'

export default function Expense() {
    const [amount, setAmount] = useState([0, 0, 0])
    const [month, setMonth] = useState()
    const [categories, setCategories] = useState()
    const [category, setCategory] = useState()
    const [title, setTitle] = useState()

    const handleMonthChange = (e) => {
        setMonth(e.target.value)
        setCategory('')
    }
    const handleCategoryChange = (e) => setCategory(e.target.value)
    const handleTitleChange = (e) => setTitle(e.target.value)

    useEffect(() => {
        setMonth(months.at(new Date().getMonth()))
    }, [setMonth])

    useEffect(() => {
        fetch('/api/budget', { method: 'GET' })
            .then((res) => res.json())
            .then((data) => {
                setCategories(
                    data.find(
                        (d) =>
                            d.month === month &&
                            d.year === new Date().getFullYear()
                    )?.categories
                )
            })
    }, [month, setCategories])

    const onClick = (val) => () => {
        if (val !== undefined) {
            const newAmount = [...amount]
            if (amount[0] === 0) {
                newAmount.splice(0, 1)
            }
            newAmount.push(val)

            setAmount(newAmount)
        } else {
            const lessAmount = amount.filter((_, i) => i !== amount.length - 1)
            if (lessAmount.length === 0) lessAmount = [0, 0, 0]
            setAmount(lessAmount)
        }
    }

    const record = () => {
        fetch('/api/expense', {
            method: 'POST',
            body: JSON.stringify({
                title,
                amount: amount.join().replace(/,/g, ''),
                category,
                month,
                year: new Date().getFullYear(),
            }),
        })
        setAmount([0, 0, 0])
        setTitle('')
    }

    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingLeft: '25%',
                    paddingRight: '25%',
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
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingLeft: '25%',
                    paddingRight: '25%',
                }}
            >
                {categories && (
                    <select value={category} onChange={handleCategoryChange}>
                        <option value={''}>Select a category</option>
                        {categories.map((m, i) => (
                            <option value={m.title} key={i}>
                                {strings.capitalizeFirstLetter(m.title)}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            {month && category && (
                <>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingLeft: '25%',
                            paddingRight: '25%',
                        }}
                    >
                        <h3>
                            $
                            {amount.map((a, i) => (
                                <>
                                    {i === amount.length - 2 && '.'}
                                    {a}
                                </>
                            ))}
                        </h3>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingLeft: '25%',
                            paddingRight: '25%',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <p onClick={onClick(1)}>1</p>
                            <p onClick={onClick(4)}>4</p>
                            <p onClick={onClick(7)}>7</p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <p onClick={onClick(2)}>2</p>
                            <p onClick={onClick(5)}>5</p>
                            <p onClick={onClick(8)}>8</p>
                            <p onClick={onClick(0)}>0</p>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <p onClick={onClick(3)}>3</p>
                            <p onClick={onClick(6)}>6</p>
                            <p onClick={onClick(9)}>9</p>
                            <p onClick={onClick()}>⌫</p>
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingLeft: '25%',
                            paddingRight: '25%',
                        }}
                    >
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </div>
                </>
            )}
            {category && (
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        paddingLeft: '25%',
                        paddingRight: '25%',
                    }}
                >
                    <input type="submit" value="Record" onClick={record} />
                </div>
            )}
        </div>
    )
}
