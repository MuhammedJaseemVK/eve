import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice';

function ProtectedRoute({ children }) {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const getUser = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get('/api/v1/user/get-user-data', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {

            }
            else {
                localStorage.clear();
                <Navigate to='/login' />
            }
        }
        catch (error) {
            localStorage.clear();
            dispatch(hideLoading());
            console.log(error);
        }
    }

    useEffect(() => {
        if (!user) {
            getUser();
        }
    }, [user, getUser])
    if (localStorage.getItem('token')) {
        return children
    }
    else {
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute