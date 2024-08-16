// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Loader, UserComp } from '../../components';
import { getAllUsersApi } from '../../redux/reduxActions/homeActions';
import { notifyError } from '../../utils/ToastConfig';
import { ApiError } from '../../utils/helperFunctions';

type Person = {
    id: number;
    name: string;
    username: string;
    image: string;
};

const people: Person[] = [
    {
        id: 1,
        name: 'John Doe',
        username: '@johndoe',
        image: 'https://via.placeholder.com/100',
    },
    {
        id: 2,
        name: 'Jane Smith',
        username: '@janesmith',
        image: 'https://via.placeholder.com/100',
    },
    {
        id: 3,
        name: 'Alice Johnson',
        username: '@alicejohnson',
        image: 'https://via.placeholder.com/100',
    },
];

const AllUsers: React.FC = () => {

    const [isLoding, setLoading] = useState(true)
    const [allUsers, setAllUsers] = useState([])

    useEffect(() => {
        _getAllUsers()
    }, [])

    const _getAllUsers = () => {
        getAllUsersApi().then((res: any) => {
            console.log(res, "resresres");
            setLoading(false)
            setAllUsers(res?.data || [])
        }).catch((error) => {
            setLoading(false)
            notifyError(ApiError(error))
        })
    }

    return (
        <div>
            {allUsers.map((person: any, index: number) => (
                <UserComp
                    key={person?._id}
                    personData={person}
                    personIndex={index}
                />
            ))}
            {isLoding && <Loader />}
        </div>
    );
};

export default AllUsers;
