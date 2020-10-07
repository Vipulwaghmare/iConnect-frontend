import React, { useEffect, useState } from 'react'
import { getallcompanies, getallasccompanies, getalldsccompanies } from '../BackendCalls/getallcompanies'
import CompanyDetails from './CompanyDetails'
import Pagination from './Pagination'
import Base from './Base'
import { Link } from 'react-router-dom'
import { getCompanyByName } from '../BackendCalls/getCompanyByName'

const Home = () => {
    const [companies, setCompanies] = useState([])
    const [showCompanies, setShowCompanies] = useState([])
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
    const [pageNo, setPageNo] = useState(1)
    const [pageCount, setPageCount] = useState(1)
    const [first, setFirst] = useState((pageNo-1)*5)
    const [second, setSecond] = useState(first + 5)

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
                    setCompanies(data)
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

    const handleSortAsc = () => {
        getallasccompanies().then(data=>{
            if(data.error){
                console.log(data.error)
            } else {
                setCompanies(data)
                setShowCompanies(data.splice(first,second))
                setPageCount(data.length)
            }
        })
    }

    const handleSortDsc = () => {
        getalldsccompanies().then(data=>{
            if(data.error){
                console.log(data.error)
            } else {
                setCompanies(data)
                setShowCompanies(data.splice(first,second))
                setPageCount(data.length)
            }
        })
    }

    const loadAllCompanies = () => {
        getallcompanies().then(data=>{
            if(data.error){
                console.log(data.error)
            } else {
                setCompanies(data)
                setShowCompanies(data.splice(first,second))
                setPageCount(data.length)
            }
        })
    }

    useEffect(()=>{
        loadAllCompanies()
    },[])

    return(
        <Base>
        {console.log("Page No",pageNo)}
        {console.log("Page Count No",pageCount)}
        {console.log("First",first)}
        {console.log("Second",second)}
        {console.log("Show Companies",showCompanies)}
        {console.log("Companies",companies)}
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
                <button 
                    onClick={()=>{
                        loadAllCompanies()
                        setSearchResult('')
                    }}
                    className="btn btn-danger">
                Cancel search
                </button>
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
                <button 
                    className="btn btn-primary btn-block"
                    onClick={handleSortAsc}
                    >
                    Asc
                </button>
            </div>
            <div className="col-2">
                <button 
                    className="btn btn-primary btn-block"
                    onClick={handleSortDsc}
                    >
                    Dsc
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
            showCompanies.map(corp=> {
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
        <Pagination 
            pageNo={pageNo}
            pageCount = {pageCount}
        />
        </div>
        </Base>
    )
}

export default (Home)