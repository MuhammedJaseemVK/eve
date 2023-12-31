import React, { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/features/alertSlice';
import { setUser } from '../redux/features/userSlice';

function ProtectedRoute({ children }) {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);

    const getUser = async () => {
        try {
            dispatch(showLoading());
            const res = await axios.get('/api/v1/user/get-user-info', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            dispatch(hideLoading());
            if (res.data.success) {
                dispatch(setUser(res.data.user));
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
    }, [user, getUser]);

    if (localStorage.getItem('token')) {
        return children
    }
    else {
        return <Navigate to='/login' />
    }
}

export default ProtectedRoute