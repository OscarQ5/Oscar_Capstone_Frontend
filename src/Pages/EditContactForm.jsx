import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { useLoginDataProvider } from "../Components/LoginProvider"

const EditContactForm = () => {
    const { API, user, token } = useLoginDataProvider()

    const navigate = useNavigate()
    const { contact_id } = useParams()

    const [contact, setContact] = useState({
        firstname: "",
        lastname: "",
        phone_number: "",
        user_id: user.user_id
    })

    const handleTextChange = (event) => {
        setContact({ ...contact, [event.target.id]: event.target.value });
    };

    useEffect(() => {
        fetch(`${API}/users/contacts/${contact_id}`, {
            headers: {
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log("res:", res)
                setContact((prev) => ({
                    firstname: res.firstname,
                    lastname: res.lastname,
                    phone_number: res.phone_number,
                    user_id: res.user_id
                }))
            })
            .catch(err => console.log(err))
    }, [contact_id, token, user.user_id])

    const handleSubmit = (event) => {
        event.preventDefault()

        fetch(`${API}/users/contacts/${contact_id}`, {
            method: "PUT",
            body: JSON.stringify(contact),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                navigate('/users/contacts')
            })
            .catch(err => console.log(err))
    }

    const handleDelete = () => {

        fetch(`${API}/users/contacts/${contact_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            }
        })
            .then(res => res.json())
            .then(res => {
                console.log("Completed Delete")
                navigate('/users/contacts')

            })
            .catch(err => console.log(err))
    }

    return (
        <div className="emergencyContactForm">

            <form onSubmit={handleSubmit} className="newForm">

                <label htmlFor="firstname">First Name:</label>
                <input
                    id="firstname"
                    value={contact.firstname}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Jane"
                    required
                />

                <label htmlFor="lastname">Last Name:</label>
                <input
                    id="lastname"
                    value={contact.lastname}
                    type="text"
                    onChange={handleTextChange}
                    placeholder="ex. Smith"
                    required
                />

                <label htmlFor="phone_number">Phone Number:</label>
                <input
                    id="phone_number"
                    value={contact.phone_number}
                    type="tel"
                    onChange={handleTextChange}
                    placeholder="ex. 919-222-2222"
                    required
                />

                <div className="submitButton-EC">

                    <button type="submit">Submit</button>

                    <img onClick={handleDelete} className="deleteButton" src="/Anonymous_Architetto_--_Cestino_pieno.svg" alt="Delete Emergency Contact" />
                </div>
            </form>

        </div>
    );
};

export default EditContactForm

