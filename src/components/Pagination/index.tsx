// import { Paper, Typography } from "@mui/material";
// import Pagination from "@mui/material/Pagination";
import {FC, useState} from "react";
import './style.css';

export interface PaginationProps{
    totalData: number;
    pageSize: number;
    onChange (page: number): void;
}

const Pagination: FC<PaginationProps> = (props) => {
    const {totalData, pageSize, onChange} = props;
    const pageNumbers = [];
    for(let i = 1; i <= Math.ceil(totalData/pageSize); i++){
        pageNumbers.push(i);
    }

    return (
        <div>
          <ul className='pagination'>
            {pageNumbers.map(num => (
              <li key={num} className='page-item'>
                <button onClick={() => onChange(num)}>
                  {num}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
            
}

export default Pagination;