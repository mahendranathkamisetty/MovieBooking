import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import moviesData from '../../common/moviesData';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    imageList: {
      flexWrap: "nowrap",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }));
  
  
  export default function UpcomingMovies() {
    const classes = useStyles();
  
    
    return (
      <div className={classes.root}>
        <ImageList rowHeight={250} cols={6}  className={classes.imageList}>
        {moviesData.map((item) => (
            <ImageListItem key={item.img}>
              <img src={item.poster_url} alt={item.title} />
              <ImageListItemBar
                title={item.title}
                />
            </ImageListItem>
          ))}
        </ImageList>
      </div>
    );
  }