import { createStore } from "vuex";
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    state(){
        return{
            cartList:null
        }
    },
    mutations:{
        setCartList(state,payload){
            state.cartList = payload;
        }
    },
    plugins:[
        createPersistedState({
            paths:'cartList'
        })
    ]
})