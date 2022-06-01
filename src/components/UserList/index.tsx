import {FC, useEffect, useState, ReactNode, Fragment} from "react";
import axios from "axios";
import Muitable from "@mui/material/Table";
import { TableCell, TableHead, TableRow, TableBody } from "@mui/material";

export interface IUser{
    id: number;
    name: string;
    username: string;
    email: string;
    address: string;
    phone: string;
    website: string;
    company: string;
}
export interface IGeo{
    lat: string;
    lng: string;
}
export interface IAdress{
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IGeo;
}
export interface ICompany{
    name: string;
    catchPhrase: string;
    bs: string;
}
export interface IUserJson{
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAdress;
    phone: string;
    website: string;
    company: ICompany;
}

export interface ITableHeader{
    key: keyof IUser;
    name?: ReactNode;
}

export interface DataProps{
    header?: ITableHeader[];
}

const UserList: FC<DataProps> = props => {
    const {header = [
        {key: "id", name: "ID"},
        {key: "name", name: "Name"},
        {key: "username", name: "Userame"},
        {key: "email", name: "Email"},
        {key: "address", name: "Address"},
        {key: "phone", name: "Phone"},
        {key: "website", name: "Website"},
        {key: "company", name: "Company"},
    ]} = props;

    const [dataUser, setDataUser] = useState<IUser[]>([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(res => {
            const data = res.data as IUserJson[];
            setDataUser(data.map<IUser>(d => {
                return{ 
                    id: d.id,
                    name: d.name,
                    username: d.username,
                    email: d.email,
                    address: d.address.street + ', ' + d.address.suite + ', ' + d.address.city ,
                    phone: d.phone,
                    website: d.website,
                    company: d.company.name
                }
            }));
        })
        .catch(error => console.log(error));
    }, [])
    console.log(dataUser);

    return <Muitable>
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
            !!dataUser?.length && 
                dataUser.map((d, i) => {
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
}

export default UserList;
