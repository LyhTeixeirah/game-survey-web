import React from 'react'
import './styles.css'

import {ReactComponent as ArrowIcon} from '../../assets/arrow.svg'
import {ReactComponent as GamerImage} from '../../assets/GamerImage.svg'

import { Link } from 'react-router-dom'

const Home = () => (
    <div className="home-container">
        <div className="home-text">
            <h1 className="home-text-title">
            Quais <span>Games</span> a galera gosta mais?
            </h1>
            <h3 className="home-text-subtitle">
                Clique no botão abaixo e saiba quais são os jogos que os Gamers estão escolhendo!
            </h3>
            <Link to="/Records">
            <div className="home-actions">
                <button className="home-btn">
                    <span> Quero saber quais são</span>
                </button>
                <div className="home-btn-icon">
                    <ArrowIcon />
                </div>
            </div>
            </Link>
        </div>
        <GamerImage className="home-image" />

    </div>
)

export default Home;