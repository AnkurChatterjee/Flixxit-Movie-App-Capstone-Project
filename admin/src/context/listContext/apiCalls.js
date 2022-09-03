import axios from 'axios';
import { createListFailure, createListStart, createListSuccess, deleteListFailure, deleteListStart, deleteListSuccess, getListsFailure, getListsStart, getListsSuccess } from './ListActions';

export const getLists = async (dispatch) => {
    dispatch(getListsStart());
    try{
        let url = `http://localhost:9091/api/lists`;
        const response = await axios.get(url,{
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken 
              }
        });
        dispatch(getListsSuccess(response.data))
    } catch(err) {
        dispatch(getListsFailure());
    }
}

//create
export const createList = async (list,dispatch) => {
    dispatch(createListStart());
    try{
        let url = `http://localhost:9091/api/lists`;
        const response = await axios.post(url, list, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken 
              }
        });
        dispatch(createListSuccess(response.data))
    } catch(err) {
        dispatch(createListFailure());
    }
}

//delete
export const deleteList = async (id,dispatch) => {
    dispatch(deleteListStart());
    try{
        let url = `http://localhost:9091/api/lists/${id}`;
        await axios.delete(url,{
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken 
              }
        });
        dispatch(deleteListSuccess(id))
    } catch(err) {
        dispatch(deleteListFailure());
    }
}