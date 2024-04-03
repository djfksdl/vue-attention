<template>
    <div>
        <div class="wrap">
            <header>
                <div class="headerBoxOne">
                    <img src="@/assets/images/logo.png">
                </div>
                <div class="headerBoxTwo">
                    <a href="" class="home"><img src="@/assets/images/home_icon.png" alt=""></a>
                    <ul>
                        <li v-on:click="bColorChange('커피', $event)"><a href="#">커피</a></li>
                        <li v-on:click="bColorChange('논커피', $event)"><a href="#">논커피</a></li>
                        <li v-on:click="bColorChange('밀크쉐이크', $event)"><a href="#">밀크쉐이크</a></li>
                        <li v-on:click="bColorChange('스무디/프라페', $event)"><a href="#">스무디/프라페</a></li>
                        <li v-on:click="bColorChange('디저트', $event)"><a href="#">디저트</a></li>
                    </ul>
                </div>
            </header>
            <div class="container">
                <!-- 메뉴 박스 -->
                <div class="menuContainer">
                    <div v-for="(row, i) in Math.ceil(productList.length / 3)" v-bind:key="i" class="row">
                        <ul class="menuBox">
                            <li v-for="(productVo, i) in productList.slice(i * 3, (i + 1) * 3)" v-bind:key="i" class="col-md-4">
                                <div v-on:click="addCart(productVo.no)">
                                    <img v-bind:src="`http://localhost:9000/upload/${productVo.save_name}`">
                                    <div><strong>{{productVo.name}}</strong></div>
                                    <div><strong>{{numberWithCommas(productVo.price)}}</strong></div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

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
                                    <td>{{ numberWithCommas(cartVo.price *cartVo.count) }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 결제하기 버튼 -->
                    <div class="orderBtn">
                        <p>결제할 금액</p>
                        <p>&#8361; {{ numberWithCommas(totalAmount) }} 원</p>
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
                                            <td><button type="button" v-on:click="deleteCartVo(cartVo.no)">삭제</button></td>
                                        </tr>
                                        
                                    </tbody>
                                </table>
                            </div>
        
                            <div class="m-footer">
                                <p>총 금액 : &#8361;{{ numberWithCommas(totalAmount) }}원</p>
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

 export default {
    name: "OrderCoffeeView",
    components: {
    },
    data() {
        return {
            // isMaodal:false
            productList:[],
            cartItems: [],
            category: "커피"
        };
    },
    methods: {
        bColorChange(categoryName, event) {
            console.log(categoryName);
            this.category = categoryName;
            
            // 모든 li 요소의 하위 a 요소를 선택합니다.
            const links = document.querySelectorAll("li a");
            // console.log(this.category);
            // 각 요소에 대해 반복하여 초기화 설정
            links.forEach(link => {
                link.style.backgroundColor = "#5e2d1a";
                link.style.color = "#fff";
                link.style.fontWeight = "normal";
                link.style.height = "75px";
            });

            // 클릭한 요소의 변경
            event.target.style.backgroundColor = "#fff";
            event.target.style.color = "#000";
            event.target.style.fontWeight = "bold";
            event.target.style.height = "80px";

            this.getList();

        },
        getList(){
            console.log("리스트 불러오기");
            axios({
                method: 'get', // put, post, delete 
                url: 'http://localhost:9000/attention',
                headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                params: {category: this.category}, //get방식 파라미터로 값이 전달
                // data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                responseType: 'json' //수신타입
            }).then(response => {
                console.log(response); //수신데이타
                console.log(response.data);

                this.productList = response.data.apiData;
                // console.log()

            }).catch(error => {
                console.log(error);
            });
        },
        addCart(no){//장바구니에 추가하기
            console.log(no);

            const existingItem = this.cartItems.find(item => item.no === no);
            if(existingItem){
                existingItem.count++;
            }else{
                axios({
                    method: 'get', // put, post, delete 
                    url: 'http://localhost:9000/attention/cart',
                    headers: { "Content-Type": "application/json; charset=utf-8" }, //전송타입
                    params: {no:no}, //get방식 파라미터로 값이 전달
                    // data: guestbookVo, //put, post, delete 방식 자동으로 JSON으로 변환 전달
                    responseType: 'json' //수신타입
                }).then(response => {
                    console.log(response); //수신데이타
                    console.log(response.data.apiData);
                    let newItem = {
                        no: response.data.apiData.no,
                        name: response.data.apiData.name,
                        price: response.data.apiData.price,
                        count: 1
                    };
    
                    
                        this.cartItems.push(newItem);
                    
                  
    
                }).catch(error => {
                    console.log(error);
                });

            }
        },
        payment(){
            // console.log("주문전달");
            console.log(this.cartItems)

            //vuex에 넣기
            this.$store.commit("setCartList",this.cartItems);
        },
        deleteCartVo(no){
            // console.log("삭제버튼");
            console.log(no);

            const index = this.cartItems.findIndex(item => item.no === no);
            if (index !== -1) {
                // 해당 항목이 배열에 존재하면 삭제
                this.cartItems.splice(index, 1);
            }

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
        },
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },


    },
    computed: {
        totalAmount() {
        // Calculate the total amount based on items in the cart
        return this.cartItems.reduce((total, item) => total + item.price * item.count, 0);
        },
    },
    created(){
        this.getList();
    },
    mounted() {
        // 페이지가 로드되고 첫 번째 li 요소의 하위 a 요소를 선택합니다.
        const firstLink = document.querySelector("li:first-child a");

        // 선택한 요소의 배경색을 변경합니다.
        firstLink.style.backgroundColor = "#fff";
        firstLink.style.color = "#000";
        firstLink.style.fontWeight = "bold";
        firstLink.style.height = "80px";
    }

 };
</script>
 <style>

</style>