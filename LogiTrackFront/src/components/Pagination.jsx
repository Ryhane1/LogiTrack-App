import Pagination from "@mui/material/Pagination";
import "./Pagination.css"

function PaginationComponent({page, totalPages, onPageChange}){
    const handleChange=(e,value)=>{
       onPageChange(value);
    }
    return(
        <div className="pagination-container">
            <Pagination
             count={totalPages}
             page={page}
             onChange={handleChange}
            />
        </div>
    )
}
export default PaginationComponent;