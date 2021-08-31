import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import moviesData from '../../common/moviesData';
import moment from 'moment';
import { Link } from "react-router-dom";
import FilterCard from "./FilterCard";
import { useState } from "react";
import './Home.css';




const releasedMovieStyles = makeStyles((theme) => ({
    root: {
      // display: 'flex',
      flexWrap: 'wrap',
      // justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      width: 500,
      height: 450,
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));
  
  
  export default function ReleasedMovies() {
        
    const classes = releasedMovieStyles();

    const[ data,setData]=useState(moviesData);
  const[movieName,setMovieName]=useState("");
  const[genreName,setGenreName]= useState([]);
  const[artistName,setArtistName]= useState([]);
  const[releaseDate,setReleaseDate]=useState("");
  const[endDate,setendDate]=useState("");


   function filterByMovieName(moviesData){
    if(!movieName){
      return moviesData;
    }

    return moviesData.filter((item)=>(item.title.toLowerCase()===movieName.toLowerCase()));
  }



  function  filterByGenreName(moviesData){
    if(genreName.length === 0){
      return moviesData;
    }
    return moviesData.filter((item)=>{
     for(let i=0;i<item.genres.length;i++){
           if(genreName.includes(item.genres[i])){
              return true;
           }
     }
     return false;}
    );
    }



  function  filterByArtistName(moviesData){
    if(artistName.length === 0){
      return moviesData;
    }
    return moviesData.filter((item)=>{
      let movieArtists = item.artists.map(
        (artist) => artist.first_name + " " + artist.last_name
      );
     for(let i=0;i<movieArtists.length;i++){
           if(artistName.includes(movieArtists[i])){
              return true;
           }
     }
     return false;}
    );
    }

    function filterByReleaseStartDate(moviesData){
      if(!releaseDate){
       
        return moviesData;
      }
      console.log(releaseDate);
      return moviesData.filter((item)=>(((item.release_date).split("T")[0]) === releaseDate))
      }

  function filterBy(event){

    let filteredMovieByName = filterByMovieName(moviesData);
    let filteredMovieByGenre = filterByGenreName(filteredMovieByName);
    let filteredMovieByArtist = filterByArtistName(filteredMovieByGenre);
    let filteredMovieByDate = filterByReleaseStartDate(filteredMovieByArtist);
    setData(filteredMovieByDate);
  }
  return (
      <div>
      <div style={{display:"flex"}}>
        <div className="left">
      <div className={classes.root}>

        <ImageList rowHeight={350} cols={4} className={releasedMovieStyles.imageList}>
    
        {data.map(
          (item) => (
          
          <ImageListItem key={item.img}  >
              <Link to={`/details/${item.id}`}>
              <img src={item.poster_url} style={{width: "100%"}} alt={item.title} />
              

              <ImageListItemBar
                title={item.title}
                subtitle={<span>Release Date: {moment(item.release_date).format("ddd ll")}</span>}/>
                </Link>
            </ImageListItem>
            ))
            }
        </ImageList>
        
      </div>
      </div>

      <div className="right">
       <FilterCard
       movieName={movieName}
       setMovieName={setMovieName}
       filterBy={filterBy}
       genreName={genreName}
       setGenreName={setGenreName}
       artistName={artistName}
       setArtistName={setArtistName}
       releaseDate={releaseDate}
       setReleaseDate={setReleaseDate}
       endDate={endDate}
       setendDate={setendDate}
       
       />

      </div>


      </div>
      </div>
      
    );
  }
