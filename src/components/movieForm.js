import React, { useState, useEffect } from "react";
import Input from "./common/input";
import {validateSubmit} from './common/validation';
import Joi from "joi";
import { toast } from "react-toastify";
import Select from "./common/select";
import { getGenres } from "../services/genreService";
import { saveMovie, getMovie} from "../services/movieService";

const MovieForm = (props) =>{
    const [errors, setErrors] = useState({})
    const [genres, setGenres] = useState([]);
    const [movieForm,setMovieForm] = useState({
        title: "",
        genreId: "",
        numberInStock: "",
        dailyRentalRate: ""
    });

    useEffect(()=>{
        async function fetchData() {
            const {data:genreList} = await getGenres();
            setGenres(genreList);
            await populateMovie();
        }
        fetchData();
    },[])

    const populateMovie = async() =>{
        try {
          const movieId = props.match.params.id;
          if (movieId === "new") return;
    
          const { data: movie } = await getMovie(movieId);
          setMovieForm(mapToViewModel(movie));
        } catch (ex) {
          if (ex.response && ex.response.status === 404)
            props.history.replace("/not-found");
        }
    }

    const mapToViewModel = (movie) => {
        return {
          _id: movie._id,
          title: movie.title,
          genreId: movie.genre._id,
          numberInStock: movie.numberInStock,
          dailyRentalRate: movie.dailyRentalRate
        };
      }

    const schema = Joi.object({
        _id:Joi.string(),
        title: Joi.string().min(3).max(15).required().label("Title"),    
        genreId: Joi.string().required().label("Genre"),
        numberInStock: Joi.number().required().label("Number in Stock"),
        dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate")
    }) 
    
    const handleSubmit = async(e)=>{
        const errorData = validateSubmit(e, schema, movieForm);
        setErrors(errorData || {});
        if(errorData) return;
        toast('Registered Successfully!');
        await saveMovie(movieForm);
        props.history.push("/movies");
    }

    const handleChange = ({currentTarget:input})=>{
        const obj={...movieForm,[input.name] : input.value}
        setMovieForm(obj);
    }
    const {title, numberInStock, genreId, dailyRentalRate} = movieForm;
    return(
        <>
        <form onSubmit={handleSubmit}>
            <h1>Register</h1>
            <Input name="title" type="text" value={title} label="Title" onChange={handleChange} error={errors.title} />
            <Select label="Genre" name="genreId" error={errors.genreId} options={genres} value={genreId} onChange={handleChange} />
            <Input name="numberInStock" type="text" value={numberInStock} label="Number In Stock" onChange={handleChange} error={errors.numberInStock}/>
            <Input name="dailyRentalRate" type="text" value={dailyRentalRate} label="Rate" onChange={handleChange} error={errors.dailyRentalRate}/>
            <br/>            
            <button type="submit" className="btn btn-primary">Register</button>
      </form>
        </>
    )
}

export default MovieForm;