import React, { useEffect, useState } from 'react'
import { getallcompanies } from '../BackendCalls/getallcompanies'
import CompanyDetails from './CompanyDetails'
import Pagination from './Pagination'
import Base from './Base'
import { Link } from 'react-router-dom'
import { getCompanyByName } from '../BackendCalls/getCompanyByName'

const Home = () => {
    const [companies, setCompanies] = useState([])
    const [values, setValues] = useState({
        TotalCount: 1
    })
    const [search, setSearch] = useState('')
    const [searchResult, setSearchResult] = useState({
        result: false,
        name: '',
        description: '',
        contact: '',
        email : '',
        state: '',
        city: '',
        error: ''
    })

    const handleChange = e => {
        setSearch(e.target.value)
    }

    const handleSearch = e => {
        e.preventDefault()
        if(search){
            getCompanyByName(search)
            .then(data=> {
                if(data.error){
                    setSearchResult({
                        ...searchResult,
                        result: true,
                        error: data.error
                    })
                } else {
                    setSearchResult({
                        ...searchResult,
                        result: true,
                        name: data[0].name,
                        description: data[0].description,
                        contact: data[0].contact,
                        email : data[0].email,
                        state: data[0].state,
                        city: data[0].city
                    })
                }
            })
            .catch(error => {
                console.log(error)
                setSearchResult({
                    result: true,
                    error: error
                })
            })
        }
    }

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
        {/* Search Bar */}
        <div className="input-group mb-3">
            <input 
                type="text" 
                name="search"
                value={search}
                onChange={handleChange}
                className="form-control" placeholder="Search" />
            <div className="input-group-append">
            <button     
                className="btn btn-outline-secondary" 
                onClick={handleSearch}
                >
                Search</button>
            </div>
        </div>
        <div>
        {
            searchResult.result && !searchResult.error &&
            <div 
                className="alert alert-success">
                name: {searchResult.name} <br />
                description: {searchResult.description} <br />
                contact: {searchResult.contact} <br />
                email : {searchResult.email} <br />
                state: {searchResult.state} <br />
                city: {searchResult.city} <br />
            </div>
        }
        {
            searchResult.result && searchResult.error &&
            <div 
                className="alert alert-danger">
                 {searchResult.error} <br />
            </div>
        }
        </div>
        <div className="row mb-3">
            <div className="col-2">
                <button className="btn btn-primary btn-block">
                    Asc
                </button>
            </div>
            <div className="col-2">
                <button className="btn btn-primary btn-block">
                    Des
                </button>
            </div>
            <div className="col-4"></div>
            <div className="col-4">
            <button className="btn btn-primary btn-block">
            <Link to="/add-company" className="text-light">
                Add New Company
            </Link>
        </button>
            </div>
        </div>
        
        {/* Main Rows */}
        <div className="list">
        <div className="row text-center">
            <div className="col-1">Logo</div>
            <div className="col-1">Name</div>
            <div className="col-4">Description</div>
            <div className="col-1">Number</div>
            <div className="col-2">Email</div>
        </div>
        <div className="mt-3">
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
        </div>
        </div>
        <Pagination />
        </div>
        </Base>
    )
}

export default Home