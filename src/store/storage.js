import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state(){
        return{
            cartList:"",
            total: 0
        }
    },
    mutations:{
        setCartList(state,payload){
            state.cartList = payload;
        },
        setTotal(state,payload){
            state.total = payload;
        }
    },
    plugins:[
        createPersistedState({
            paths:['cartList','total']
        })
    ]
})