import React from 'react';
import './Home.css';
import Header from '../../common/header/Header';
import UpcomingMovies from "./UpcomingMovies";
import FilterCard from "./FilterCard";
import ReleasedMovies from "./ReleasedMovies";


export default function Home () {
    
        return(
            <div>
                <Header/>
                <div className="home">Upcoming Movies</div>
                <UpcomingMovies/>
                <ReleasedMovies/>
            </div>
        )
    }

