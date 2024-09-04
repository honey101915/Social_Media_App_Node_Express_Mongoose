// src/App.tsx
import React, { useEffect, useState } from 'react';
import { Loader, UserComp } from '../../components';
import { getAllUsersApi } from '../../redux/reduxActions/homeActions';
import { notifyError } from '../../utils/ToastConfig';
import { ApiError } from '../../utils/helperFunctions';
import { useNavigate } from 'react-router-dom';

const AllUsers: React.FC = () => {

    const navigate = useNavigate()

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
                    handleCardClick={() => navigate("/home/allUsers/userDetail", {
                        state: { person }
                    })}
                    onclickSendRequest={() => {
                        alert("Send Request")
                    }}
                    onclickSendMessage={() => {
                        alert("Send Message")
                    }}
                />
            ))}
            {isLoding && <Loader />}
        </div>
    );
};

export default AllUsers;
