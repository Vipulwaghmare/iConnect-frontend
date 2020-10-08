import React, {useState, useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import { BACK, CHANGE_PAGE, NEXT } from '../redux/action'

const Pagination = (props) => {

    const PageCount = (props) => {
        if(props.num === props.current){
            return(
                <button 
                    onClick={()=> {
                        dispatch({
                            type: CHANGE_PAGE,
                            payload:{
                                pageNo: props.num
                            }
                        })
                    }}
                    className="btn btn-secondary ml-2 ">
                    {props.num}
                </button>
            )
        } else {
            return(
                <button 
                    onClick={()=> {
                        dispatch({
                            type: CHANGE_PAGE,
                            payload:{
                                pageNo: props.num
                            }
                        })
                    }}
                    className="btn btn-outline-secondary ml-2 ">
                    {props.num}
                </button>
            )
        }
    }

    const dispatch = useDispatch()

    const handleBack = () => {
        dispatch({
            type: BACK
        })
    }

    const handleNext = () => {
        dispatch({
            type: NEXT
        })
    }

    return(
        <div className="text-center mb-2 mt-2">
            <button 
                onClick={handleBack}
                className="btn btn-outline-secondary">
                back
            </button>
            {
                [1,2,3,4,5,6,7,8,9,10].splice(0,props.pageCount).map(num=>
                    <PageCount 
                        key={num}
                        num={num}
                        current={props.pageNo}
                    />
                    )
            }
            <button 
                onClick={handleNext}
                className="btn btn-outline-secondary ml-2">
                next
            </button>
        </div>
    )
}


const mapStateToProps = state => {
    return state
}

export default connect(mapStateToProps)(Pagination)
