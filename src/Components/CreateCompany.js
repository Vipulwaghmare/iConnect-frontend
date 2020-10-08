import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { addCompany } from '../BackendCalls/addCompany'
import states from '../state'
import Base from './Base'

const CreateCompany = () => {
    
    const [values, setValues] = useState({
        name: '',
        description: '',
        contact: '',
        logo: '',
        email: '',
        stateArray: states,
        state: '',
        city: '',
        formData: new FormData(),
        error: '',
        success: ''
    })

    const [cityArray, setCityArray] = useState([])

    const { name, description, contact, logo, email, state, stateArray, formData, error, success } = values

    useEffect(()=> {
        stateArray.map(s=> {
            if(state === s.name){
                setCityArray(s.city)
            }
        })
    })

    const handleChange = e => {
        const {name, value } = e.target
        if(name === "logo"){
            formData.set(name, e.target.files[0]);
            setValues({
                ...values,
                [name]: e.target.files[0]
            })
        } else {
            formData.set(name, value);
            setValues({
                ...values,
                [name]: value
            })
        }
        
    }

    const onSubmit = e => {
        e.preventDefault()
        addCompany(formData).then(data=> {
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
                    success: `${data.name} is Added successfully`,
                    error: ''
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

    return(
        <Base>
        <div className="container">
        <div className="row">
        <div className="h4 text-center text-primary col-9">Add A Company</div>
        <div className="col-1">
            <button className="btn btn-danger">
                <Link to="/" className="text-light">
                    X
                </Link>
            </button>
        </div>
        </div>
        
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
                        required
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
        </Base>
    )
}

export default CreateCompany;