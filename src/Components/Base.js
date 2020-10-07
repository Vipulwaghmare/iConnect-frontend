import React from 'react'
import { Link } from 'react-router-dom'

const Base = ({children}) => {
    return(
        <div>
            <header className="alert alert-info">
                <Link to="/">
                iConnect Test
                </Link>
            </header>
                <main>
                {children}
                </main>
            <footer  className="alert alert-dark">
                By Vipul waghmare
            </footer>
        </div>
    )
}

export default Base