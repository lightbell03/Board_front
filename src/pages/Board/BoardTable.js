import React from 'react'
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import LinkTd from '../../components/LinkTd'

const BoardTable = ({ boardList, pageInfo, headersName, columnWidth }) => {

    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    const type = location.pathname.split("/")[2];

    return (
        <div>
            <div style={{ width: '100%', borderTop: "1px solid black" }}>
                <table style={{ width: '100%', margin: 'auto', borderSpacing: '0', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            {headersName.map((item, index) => {
                                return (
                                    <th style={{ padding: '10px 5px', borderBottom: '1px solid black', textAlign: 'center', width: columnWidth[index] }} key={index}>{item}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {boardList && boardList.map((data, index) => {
                            const toUri = `/board/${type}/${data.id}`;
                            const s = { textDecoration: 'none', color: 'black', padding: '10px 0px', display: 'block', width: '100%', height: '10px', borderBottom: '1px solid lightgray' }
                            const s2 = { textDecoration: 'none', color: 'black', padding: '10px 0px', display: 'block', width: '100%', height: '10px', textAlign: 'left', borderBottom: '1px solid lightgray' }
                            return (
                                <tr style={{ cursor: 'pointer' }} key={data.id}>
                                    <LinkTd to={toUri} style={s}>{pageInfo.totalElements - (pageInfo.number * 15 + index)}</LinkTd>
                                    <LinkTd to={toUri} style={s2}>{data.title}</LinkTd>
                                    {type === "musics" &&
                                        <LinkTd to={toUri} style={s}>{data.genre}</LinkTd>
                                    }
                                    <LinkTd to={toUri} style={s}>{data.writer}</LinkTd>
                                    <LinkTd to={toUri} style={s}>{data.commentCount}</LinkTd>
                                    <LinkTd to={toUri} style={s}>{data.view}</LinkTd>
                                    <LinkTd to={toUri} style={s}>{data.like}</LinkTd>
                                    <LinkTd to={toUri} style={s}>{data.date}</LinkTd>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div>
                {
                    Array.from(Array(pageInfo.totalPages).keys()).map((data, index) => {
                        return (
                            <Link to={`/board/frees?page=${index + 1}${searchParams.get("search_keyword") ? "&search_keyword=" + searchParams.get("search_keyword") : ""}`} style={{ padding: '0 5px' }} key={index + 1}>
                                {index + 1}
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default BoardTable