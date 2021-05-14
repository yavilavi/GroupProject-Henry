import axios from 'axios';
import * as actionType from './types';
import { getMe, redirect } from './creators';

const BASE_URL = 'http://localhost:3001/api/';

const serverPetition = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
});

export default function changePassword(editPassword) {
  // eslint-disable-next-line func-names
  return function (dispatch) {
    if (editPassword.newPassword === editPassword.newPassword2) {
      serverPetition
        .put('/fo/editUserInfo/changePassword', editPassword, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(({ data }) => {
          if (data.success) {
            getMe(dispatch);
            redirect(dispatch, '/profile');
          }
        })
        .catch((err) => console.log(err.message));
      dispatch({ type: actionType.EDIT_USER_PASSWORD });
    }
  };
}