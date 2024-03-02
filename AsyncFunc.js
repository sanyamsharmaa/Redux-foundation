import { createStore, applyMiddleware } from "redux"
import axios from "axios"
import { thunk } from "redux-thunk"
const initialstate={
    loading:false,
    users:[],
    error:''
}

const User_API_Request='processing'
const User_API_Success='success'
const User_API_Failed='failed'

function ApiReq(){
    return{
        type:User_API_Request,
    }
}
function ReqSuccess(user){
    return{
        type:User_API_Success,
        payload:user
    }
}
function ReqFailed(err){
    return{
        type:User_API_Failed,
        payload: err
    }
}

const UserReducer=(state=initialstate, action)=>{
    switch (action.type){
        case User_API_Request:
            return{
                ...state,
                loading:true,
            }
        case User_API_Success:
            return{
                ...state,
                loading:false,
                payload:action.payload
            }
        case User_API_Failed:
            return{
                ...state,
                loading:false,
            }
            default : return state;
    }
}
const fetchuser=()=>{
    return (dispatch)=>{
        dispatch(ApiReq())
        axios.get('https://jsonplaceholder.typicode.com/users',{params:{_limit:10}})
        .then(response=>{ //?
           const user=response.data.map(({ name, email })=>({name,email}))
            dispatch(ReqSuccess(user))
        })
        .catch(error=>dispatch(ReqFailed(error)))
    }
}
const store = createStore(UserReducer,applyMiddleware(thunk))
console.log('data-',store.getState())
store.subscribe(()=>console.log('updated state :-',store.getState()))
store.dispatch(fetchuser())
