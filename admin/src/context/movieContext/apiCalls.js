import { createMovieFailure, createMovieStart, createMovieSuccess, deleteMovieFailure, deleteMovieStart, deleteMovieSuccess, getMoviesFailure, getMoviesStart, getMoviesSuccess } from "./MovieActions";
import axios from 'axios';

export const getMovies = async (dispatch) => {
    dispatch(getMoviesStart());
    try{
        let url = `http://localhost:9091/api/movies`;
        const response = await axios.get(url,{
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken 
              }
        });
        dispatch(getMoviesSuccess(response.data))
    } catch(err) {
        dispatch(getMoviesFailure());
    }
}

//create
export const createMovie = async (movie,dispatch) => {
    dispatch(createMovieStart());
    try{
        let url = `http://localhost:9091/api/movies`;
        const response = await axios.post(url, movie, {
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken 
              }
        });
        dispatch(createMovieSuccess(response.data))
    } catch(err) {
        dispatch(createMovieFailure());
    }
}

//delete
export const deleteMovie = async (id,dispatch) => {
    dispatch(deleteMovieStart());
    try{
        let url = `http://localhost:9091/api/movies/${id}`;
        await axios.delete(url,{
            headers: {
                token: "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken 
              }
        });
        dispatch(deleteMovieSuccess(id))
    } catch(err) {
        dispatch(deleteMovieFailure());
    }
}