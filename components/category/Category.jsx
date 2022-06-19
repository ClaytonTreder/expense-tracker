import { useState } from 'react'

export default function Category(props) {
    const [category, setCategory] = useState(props.category)

    const handleChange = (e) => {
        setCategory((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
        if (props.category) props.category[e.target.name] = e.target.value
    }
    const onAdd = () => {
        props.addCategory(category)
        setCategory({ title: '', amount: '', occurrences: '' })
    }

    const onDelete = () => props.removeCategory(category.title)

    return (
        <div style={{ flexDirection: 'row', display: 'flex' }}>
            <div>
                Title:
                <input
                    type="text"
                    name="title"
                    value={category?.title ?? ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                Amount:
                <input
                    type="number"
                    name="amount"
                    value={category?.amount ?? ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                Occurrences:
                <input
                    type="number"
                    name="occurrences"
                    min={1}
                    value={category?.occurrences ?? ''}
                    onChange={handleChange}
                />
            </div>
            <div>
                {props.category ? (
                    <input type="button" value="Delete" onClick={onDelete} />
                ) : (
                    <input type="button" value="Add" onClick={onAdd} />
                )}
            </div>
        </div>
    )
}
