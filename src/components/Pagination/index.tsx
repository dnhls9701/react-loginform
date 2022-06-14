import Pagination from "@mui/material/Pagination";
import {FC, ChangeEvent} from "react";
import {SxPagination} from "./style";

export interface PaginationProps{
    totalData: number;
    onChange? (e: ChangeEvent<unknown>, page: number): void;
}

const PPagination: FC<PaginationProps> = props => {
    const {totalData, onChange} = props;

    return (
        <Pagination sx = {SxPagination} 
                        count={totalData}
                        variant= 'outlined' 
                        color = 'primary' 
                        shape = 'rounded'
                        onChange={onChange}
        />
    )

}

export default PPagination;