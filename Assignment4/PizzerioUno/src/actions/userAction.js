import { UPPDATE_USER_INFO } from '../constants/userConstant';

export const updateUserInfo = ( fullName, address, city, telephone, zip)  => {
    return {
        type: UPPDATE_USER_INFO,
        payload: { fullName, address, city, telephone, zip }
    }
}; 
