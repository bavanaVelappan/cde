const Like = (props) =>{
   
    let classes = "fa fa-heart";
    (props.liked) ? classes+="-o" : classes+='';
    return(        
        <i className={classes} onClick={props.onLikeToggle} style={{cursor:"pointer"}}></i>
    )
}
export default Like;