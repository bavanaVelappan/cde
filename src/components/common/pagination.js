import _ from 'lodash';
import PropTypes from "proptypes";
import { Link } from 'react-router-dom';


const Pagination = (props)=>{
    const {pageSize, onPageChange, itemsCount, currentPage} = props;
    const pagesCount = Math.ceil(itemsCount/pageSize);
    const pages = _.range(1,pagesCount+1);
    if (pagesCount === 1) return null;
    return (
        <nav>
            <ul className="pagination">                
                {pages.map(page=>                 
                <li key={page} className={(currentPage === page) ? "page-item active" : "page-item"}><Link to="#" className="page-link" onClick={()=>onPageChange(page)} >{page}</Link></li>)}
            </ul>
        </nav>
    )
}

Pagination.propTypes = {
    pageSize : PropTypes.number,
    onPageChange : PropTypes.func,
    itemsCount : PropTypes.number,
    currentPage : PropTypes.number
}

export default Pagination;