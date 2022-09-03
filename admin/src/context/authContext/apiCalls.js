import axios from "axios";
import { loginStart, loginSuccess } from "./AuthActions";
import { loginFailure } from "./AuthActions";

const login = async (user, dispatch) => {
    dispatch(loginStart());
    try{
        let url = `http://localhost:9091/api/auth/login`;
        const response = await axios.post(url, user);
        response.data.isAdmin && dispatch(loginSuccess(response.data));
    } catch(err) {
        dispatch(loginFailure());
    }
}

export default login;