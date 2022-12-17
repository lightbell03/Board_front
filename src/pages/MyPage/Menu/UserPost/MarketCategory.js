import React from 'react'
import { Link } from 'react-router-dom'

const MarketCategory = () => {
    const marketCategory = [
        ["all", {
            "kr": "전체",
        }],
        ["electric", {
            "kr": "전자기기"
        }],
        ["manCloth", {
            "kr": "남성의류",
        }],
        ["womanCloth", {
            "kr": "여성의류",
        }],
        ["stuff", {
            "kr": "잡화",
        }],
        ["furniture", {
            "kr": "가구",
        }],
    ]

    return (
        <ul style={{ marginTop: '5px', marginBottom: '5px', listStyle: 'none' }}>
            {marketCategory.map((data, index) => {
                return(
                    <li key={index} style={{ margin: '5px -30px' }}>
                        <Link to={`userpost/market?category=${data[0]}`} >
                            {data[1]["kr"]}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}

export default MarketCategory