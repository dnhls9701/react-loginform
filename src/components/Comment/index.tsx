import {FC, useEffect, useState, ReactNode, Fragment, ChangeEvent} from "react";
import axios from "axios";
import Muitable from "@mui/material/Table";
import { TableCell, TableHead, TableRow, TableBody, Paper } from "@mui/material";
import PPagination from "components/Pagination";

export interface IUserJson{
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
}

export interface ITableHeader{
    key: keyof IUserJson;
    name?: ReactNode;
}

export interface DataProps{
    header?: ITableHeader[];
}

const UserList: FC<DataProps> = props => {
    const {header = [
        {key: "postId", name: "Post ID"},
        {key: "id", name: "ID"},
        {key: "name", name: "Name"},
        {key: "email", name: "Email"},
        {key: "body", name: "Body"}
    ]} = props;

    //Get data from API
    const [dataUser, setDataUser] = useState<IUserJson[]>([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/comments?")
        .then(res => {
            const data = res.data as IUserJson[];
            setDataUser(data.map<IUserJson>(d => {
                return{ 
                    postId: d.postId,
                    id: d.id,
                    name: d.name,
                    email: d.email,
                    body: d.body
                }
            }));
        })
        .catch(error => console.log(error));
    }, [])

    //Set up pagination
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const handleChange = (e: ChangeEvent<unknown>, newPage: number) => {
        setCurrentPage(newPage);
    };
    const indexOfLastPage = currentPage * pageSize;
    const indexOfFirstPage = indexOfLastPage - pageSize;
    const currentData = dataUser.slice(indexOfFirstPage, indexOfLastPage);
    const totalData = Math.ceil(dataUser.length / pageSize);

    return <Paper>
        <Muitable>
            <TableHead>
                <TableRow>
                    {header.map((h, i) => {
                    return <TableCell key = {i}>
                        <Fragment>
                            {h.name}
                        </Fragment>
                        </TableCell>
                    })}
                </TableRow>
            </TableHead>
            <TableBody>
            {
            !!currentData?.length && 
                currentData.map((d, i) => {
                    return <TableRow key ={i}>
                        {header.map((h, j) => {
                            return <TableCell key ={j}>
                                <Fragment>
                                    {d[h.key]}
                                </Fragment>
                            </TableCell>
                        })}
                    </TableRow>
                })
            }
            </TableBody>
        </Muitable>
        {/* <PPagination 
            totalData = {totalData}
            onChange = {handleChange}
        /> */}
    </Paper>
}

export default UserList;
