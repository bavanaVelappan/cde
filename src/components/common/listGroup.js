
const ListGroup = (props) => {
    const {genres, onGenreSelect, selectedGenre} = props;
    return (
        <ul className="list-group">
            {genres.map(genre=>
            <li className={(selectedGenre === genre) ? "list-group-item active" : "list-group-item"}
             key={genre._id} onClick={()=>onGenreSelect(genre)} >{genre.name}</li>)}
        </ul>
    )
}
export default ListGroup;