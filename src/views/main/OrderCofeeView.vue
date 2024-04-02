<template>
    <div>
        <div class="wrap">
            <AppHeader/>
            <div class="container">
                <!-- 메뉴 박스 -->
                <div v-for="(row, i) in Math.ceil(productList.length / 3)" v-bind:key="i" class="row">
                    <ul class="menuBox">
                        <li v-for="(productVo, i) in productList.slice(i * 3, (i + 1) * 3)" v-bind:key="i" class="col-md-4">
                            <div v-on:click="addCart(productVo.no)">
                                <img v-bind:src="`http://localhost:9000/upload/${productVo.save_name}`">
                                <div><strong>{{productVo.name}}</strong></div>
                                <div><strong>{{productVo.price}}</strong></div>
                            </div>
                        </li>
                    </ul>
                </div>

                <!-- <div v-for="(group, i) in groupedProductList" v-bind:key="i" class="row">
                    <ul class="menuBox">
                        <li v-for="(productVo, i) in group" v-bind:key="i" class="col-md-4">
                        <img v-bind:src="`http://localhost:9000/upload/${productVo.save_name}`" />
                        <div><strong>{{ productVo.name }}</strong></div>
                        <div><strong>{{ productVo.price }}</strong></div>
                        </li>
                    </ul>
                </div> -->

                <!-- 선택한 상품 담는곳 + 결제하기 버튼 -->
                <div class="bottomContainer">
                    <!-- 선택한 상품 담기 -->
                    <div class="selectItem">
                        <table>
                            <thead>
                                <tr>
                                    <th>항목</th>
                                    <th>수량</th>
                                    <th>금액</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(cartVo, i) in cartItems" v-bind:key="i">
                                    <td>{{ cartVo.name }}</td>
                                    <td>
                                        <button v-on:click="minus(i)">-</button>
                                        {{ cartVo.count }}
                                        <button v-on:click="plus(i)">+</button>
                                    </td>
                                    <td>{{ cartVo.price }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 결제하기 버튼 -->
                    <div class="orderBtn">
                        <p>총 금액: 5000 원</p>
                        <button type="button" v-on:click="modalOpen">주문하기</button>
                    </div>
                </div>

                <!-- 모달창 -->
                <div class="modal" v-bind:class="{'modal-on': isMaodal}">
                    <div class="modal-content">
                        <div>
                            <div class="Modal-top">
                                <div class="m-header">주문 정보</div>
                            </div>
        
                            <div class="m-body">
                                <table>
                                    <tbody>
                                        <tr v-for="(cartVo, i) in cartItems" v-bind:key="i">
                                            <td>{{cartVo.name}}</td>
                                            <td>
                                                <button v-on:click="minus(i)">-</button>
                                                {{ cartVo.count }}
                                                <button v-on:click="plus(i)">+</button>
                                            </td>
                                            <td><button>삭제</button></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
        
                            <div class="m-footer">
                                <p>총 금액 : 5000원</p>
                                <div class="btnBox">
                                    <button type="button" v-on:click="modalClose">돌아가기</button>
                                    <button type="button" v-on:click="payment" >결제하기</button>
                                </div>
                            </div>
                        </div>
                    </div>
        
                </div>
            </div><!--container끝-->

            
        </div><!--wrap 끝-->

    </div>
 </template>
 <script>
 import axios from 'axios'
 import '@/assets/css/order.css';
 import '@/assets/css/scrollbar.module.css';
 import AppHeader from '@/components/AppHeader.vue';
 export default {
    name: "OrderCoffeeView",
    components: {
        AppHeader
    },
    data() {
        return {
            // isMaodal:false
            productList:[],
            cartItems: []
        };
    },
    methods: {
        getList(){
            console.log("리스트 불러오기");
            axios({
                method: 'get', // put, post, delete 
                url: 'http://localhost:9000/attention',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: guestbookVo, //get방식 파라미터로 값이 전달
                // data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                console.log(response.data);

                this.productList = response.data.apiData;

            }).catch(error => {
                console.log(error);
            });
        },
        addCart(no){//장바구니에 추가하기
            console.log(no);

            axios({
                method: 'get', // put, post, delete 
                url: 'http://localhost:9000/attention/cart',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: {no:no}, //get방식 파라미터로 값이 전달
                // data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                console.log(response.data.apiData.name);
                let newItem = {
                    name: response.data.apiData.name,
                    price: response.data.apiData.price,
                    count: 1
                };
                this.cartItems.push(newItem);
              

            }).catch(error => {
                console.log(error);
            });
        },
        payment(){
            console.log("주문전달");
            axios({
                method: 'post', // put, post, delete 
                url: 'http://localhost:9000/attention/cart',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                // params: {no:no}, //get방식 파라미터로 값이 전달
                // data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                console.log(response.data.apiData.name);
                let newItem = {
                    name: response.data.apiData.name,
                    price: response.data.apiData.price,
                    count: 1
                };
                this.cartItems.push(newItem);
              

            }).catch(error => {
                console.log(error);
            });
        },
        modalOpen(){//모달창 띄우기
            // this.isMaodal= true
            document.querySelector('.modal').style.display = "block"
        },
        modalClose(){
            // this.isMaodal = false
            document.querySelector('.modal').style.display = "none"
        },
        minus(i) {
        // console.log("마이너스")
        if (this.cartItems[i].count > 1) {
            this.cartItems[i].count--;
            }
        },
        plus(i) {
            // console.log("플러스")
            this.cartItems[i].count++;
        }


    },
    created(){
        this.getList();
    }

 };
</script>
 <style>

</style>