import { Link, useParams } from "react-router-dom";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import {  ImageList, ImageListItem, Typography } from "@material-ui/core";
import './Details.css';
import { filterByMovieid } from "../../common/moviesData";
import '../../common/header/Header.css';
import moment from "moment";
import YouTube from 'react-youtube';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import { classes } from "istanbul-lib-coverage";
import Rating from '@material-ui/lab/Rating';
import Header from "../../common/header/Header";


export default function Details(props) {
  
   const id = useParams().id;
   const movie = filterByMovieid(id);

    let logo = `https://cdn.upgrad.com/uploads/production/286e1f11-1897-4d0c-ab0f-6b2bfc1ce642/logo.svg`;

   const opts = {
    height: '390',
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

   function onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();}


  
    return (
    <div>
          <div className="header" style={{display: "contents"}}>
           <Header showBookShowButton="true" />
           <div style={{
                    position: "absolute",
                    left: "81%",
                    top: "8.4px",
                }}>
                
                </div>
            </div>
            <Link className="btn" to="/">
              <div style={{display: "flex"}}>
                <ChevronLeftIcon/>
                <Typography>Back to Home</Typography>
                </div>
                </Link>
                <div style={{display: "inline-flex",justifyContent: "space-between"}}>
            <div className="detials-left">
              <img style={{width: "100%"}} src={movie.poster_url} alt={movie.id}/>
          </div>
          <div className="details-middle">
            <Typography variant="headline" gutterBottom><h2>{movie.title}</h2>
            <div><strong>Genres: </strong>{movie.genres.join(", ")}</div>
            <div><strong>Duration: </strong>{movie.duration}</div>
            <div><strong>Release Date: </strong>{moment(movie.release_date).format("ddd ll")}</div>
            <div><strong>Rating: </strong>{movie.critics_rating}</div>
            <div style={{marginTop : "16px"}}><strong>Plot: </strong><a href={movie.wiki_url}>(Wiki Link)</a>
            <span style={{marginLeft: 2}}>{movie.storyline}</span>
            </div>
            <div style={{marginTop: "16px"}}><strong>Trailer: </strong><YouTube videoId={movie.trailer_url.split("v=")[1]} opts={opts} onReady={onReady} /></div>
            </Typography>
          </div>
            <div className="details-right">
              <Typography>
          <div><strong>Rate this movie:</strong></div>
          <Rating name="rating"defaultValue={0} emptyIcon={
                <StarBorderIcon fontSize="inherit"  />} />
            <div style={{marginTop:"16px",marginBottom: "16px"}}><strong>Artists:</strong></div>
         </Typography>
         <div className={classes.root}>
      <ImageList rowHeight={180} className={classes.imageList}>
        <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
        </ImageListItem>
              {movie.artists.map((item) => (
            <ImageListItem key={item.img}>
                  <img src={item.profile_url} alt={item.title} />
                      <ImageListItemBar
                         title={item.title}
                             subtitle={<span>{item.first_name + " " + item.last_name}</span>}/>
            </ImageListItem>
        ))}
      </ImageList>
         </div>
         </div>
         </div>
    </div>    
    )
    
}
