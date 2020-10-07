import React from 'react'

const Base = ({children}) => {
    return(
        <div>
            <header className="alert alert-info">
                iConnect Test
            </header>
                {children}
            <footer  className="alert alert-dark">
                from Vipul waghmate
            </footer>
        </div>
    )
}

export default Base