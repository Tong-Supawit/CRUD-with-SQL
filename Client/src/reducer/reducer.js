import { combineReducers } from "redux";

const initialState = {
    isAuthenticated : false,
    loading : true,
    user : null,
    role : null
};

function authentication (state = initialState, action) {
    switch(action.type){
        case "USER_LOADED" : 
            return{
                ...state,
                isAuthenticated  : true,
                loading : false,
                user : action.payload.user,
                role : action.payload.role
            }
        case "SUCCESS" : 
            return{
                ...state,
                isAuthenticated  : true,
                loading : false,
                user : action.payload.user,
                role : action.payload.role
            }
        case "AUTHENTICATION_ERROR" :
        case "LOGOUT" : 
            return{
                ...state,
                isAuthenticated  : false,
                loading : false,
                user : null,
                role : null
            }
        default : 
            return state;
    }
}


const RootReducer = combineReducers({
    authentication
});

export default RootReducer;