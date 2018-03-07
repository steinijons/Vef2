import { UPPDATE_USER_INFO } from '../constants/userConstant';

const initialState = {
    user: {}
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPPDATE_USER_INFO:
            const { name, address, city, telephone, zip } = action.payload;
            return Object.assign({}, state,{ user: { name, address, city, telephone, zip } });
        default: return state;
    }
}

export default userReducer;
