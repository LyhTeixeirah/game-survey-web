import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './styles.css'

import './Pagenation'

import { formatDate } from './helpers'
import { RecordsResponse } from './types'
import Pagination from './Pagenation'
import Filters from '../../components/Filters'

const BASE_URL = "https://games-survey.herokuapp.com"


const Records = () => {
    const [ recordsResponse, setRecordsResponse ] = useState<RecordsResponse>()
    const [ activePage, setActivePage ] = useState(0)

    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
        .then(response => setRecordsResponse(response.data))
    }, [activePage])

    const handlePageChange = (index:number) => {
        setActivePage(index)
    }

return(
    <div className="page-container">
        <Filters link="/charts" linkText="Statistics"/>
        <table className="records-table" cellPadding="0" cellSpacing="0">
            <thead>
                <tr>
                    <th>INSTANT</th>
                    <th>NAME</th>
                    <th>AGE</th>
                    <th>PLATFORM</th>
                    <th>GENRE</th>
                    <th>TITLE</th>
                </tr>
            </thead>
            <tbody>
                {recordsResponse?.content.map(record => (
                    <tr key={record.id}>
                    <td>{formatDate(record.moment)} </td>
                    <td> {record.name} </td>
                    <td> {record.age} </td>
                    <td className="text-secondary">{record.gamePlatform}</td>
                    <td> {record.genreName} </td>
                    <td> {record.gameTitle} </td>
                </tr>
                ))}
            </tbody>
        </table>

                    <Pagination 
                        activePage={activePage} 
                        goToPage={handlePageChange} 
                        totalPages={recordsResponse?.totalPages}
                        />

    </div>
    )
}

export default Records