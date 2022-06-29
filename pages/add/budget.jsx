import months from 'shared/constants/months'
import strings from 'shared/functions/strings'
import { useState, useEffect } from 'react'
import CategoryComp from 'components/category'
import Income from 'components/income'

export default function Category() {
    const [month, setMonth] = useState()
    const [categories, setCategories] = useState([])
    const [income, setIncome] = useState([])

    const handleMonthChange = (e) => {
        setCategories([])
        setIncome([])
        setMonth(e.target.value)
    }

    useEffect(() => {
        setMonth(
            months.at(
                new Date().getMonth() === 11 ? 0 : new Date().getMonth() + 1
            )
        )
    }, [setMonth])

    useEffect(() => {
        fetch('/api/budget/' + month)
            .then((res) => res.json())
            .then((data) => {
                const budget = data[0]
                if (budget) {
                    setCategories(budget.categories)
                    setIncome(budget.income)
                }
            })
    }, [month])

    const addCategory = (category) => {
        setCategories((prevState) => [...prevState, { ...category }])
    }

    const removeCategory = (title) => {
        const lessCategories = categories.filter((cat) => cat.title !== title)
        setCategories(lessCategories)
    }

    const addIncome = ({ user, amount, occurrences }) => {
        const lessIncome = income.filter((inc) => inc.user !== user)
        setIncome([...lessIncome, { user, amount, occurrences }])
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        const data = JSON.stringify({
            month,
            year: new Date().getFullYear(),
            income,
            categories,
        })
        await fetch('/api/budget', {
            method: 'POST',
            body: data,
        })
    }
    return (
        <form onSubmit={onSubmit}>
            <div>
                Month:
                {month && (
                    <select value={month} onChange={handleMonthChange}>
                        {months.map((m) => (
                            <option value={m} key={months.indexOf(m)}>
                                {strings.capitalizeFirstLetter(m)}
                            </option>
                        ))}
                    </select>
                )}
            </div>
            <br />
            Income:
            <br />
            <br />
            <div>
                Clay:
                <br />
                {income && (
                    <Income
                        amount={income?.find((i) => i.user === 'Clay')?.amount}
                        occurrences={
                            income?.find((i) => i.user === 'Clay')?.occurrences
                        }
                        addIncome={addIncome}
                        user="Clay"
                    />
                )}
            </div>
            <br />
            <div>
                Courtney:
                <br />
                {income && (
                    <Income
                        amount={
                            income?.find((i) => i.user === 'Courtney')?.amount
                        }
                        occurrences={
                            income?.find((i) => i.user === 'Courtney')
                                ?.occurrences
                        }
                        addIncome={addIncome}
                        user="Courtney"
                    />
                )}
            </div>
            <br />
            Categories:
            <br />
            <br />
            {categories?.length > 0
                ? categories.map((cat, i) => (
                      <CategoryComp
                          key={i}
                          removeCategory={removeCategory}
                          category={cat}
                      />
                  ))
                : null}
            <CategoryComp addCategory={addCategory} />
            <br />
            <br />
            <div>
                <input type="submit" value="submit" />
            </div>
        </form>
    )
}
