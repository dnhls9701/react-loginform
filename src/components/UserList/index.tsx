import {FC, useEffect, useState, ReactNode, Fragment, ChangeEvent} from "react";
import axios from "axios";
import Muitable from "@mui/material/Table";
import { TableCell, TableHead, TableRow, TableBody, Paper } from "@mui/material";
import Pagination from "components/Pagination";

export interface IUser{
    id: number;
    uid: string;
    password: string;
    first_name: string;
    last_name: string;
    username:string;
    email: string;
    gender: string;
    phone_number: string;
    social_insurance_number: string;
    date_of_birth: string;
    employment: string;
    address: string;
    credit_card:string;
    subscription: string;
}
export interface IEmployment{
    title: string;
    key_skill: string;
}
export interface ICoordinates{
    lat: number;
    lng: number;
}
export interface IAdress{
    city: string;
    street_name: string;
    street_address: string;
    zipcode: string;
    state: string;
    country: string;
    coordinates: ICoordinates;
}
export interface ICreaditCard{
    cc_number: string;
}
export interface ISubscription{
    plan: string;
    status: string;
    payment_method: string;
    term: string;
}
export interface IUserJson{
    id: number;
    uid: string;
    password: string;
    first_name: string;
    last_name: string;
    username:string;
    email: string;
    gender: string;
    phone_number: string;
    social_insurance_number: string;
    date_of_birth: string;
    employment: IEmployment;
    address: IAdress;
    credit_card: ICreaditCard;
    subscription: ISubscription;
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
        {key: "uid", name: "UID"},
        {key: "password", name: "Password"},
        {key: "first_name", name: "Firstname"},
        {key: "last_name", name: "Lastname"},
        {key: "username", name: "Username"},
        {key: "email", name: "Email"},
        {key: "gender", name: "Gender"},
        {key: "phone_number", name: "Phone number"},
        {key: "social_insurance_number", name: "Social insurance number"},
        {key: "date_of_birth", name: "D.O.B"},
        {key: "employment", name: "Employment"},
        {key: "address", name: "Address"},
        {key: "credit_card", name: "Credit card"},
        {key: "subscription", name: "Subscription"}
    ]} = props;

    //Get data from API
    const [dataUser, setDataUser] = useState<IUser[]>([]);

    useEffect(() => {
        axios.get("https://random-data-api.com/api/users/random_user?size=100")
        .then(res => {
            const data = res.data as IUserJson[];
            setDataUser(data.map<IUser>(d => {
                return{ 
                    id: d.id,
                    uid: d.uid,
                    password: d.password,
                    first_name: d.first_name,
                    last_name: d.last_name,
                    username: d.username,
                    email: d.email,
                    gender: d.gender,
                    phone_number: d.phone_number,
                    social_insurance_number: d.social_insurance_number,
                    date_of_birth: d.date_of_birth,
                    employment: d.employment.title + " " + d.employment.key_skill,
                    address: d.address.city + ', ' + d.address.street_name + ', ' + d.address.street_address + ', ' + d.address.zipcode + ', ' + d.address.state + ', ' + d.address.country,
                    credit_card: d.credit_card.cc_number,
                    subscription: d.subscription.plan + ', ' + d.subscription.status + ', ' + d.subscription.payment_method + ', ' + d.subscription.term
                }
            }));
        })
        .catch(error => console.log(error));
    }, [])

    //Set up pagination
    const pageSize = 10;
    const [currentPage, setCurrentPage] = useState(1);
    const handleChange = (newPage: number) => {
        setCurrentPage(newPage);
    };
    const indexOfLastPage = currentPage * pageSize;
    const indexOfFirstPage = indexOfLastPage - pageSize;
    const currentData = dataUser.slice(indexOfFirstPage, indexOfLastPage);

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
        <Pagination pageSize = {pageSize} 
                    totalData = {dataUser.length}
                    curPage = {currentPage}
                    onChange = {handleChange}
        />
    </Paper>
}

export default UserList;
