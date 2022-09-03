import axios from "axios";
import { loginStart, loginSuccess } from "./AuthActions";
import { loginFailure } from "./AuthActions";

const login = async (user, dispatch, setAuthMsg, setAuthClass) => {
    dispatch(loginStart());
    try{
        let url = `http://localhost:9091/api/auth/login`;
        const response = await axios.post(url, user);
        if(response.data.message === "Username not found"){
            setAuthMsg("Sorry, we can't find an account with this email address.");
            setAuthClass("alert-warning");
            dispatch(loginFailure());
        }
        else if(response.data.message === "Incorrect Password"){
            setAuthMsg("Incorrect Password. Please try again.");
            setAuthClass("alert-warning");
            dispatch(loginFailure());
        }
        else
            dispatch(loginSuccess(response.data));
    } catch(err) {
        dispatch(loginFailure());
    }
}

export default login;