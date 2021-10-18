
import { Link } from "react-router-dom";
import LikeComponent from "./common/like";

const MoviesTable = (props)=>{
    const {moviesList, onLike, onDelete, onSort} = props;
    return(
        <table className="table table-striped">
            <thead>
                <tr>
                    <th onClick={()=>onSort('title')}>Title</th>
                    <th onClick={()=>onSort('genre.name')}>Genre</th>
                    <th onClick={()=>onSort('numberInStock')}>No of Stock</th>
                    <th onClick={()=>onSort('dailyRentalRate')}>Daily Rental Rate</th>
                </tr>
            </thead>
            <tbody>
                {moviesList.map((movie)=>
                <tr key={movie._id}>
                    <td><Link to={`/movieForm/${movie._id}`}>{movie.title}</Link></td>
                    <td>{movie.genre.name}</td>
                    <td>{movie.numberInStock}</td>
                    <td>{movie.dailyRentalRate}</td>
                    <td><LikeComponent onLikeToggle={()=>onLike(movie)} liked={movie.liked} /></td>
                    <td><button className="btn btn-danger" onClick={()=>onDelete(movie._id)}>Delete</button></td>
                </tr>)}
            </tbody>
        </table>
    )
}
export default MoviesTable;