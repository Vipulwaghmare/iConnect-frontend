import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import { editCompany } from '../BackendCalls/editCompany'
import states from '../state'

const EditCompany = (props) => {
    
    const [values, setValues] = useState({
        id: props.id,
        name: props.name,
        description: props.description,
        contact: props.contact,
        logo: '',
        email: props.email,
        stateArray: states,
        state: '',
        city: '',
        formData: new FormData(),
        error: '',
        success: '',
        redirect: false
    })

    const [cityArray, setCityArray] = useState([])

    const {id, name, description, contact, logo, email, state, stateArray, formData, error, success, redirect } = values

    useEffect(()=> {
        stateArray.map(s=> {
            if(state === s.name){
                setCityArray(s.city)
            }
        })
        formData.set('_id',props.id)
        formData.set('name', name)
        formData.set('description', description)
        formData.set('contact', contact)
        formData.set('email',email)
        formData.set('state',state)
    })

    const handleChange = e => {
        const {name, value } = e.target
        formData.set(name, value);
        setValues({
            ...values,
            [name]: value
        })
    }

    const onSubmit = e => {
        e.preventDefault()
        editCompany(formData, id).then(data=> {
            if(data.error){
                setValues({ 
                    ...values,
                    error: data.error,
                    success: ''
                })
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    contact: '',
                    email: '',
                    state: '',
                    city: '',
                    success: `${data.name} is Updated successfully`,
                    error: '',
                    redirect: true
                })
            }
        })
    }

    const errorMessage = ()=> {
        return(
            error && 
            <div className="text-danger text-center">
                {error}
            </div>
        )
    }

    const successMessage = ()=> {
        return(
            success && 
            <div className="text-success text-center">
                {success}
            </div>
        )
    }

    const redirecting = () => {
        return(
            redirect && 
            <div>
            <Redirect to="/" />
            </div>
        )
    }

    return(
        <div className="container-fluid mb-3 mt-2">
        {redirecting()}
        <div className="h4 text-center text-primary">Edit Company Details </div>
            <form className="container">
                {errorMessage()}
                {successMessage()}
                <div className="form-group">
                    <label>Company Name</label>
                    <input
                        className="form-control"
                        type="text"
                        name="name"
                        value={name}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Company Description</label>
                    <input
                        className="form-control"
                        type="text"
                        name="description"
                        value={description}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input
                        className="form-control"
                        type="number"
                        name="contact"
                        value={contact}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label>Contact Email</label>
                    <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        required
                    ></input>
                </div>
                <div className="form-group">
                    <label> Company Logo </label>
                    <input
                        className="form-control"
                        type="file"
                        name="logo"
                        accept="image"
                        onChange={handleChange}
                    ></input>
                </div>
                <div className="row">
                <div className="form-group col-6">
                    <label>State</label>
                    <select
                        className="form-control"
                        name="state"
                        onChange={handleChange}
                    >
                        <option>Select</option>
                        {
                            stateArray.map(state => {
                                return (
                                    <option
                                        key={state.name}
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
                <div className="form-group col-6">
                    <label>City</label>
                    <select
                        className="form-control"
                        name="city"
                        onChange={handleChange}
                    >
                        <option>Select</option>
                        {
                            cityArray.map(ct => {
                                return (
                                    <option
                                        key={ct}
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
                </div>
                <div>
                    <input
                        className="btn btn-primary btn-block"
                        type="submit"
                        onClick={onSubmit}
                    ></input>
                </div>
            </form>
        </div>
    )
}

export default EditCompany;