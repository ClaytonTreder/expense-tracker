import { useState } from 'react'
import { useEffect } from 'react'
import months from 'shared/constants/months'
import strings from 'shared/functions/strings'

export default function Month(props) {
    const [month, setMonth] = useState()
    const [budget, setBudget] = useState()

    const handleChange = (e) => {
        window.location.href = `/budget/${e.target.value}`
    }

    useEffect(() => {
        setMonth(props.month)
    }, [props.month, setMonth])

    useEffect(() => {
        fetch(`/api/budget/${props.month}`)
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                setBudget(data.budget)
            })
    }, [props.month])

    return (
        <div>
            {month && (
                <select value={month} onChange={handleChange}>
                    {months.map((m) => (
                        <option value={m} key={months.indexOf(m)}>
                            {strings.capitalizeFirstLetter(m)}
                        </option>
                    ))}
                </select>
            )}
            {budget && budget.map((b) => <span>{b}</span>)}
        </div>
    )
}

export function getStaticProps({ params }) {
    return { props: { month: params.month } }
}

export function getStaticPaths() {
    return { paths: [], fallback: true }
}
