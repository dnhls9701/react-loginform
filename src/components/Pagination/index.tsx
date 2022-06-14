// import { Paper, Typography } from "@mui/material";
// import Pagination from "@mui/material/Pagination";
import {FC} from "react";
import './style.css';

export interface PaginationProps{
    totalData: number;
    pageSize: number;
    curPage: number;
    onChange (page: number): void;
}

const Pagination: FC<PaginationProps> = (props) => {
    const {totalData, pageSize, onChange, curPage} = props;
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalData/pageSize); i++){
        pageNumbers.push(i);
    }

    return (
          <div className='pagination'>
            <button 
                    disabled = {curPage === 1}
                    onClick ={() => onChange(curPage - 1)}
            >Prev</button>
            {pageNumbers.map((num => (
                <button 
                        key={num} 
                        onClick={() => onChange(num)}
                >{num}</button>
            )))
            }
            <button 
                    disabled = {curPage === pageNumbers.length}
                    onClick ={() => onChange(curPage + 1)}
            >Next</button>
        </div>
      );
            
}

export default Pagination;