import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'
import Filters from '../../components/Filters'
import { barOptions, pieOptions } from './chart-options'
import  { buildBarSeries, getGenderChartData, getPlatformChartData } from './helpers'
import './styles.css'

type pieChartData = {
    labels: string[],
    series: number[]
}

type barChartData = {
    x: string
    y: number
}

const initialPieData = {
    labels: [],
    series: []
}

const BASE_URL = "https://games-survey.herokuapp.com"

const Charts = () => {

    const [barChartData, setBarChartData] = useState<barChartData[]>([])
    const [platformData, setPlatformData] = useState<pieChartData>(initialPieData)
    const [GenderData, setGenderData] = useState<pieChartData>(initialPieData)

    useEffect(() => {
       async function getData() {
            const recordsResponse = await axios.get(`${BASE_URL}/records`)
            const gamesResponse = await axios.get(`${BASE_URL}/games`)

            const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content)
            setBarChartData(barData)


            const platformChartData = getPlatformChartData(recordsResponse.data.content)
            setPlatformData(platformChartData)

            const genderData = getGenderChartData(recordsResponse.data.content)
            setGenderData(genderData)
        }

        getData()
    }, [])

    return (
       <div className="page-container">
            <Filters link="/records" linkText="Table"/>

            <div className="chart-container">
            <div className="top-related">
                    <h1 className="top-related-title">
                        Jogos mais votados
                    </h1>

                    <div className="games-container">
                        <Chart 
                            options={ barOptions }
                            type="bar"
                            width="700"
                            height="650"
                            series={[{ data: barChartData}]}
                         />
                    </div>
                </div>

                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">Platforms</h2>
                            <Chart 
                                options={{ ...pieOptions, labels: platformData?.labels }}
                                type="donut"
                                series={platformData?.series}
                                width="350"
                                />
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">Genders</h2>
                        <Chart 
                                options={{ ...pieOptions, labels: GenderData?.labels }}
                                type="donut"
                                series={GenderData?.series}
                                width="350"
                                />
                    </div>
                </div>
            </div>
       </div> 
    )
}

export default Charts