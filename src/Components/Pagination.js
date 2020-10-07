import React, {useState, useEffect} from 'react'

const Pagination = (props) => {

    const PageCount = (props) => {
        console.log("PAGES", props)
        return(
            <button className="btn btn-secondary ml-2">
            {props.num}
            </button>
        )
    }

    return(
        <div className="text-center mb-2 mt-2">
            <button className="btn btn-secondary">
                back
            </button>
            {
                [1,2,3,4,5,6,7,8,9,10].splice(0,props.pageCount).map(num=>
                    <PageCount 
                        key={num}
                        num={num}
                    />
                    )
            }
            <button className="btn btn-secondary ml-2">
                next
            </button>
        </div>
    )
}

export default Pagination