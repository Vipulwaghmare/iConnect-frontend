import React from 'react'

const Pagination = () => {

    const PageCount = () => {
        return(
            <button className="btn btn-secondary ml-2">
            x
            </button>
        )
    }

    return(
        <div className="text-center mb-2 mt-2">
            <button className="btn btn-secondary">
                back
            </button>
            <PageCount />
            <button className="btn btn-secondary ml-2">
                next
            </button>
        </div>
    )
}

export default Pagination