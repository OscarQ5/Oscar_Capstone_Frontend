import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import PhoneInput from 'react-phone-number-input';
import { useLoginDataProvider } from "../Components/LoginProvider"
import "../Styles/EditContactForm.css"

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
        const { id, value } = event.target;

        if (id === "phone_number") {
            setContact({ ...contact, phone_number: value });
        } else {
            setContact({ ...contact, [id]: value });
        }
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

                <label className='phoneLabel' htmlFor="phone_number">Phone Number:</label>
                <PhoneInput
                    id="phone_number"
                    value={contact.phone_number}
                    onChange={(value) => setContact({ ...contact, phone_number: value })}
                    placeholder="ex. 111-222-3333"
                    defaultCountry="US"
                    required
                />

                <div className="submitButton-EC">

                    <button type="submit">Submit</button>

                    <img onClick={handleDelete} className="deleteButtonEC" src="/Anonymous_Architetto_--_Cestino_pieno.svg" alt="Delete Emergency Contact" />
                </div>
            </form>

        </div>
    );
};

export default EditContactForm