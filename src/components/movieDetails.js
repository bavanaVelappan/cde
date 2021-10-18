
const MovieDetails = ({history, match}) =>{

    return (
        <>MovieDetails - {match.params.id}
        <br/>
        <button className="btn btn-primary" onClick={()=> history.push('/')}>Save</button>
        </>
    )
}
export default MovieDetails;