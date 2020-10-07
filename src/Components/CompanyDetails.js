import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { deleteCompany } from '../BackendCalls/deleteCompany'
import EditCompany from './EditCompany'

const CompanyDetails = (props) => {
    
    const [edit,setEdit] = useState(false)
    const [ del, setDel ] = useState(false) // to delete
    const [reload, setReload] = useState(false)

    const handleDelete = (e) => {
        e.preventDefault()
        deleteCompany(props.id)
            .then(data=> {
                if(data.error){
                    console.log(data.error)
                } else {
                    setReload(true)
                }
            })
    }

    const DeleteCompany = () => {
        return(
            <div>
                <div className="alert alert-danger">
                    Are you sure you want to delete the company?
                    <button 
                        className="btn btn-danger"
                        onClick={handleDelete}
                    >Yes</button>
                    <button 
                        className="btn btn-success"
                        onClick={()=>{setDel(!del)}}
                    >No</button>
                </div>
            </div>
        )
    }

    return(
        <div>
        <div className="row mb-3">
            <div className="col-1">Logo</div>
            <div className="col">{props.name}</div>
            <div className="col">{props.description}</div>
            <div className="col">{props.number}</div>
            <div className="col">{props.email}</div>
            <button 
                onClick={()=>{setDel(!del)}}
                className="btn btn-danger">
                Delete
            </button>
            {
                edit && 
                <button 
                onClick={()=>{setEdit(!edit)}}
                className="btn btn-danger ml-1">
                Close
            </button>
            }
            {
                edit || 
                <button 
                onClick={()=>{setEdit(!edit)}}
                className="btn btn-info ml-1">
                edit
            </button>
            }
            
        </div>
        <div>
        { edit &&
            <EditCompany 
                id={props.id}
                name={props.name}
                description={props.description}
                contact={props.number}
                email={props.email}
            />
        }
        { del &&
            <DeleteCompany 
                id={props.id}
                name={props.name}
                description={props.description}
                contact={props.number}
                email={props.email}
            />
        }
        {
            reload && 
            <div>
                <Redirect to="/" />
            </div>
        }
        </div>
        </div>
        
    )
}

export default CompanyDetails