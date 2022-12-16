import { useContext } from "react";
import { UserContext } from "./UserContext";
import { GoogleLogin } from '@react-oauth/google';
import jwr_decode from 'jwt-decode';
import { AuthUser } from "./UserContext";
import './User.css';
import { Courses } from "../Courses/Courses";

export const User = () => {
    const userContext = useContext(UserContext);

    return (
        <div>
            {
                userContext.user?.name ? <Courses />
                    : 
                    <div className="login-box">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            var userObject = jwr_decode(credentialResponse.credential ? credentialResponse.credential : "");
                            userContext.setUser(userObject as AuthUser)
                            //console.log("User Name is " + userContext.user?.name);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />
                    </div>
            }

        </div>
    )
}