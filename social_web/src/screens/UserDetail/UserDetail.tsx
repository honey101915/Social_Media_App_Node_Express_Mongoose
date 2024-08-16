import React, { useEffect, useState } from 'react';
import { Loader, UserDetailComp } from '../../components';
import { useLocation } from 'react-router-dom';
import { notifyError, notifySuccess } from '../../utils/ToastConfig';
import { ApiError, ApiSuccessResponse } from '../../utils/helperFunctions';
import { getAllPostApi, getUserDetailApi } from '../../redux/reduxActions/homeActions';


const UserDetail: React.FC = () => {

    const location = useLocation();
    const { person } = location.state || {};

    const [currentUserData, setCurrentUserData] = useState({})
    const [allPosts, setAllPosts] = useState([])
    const [isLoding, setLoading] = useState(true)

    console.log(person, "personpersonperson");

    useEffect(() => {
        _getUserDetails()
        _getAllUsersPosts()
    }, [])

    const _getUserDetails = () => {
        let _query = `?_id=${person?._id}`
        getUserDetailApi(_query).then((res: any) => {
            setCurrentUserData(res?.data)
            setLoading(false)
            notifySuccess(ApiSuccessResponse(res))
        }).catch((error: any) => {
            notifyError(ApiError(error))
            setLoading(false)
        })
    }

    const _getAllUsersPosts = () => {
        let _query = `?_id=${person?._id}&type=USER_DETAILS`
        getAllPostApi(_query).then((res: any) => {
            console.log(res, "getAllPostApi");
            setAllPosts(res?.data)
        }).catch((error: any) => {
            notifyError(ApiError(error))
            setLoading(false)
        })
    }

    const posts = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        image: `https://via.placeholder.com/600x400?text=Post+${i + 1}`,
        caption: `This is post ${i + 1}`,
    }));

    return (
        <div>
            <UserDetailComp user={currentUserData} posts={allPosts} />

            {isLoding && <Loader />}
        </div>
    );
};

export default UserDetail;
