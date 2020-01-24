import axios from 'axios';

export const GET_SCHOOLS = 'GET_SCHOOLS';
export const GET_SCHOOLS_ERROR = 'GET_SCHOOLS_ERROR';
export const SAVE_SCHOOLS = 'SAVE_SCHOOLS';
export const SAVE_SCHOOLS_ERROR = 'SAVE_SCHOOLS_ERROR';

const baseUrl = 'http://localhost:8001/v1/';

export const getSchools = (data) => {
  return (dispatch) => {
    return axios.post(`${baseUrl}school/get`, data)
      .then(response => {
        dispatch({type: GET_SCHOOLS, schools: response.data})
      })
      .catch(error => {
        return dispatch ({
          type: GET_SCHOOLS_ERROR,
          payload: JSON.parse(error.response)
        });
      });
  };
};

export const addSchool = (data) => {
  return (dispatch) => {
    return axios.post(`${baseUrl}school`, data)
      .then(response => {
        dispatch({type: SAVE_SCHOOLS, schools: response.data})
      })
      .catch(error => {
        return dispatch ({
          type: SAVE_SCHOOLS_ERROR,
          payload: JSON.parse(error.response)
        });
      });
  };
};