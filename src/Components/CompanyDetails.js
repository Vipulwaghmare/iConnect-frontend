import React, {useState } from 'react'
import { Redirect } from 'react-router-dom'
import { API } from '../backendApi'
import { deleteCompany } from '../BackendCalls/deleteCompany'
import EditCompany from './EditCompany'


const CompanyDetails = (props) => {
    
    const [edit,setEdit] = useState(false)
    const [ del, setDel ] = useState(false) // to delete
    const [reload, setReload] = useState(false)

    const ImageHelper = props => {
        const imageUrl = `${API}/logo/${props.companyId}`
        return(
            <div>
                <img 
                    className="logo"
                    src={imageUrl} 
                    alt="logo"
                    />
            </div>
        )
    }
    

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
        <div className="mb-2 company">
        <div className="row mb-1">
            <div className="col-1">
                <ImageHelper companyId= {props.id} />
            </div>
            <div className="col-1">{props.name}</div>
            <div className="col-4">{props.description}</div>
            <div className="col-1">{props.number}</div>
            <div className="col-3">{props.email}</div>
            <div className="col-1">
            <button 
                onClick={()=>{setDel(!del)}}
                className="btn btn-danger">
                Delete
            </button>
            </div>
            <div className="col-1">
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
        <div className="badge badge-info ml-2">{props.state}</div>
        <div className="badge badge-info ml-2">{props.city}</div>
        </div>
        
    )
}


export default (CompanyDetails)