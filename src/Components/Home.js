import React, { useEffect, useState } from 'react'
import { getallcompanies } from '../BackendCalls/getallcompanies'
import CompanyDetails from './CompanyDetails'
import Pagination from './Pagination'
import Base from './Base'
import { Link } from 'react-router-dom'

const Home = () => {
    const [companies, setCompanies] = useState([])
    const [values, setValues] = useState({
        TotalCount: 1
    })

    const loadAllCompanies = () => {
        getallcompanies().then(data=>{
            if(data.error){
                console.log(data.error)
            } else {
                setCompanies(data)
            }
        })
    }

    useEffect(()=>{
        loadAllCompanies()
    },[])

    return(
        <Base>
        <div className="container-fluid container-lg">
        {console.log(companies)}
        {/* Search Bar */}
        <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Search" />
                 <div className="input-group-append">
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">Search</button>
            {values.TotalCount}
            </div>
        </div>
        <div className="row ">
            <div className="col-8"></div>
            <div className="col-4">
            <button className="btn btn-light">
            <Link to="/add-company">
                Add New Company
            </Link>
        </button>
            </div>
        </div>
        
        {/* Main Rows */}
        <div className="row text-center">
            <div className="col-1">Logo</div>
            <div className="col-1">Name</div>
            <div className="col-4">Description</div>
            <div className="col-1">Number</div>
            <div className="col-2">Email</div>
        </div>
        {
            companies.map(corp=> {
                return(
                    <CompanyDetails
                        key={corp._id}
                        id={corp._id}
                        name={corp.name}
                        description={corp.description}
                        number={corp.contact}
                        email={corp.email}
                    />
                )
            })
        }
        <Pagination />
        </div>
        </Base>
    )
}

export default Home