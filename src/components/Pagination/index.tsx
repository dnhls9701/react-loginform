// import { Paper, Typography } from "@mui/material";
// import Pagination from "@mui/material/Pagination";
import {FC, useState} from "react";
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
        <div>
          <ul className='pagination'>
            <li className='page-item'>
                <button disabled = {curPage <= 1}
                        onClick ={() => onChange(curPage - 1)} 
                > 
                Prev
                </button>
            </li>
            {pageNumbers.map(num => (
              <li key={num} className='page-item'>
                <button onClick={() => onChange(num)}>
                  {num}
                </button>
              </li>
            ))}
            <li className='page-item'>
                <button disabled = {curPage >= pageNumbers.length}
                    onClick ={() => onChange(curPage + 1)} 
                > 
                Next
                </button>
            </li>
          </ul>
        </div>
      );
            
}

export default Pagination;