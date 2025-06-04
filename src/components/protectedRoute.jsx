import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children, allowedRoles}) => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if(!token || !user || !allowedRoles.includes(user.role)) {
        return <Navigate to='/' />
    }
    
    return children;
};

export default ProtectedRoute;