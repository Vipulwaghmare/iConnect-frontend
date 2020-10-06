import React, {useState, useEffect} from 'react'
import states from '../state'

const CreateCompany = () => {
    
    const [values, setValues] = useState({
        name: '',
        description: '',
        contact: '',
        email: '',
        stateArray: states,
        state: '',
        city: ''
    })

    const [cityArray, setCityArray] = useState([])

    const { name, description, contact, email, state, stateArray } = values

    useEffect(()=> {
        stateArray.map(s=> {
            if(state === s.name){
                setCityArray(s.city)
            }
        })
    })

    const handleChange = e => {
        const {name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
    }

    return(
        <div>
            <form>
                <div>
                    <label>Company Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div>
                    <label>Company Description</label>
                    <input
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div>
                    <label>Contact Number</label>
                    <input
                        type="number"
                        name="contact"
                        value={contact}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div>
                    <label>Contact Email</label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div>
                    <label> Company Logo </label>
                    <input
                        type="file"
                    ></input>
                </div>
                <div>
                    <label>State</label>
                    <select
                        name="state"
                        onChange={handleChange}
                    >
                        <option>Select</option>
                        {
                            stateArray.map(state => {
                                return (
                                    <option
                                        onChange={handleChange}
                                        name={state.name}
                                        value={state.name}
                                    >
                                        {state.name}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <label>City</label>
                    <select
                        name="city"
                        onChange={handleChange}
                    >
                        <option>Select</option>
                        {
                            cityArray.map(ct => {
                                return (
                                    <option
                                        onChange={handleChange}
                                        name={ct}
                                        value={ct}
                                    >
                                        {ct}
                                    </option>
                                )
                            })
                        }
                    </select>
                </div>
                <div>
                    <input
                        type="submit"
                        onClick={onSubmit}
                    ></input>
                </div>
            </form>
        </div>
    )
}

export default CreateCompany;