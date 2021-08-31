import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {  TextField } from '@material-ui/core';
import genres from '../../common/genre';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import artists from '../../common/artists';


const useStyles = makeStyles((theme)=>({
  root: {
    minWidth: 240,
    maxWidth: 240,
    margin: theme.spacing.unit,
    width: '25ch',
    
  },
  title: {
    fontSize: 14,
    color: theme.palette.primary.light,
    margin: theme.spacing.unit
  },
  genreStyles:{
    minWidth: 195,
    maxWidth: 300,
    margin: theme.spacing.unit,
  },
  container: {
    margin: theme.spacing.unit,
  },
  buttonStyle:{
    marginLeft: theme.spacing(2),
    minWidth: 195,
    maxWidth: 300,
  },
}
));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function FilterCard(props) {
  const classes = useStyles();


 

  return (
    <>
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title}  gutterBottom>
          FIND MOVIES BY:
        </Typography>
     
        <form className={classes.root} noValidate autoComplete="off">
          <TextField id="standard-basic" 
          value={props.movieName}
          onChange={(event)=>props.setMovieName(event.target.value)}
          label="Movie Name" />
        </form>
        <FormControl className={classes.genreStyles} >
        <InputLabel id="demo-mutiple-checkbox-label" >Genres</InputLabel>
        <Select labelId="demo-mutiple-checkbox-label"id="demo-mutiple-checkbox" multiple value={props.genreName}
         onChange={(event)=>props.setGenreName(event.target.value)}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}>
          {genres.map((name) => (
            <MenuItem key={name.name} value={name.name}>
              <Checkbox checked={props.genreName.indexOf(name.name) > -1} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <FormControl className={classes.genreStyles} >
        <InputLabel id="demo-mutiple-checkbox-label" >Artists</InputLabel>
        <Select
          labelId="demo-mutiple-checkbox-label"
          id="demo-mutiple-checkbox"
          multiple
          value={props.artistName}
          onChange={(event)=>props.setArtistName(event.target.value)}
          input={<Input />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {artists.map((name) => (
            <MenuItem key={name.first_name + name.last_name} value={name.first_name + " " + name.last_name}>
              <Checkbox checked={props.artistName.indexOf(name.first_name + " " + name.last_name) > -1} />
              <ListItemText primary={name.first_name + " " + name.last_name} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <form  noValidate>
        <TextField id="date" value={props.releaseDate}  onChange={(event)=> props.setReleaseDate(event.target.value)} label="Release Date Start" type="date" className={classes.genreStyles}
         InputLabelProps={{
          shrink: true,
        }}
      />
      </form>
      <form  noValidate>
        <TextField id="date" value={props.endDate} onChange={(event)=>props.setendDate(event.target.value)} label="Release Date End" type="date" className={classes.genreStyles}
         InputLabelProps={{
          shrink: true,
        }}
      />
      </form>
      </CardContent>
      <CardActions>
      <Button className={classes.buttonStyle}
       variant="contained"
        color="primary"
        onClick={props.filterBy}
        >APPLY</Button>      
      </CardActions>
    </Card>


   
    </>
  );
}