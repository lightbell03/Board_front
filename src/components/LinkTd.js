import React from 'react'
import { Link } from 'react-router-dom'

const LinkTd = ({ children, to, style }) => {
    return (
        <td>
            <Link style={style} to={to}>{children}</Link>
        </td>
    )
}

export default LinkTd