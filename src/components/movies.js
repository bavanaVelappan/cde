import { useState, useEffect } from "react";
import { getGenres } from "../services/genreService";
import { getMovies, deleteMovie } from "../services/movieService";
import { paginate } from "../util/paginate";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import MoviesTable from "./moviesTable";
import _ from "lodash";

const Movies = (props) => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [sortColumn, setSortColumn] = useState({
        path:'title',
        order:'asc'
    });
    const [pageSize, setPageSize] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState('');

    useEffect(()=>{
        async function fetchData() {
            const {data:movieList} = await getMovies();
            const {data:genreList} = await getGenres();
            const genreLists = [{ _id:'',name:"All Genres"}, ...genreList];
            setMovies(movieList);
            setGenres(genreLists);
        }
        fetchData();
    },[])

    const handleDelete = async(movieId)=>{
        
       const movieList = movies.filter((movie)=>movie._id!==movieId);
       setMovies(movieList);
       await deleteMovie(movieId);
    }

    const handleLike = (movie) =>{
        const movieList = [...movies];
        const index = movieList.indexOf(movie);
        movieList[index] = {...movieList[index]}
        movieList[index].liked = !movieList[index].liked;
        setMovies(movieList);
    }

    const handlePageChange = (page) =>{
        setCurrentPage(page);
    }

    const handleGenre = (genre) =>{
        setSelectedGenre(genre);
        setCurrentPage(1);
    }

    const handleSort = (path) => {
        const cloneSortColumn = {...sortColumn};
        if(cloneSortColumn.path === path) {
            cloneSortColumn.order = cloneSortColumn.order === 'asc' ? 'desc' : 'asc';
        } else {
            cloneSortColumn.path = path;
            cloneSortColumn.order = 'asc';
        }
        setSortColumn(cloneSortColumn);
    }

    if (movies.length===0) return <p>There is no movies in the DB</p> 
    const filtered = selectedGenre && selectedGenre._id  ? movies.filter(m=>m.genre._id === selectedGenre._id) :movies ;
    const sortedData = _.orderBy(filtered,[sortColumn.path],[sortColumn.order])
    const moviesList = paginate(sortedData, currentPage, pageSize);
    return (
        <div className="row">
            <div className="col-2">
               <ListGroup genres={genres} onGenreSelect={handleGenre} selectedGenre={selectedGenre}/>
            </div>
            <div className="col">
                <p>There are {sortedData.length} movies in the DB</p>
                <button className="btn btn-primary" onClick={()=>props.history.push("/movieForm/new")}>New Movie</button>
                <MoviesTable moviesList={moviesList} onLike={handleLike} onDelete={handleDelete} onSort={handleSort}/>
            </div>
            <Pagination itemsCount={sortedData.length} pageSize={pageSize} onPageChange={handlePageChange} currentPage={currentPage}/>
        </div>
    )
}

export default Movies;