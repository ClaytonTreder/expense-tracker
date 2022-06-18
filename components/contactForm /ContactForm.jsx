import { useState } from 'react'

export default function ContactForm() {
    const [formData, setFormData] = useState()
    const [submitMessage, setSubmitMessage] = useState(false)
    const [errorMessage, setErrorMessage] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    }
    const handleSubmit = (e) => {
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                'form-name': 'contact',
                ...formData,
            }).toString(),
        })
            .then(() => setSubmitMessage(true))
            .catch(() => {
                setSubmitMessage(false)
                setErrorMessage(true)
            })
        clearForm()
        e.preventDefault()
    }
    const clearForm = () => {
        document.getElementById('contact-form').reset()
        setFormData({})
    }
    return (
        <div>
            <div>
                <form
                    id="contact-form"
                    name="contact"
                    data-netlify="true"
                    onSubmit={handleSubmit}
                >
                    <input type="hidden" name="form-name" value="contact" />
                    <p>
                        <label>
                            Full Name
                            <input
                                onChange={handleChange}
                                type="text"
                                name="name"
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            Email *
                            <input
                                required
                                onChange={handleChange}
                                type="email"
                                name="email"
                            />
                        </label>
                    </p>
                    <p>
                        <label>
                            Write a message
                            <textarea
                                onChange={handleChange}
                                name="message"
                            ></textarea>
                        </label>
                    </p>
                    <p>
                        <button type="submit">Submit</button>
                    </p>
                </form>
                {submitMessage && (
                    <div>
                        Thanks for submitting, we{"'"}ll get back to you soon!
                    </div>
                )}
                {errorMessage && (
                    <div>An error occured, please try again later.</div>
                )}
            </div>
        </div>
    )
}
