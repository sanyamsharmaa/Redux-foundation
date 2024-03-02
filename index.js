import  { createStore, combineReducers, applyMiddleware } from 'redux';
// import   logger  from 'redux-logger';
import pkg from 'redux-logger';
const { logger } = pkg;


// import  { createLogger } from 'redux-logger';
// const logger = createLogger({});

//Creating an actions
let BK = 'Book_Cake';

function CakeBooking(){
    return {
        type : BK,
        desp: 'Action of booking a cake'
    }
}
function AddCake(){
    return {
        type : 'Add',
        desp: 'Action of adding a cake'
    }
}
function BuyChoklats(){
    return {
        type : 'BuyChklts',
        desp: 'Action of adding a cake'
    }
}
function BuyBurgers(){
    return {
        type : 'BuyBurgers',
        desp: 'buying burgers'
    }
}

//Creating the states

let Sweetstate ={

    numofcakes: 10,
    numofchoklats: 20,
}
let FastFoodstate ={
    numofBurgers:15,
}

//Creating an reducer
const Sweetreducer = ( state=Sweetstate, action)=>{
    // this reducer managing two variables
    switch(action.type){
        case BK: return {
            ...state,
            numofcakes : state.numofcakes-1
        }
        case 'Add':return{
            ...state,
            numofcakes : state.numofcakes+1
        }
        case 'BuyChklts':return{
            ...state,
            numofchoklats : state.numofchoklats-1
        }
        
        default: return state;
        
    }
    
}

const FastFoodreducer =(state = FastFoodstate, action)=>{
    switch (action.type){
        case 'BuyBurgers':return{
            ...state,
            numofBurgers : state.numofBurgers-1
        } 
        default: return state;

    }
}

//Creating the store
const CombineReducer =combineReducers({
    Sweets:Sweetreducer,
    FastFood:FastFoodreducer
})
// const store = createStore(Sweetreducer)
// const store = createStore(CombineReducer) store of combine reducer
const store = createStore(CombineReducer,applyMiddleware(logger)) //with enhancer middleware

console.log('initial state- ',store.getState());
store.subscribe(()=>{console.log('updated state- ',store.getState());})
store.dispatch(CakeBooking());
store.dispatch(CakeBooking());
store.dispatch(AddCake());
store.dispatch(BuyChoklats());
store.dispatch(BuyBurgers());
store.dispatch(BuyBurgers());
// store.dispatch(CakeBooking());