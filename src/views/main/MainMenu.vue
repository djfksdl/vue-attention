<template>
    <div>
        <div class="wrap">

            <!-- ======== 카테고리 헤더 ======== -->
            <header class="menuheader">
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

            <!-- ======== 내용 나오는곳 ======== -->
            <div class="container">
                <!-- 메뉴 리스트 -->
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

                <!-- 장바구니 + 결제하기 버튼 -->
                <div class="bottomContainer">
                    <!-- 장바구니 -->
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

                <!-- ======== 모달창 ======== -->
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
                                            <td><button type="button" v-on:click="deleteCartVo(i)">삭제</button></td>
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
 import '@/assets/css/mainmenu.css';
 import '@/assets/css/menuheader.css';
 import '@/assets/css/scrollbar.module.css';

 export default {
    name: "MainMenu",
    components: {
    },
    data() {
        return {
            // isMaodal:false
            productList:[],
            cartItems: [],
            category: "커피",
            total: 0
        };
    },
    methods: {
        //======== 메뉴 클릭했을때 스타일 변경 ========
        bColorChange(categoryName, event) {
            console.log(categoryName);
            this.category = categoryName;
            
            const links = document.querySelectorAll("li a");

            // 반복하여 초기화 설정
            links.forEach(link => {
                link.style.backgroundColor = "#5e2d1a";
                link.style.color = "#fff";
                link.style.fontWeight = "normal";
                link.style.height = "75px";
            });

            //변경되는 부분 설정
            event.target.style.backgroundColor = "#fff";
            event.target.style.color = "#000";
            event.target.style.fontWeight = "bold";
            event.target.style.height = "80px";

            //다시 리스트 불러오기
            this.getList();

        },
        //======== 첫화면 리스트 불러오기 ========
        getList(){
            axios({
                method: 'get', 
                url: 'http://localhost:9000/attention/mainmenu',
                headers: { "Content-Type": "application/json; charset=utf-8" }, 
                params: {category: this.category}, 
               
                responseType: 'json' 
            }).then(response => {
                console.log(response); 
                console.log(response.data);

                this.productList = response.data.apiData;
                console.log(this.productList)

            }).catch(error => {
                console.log(error);
            });
        },

        //======== 선택한 상품 장바구니에 담기 ========
        addCart(no){
            console.log(no);

            const existingItem = this.cartItems.find(item => item.no === no);
            if(existingItem){
                existingItem.count++;
            }else{
                axios({
                    method: 'get', 
                    url: 'http://localhost:9000/attention/mainmenu/cart',
                    headers: { "Content-Type": "application/json; charset=utf-8" }, 
                    params: {no:no}, 

                    responseType: 'json' 
                }).then(response => {
                    console.log(response); 
                    console.log(response.data.apiData);

                    let newItem = {
                        no: response.data.apiData.no,
                        name: response.data.apiData.name,
                        price: response.data.apiData.price,
                        count: 1
                    };

                    this.cartItems.push(newItem);

                    console.log("cartItems"+this.cartItems);
    
                }).catch(error => {
                    console.log(error);
                });

            }
        },

        //======== 장바구니 목록 vuew에 담기 ========
        payment(){

            this.$store.commit("setCartList",this.cartItems);
            this.$store.commit("setTotal",this.total);

            console.log(this.$store.state.cartList);
            console.log(this.$store.state.cartList[0]);
            console.log(this.$store.state.cartList[0].name);
        
        },

        //======== 리스트에서 한개 삭제하기 ========
        deleteCartVo(i){ 
            //배열의 i번째 배열을 찾아서 삭제하기, i번째부터 '1'를 지운다는 뜻(ppt참조)
            //상품번호를 보낼 필요없이 배열 순서만 보내서 지워도 되서 i를 활용한다. no보내서 db에서 가져와야하는건 no를 가져와야함!
            this.cartItems.splice(i, 1);
            
        },

        //======== 모달창 띄우기 ========
        modalOpen(){
            // this.isMaodal= true
            document.querySelector('.modal').style.display = "block"
        },

        //======== 모달창 닫기 ========
        modalClose(){
            // this.isMaodal = false
            document.querySelector('.modal').style.display = "none"
        },

        //======== 빼기 버튼 ========
        minus(i) {
            if (this.cartItems[i].count > 1) {
                    this.cartItems[i].count--;
                }
        },

        //======== 더하기 버튼 ========
        plus(i) {
            this.cartItems[i].count++;
        },

        //======== 천단위고 ,넣기 ========
        numberWithCommas(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        },


    },
    computed: {

        //======== 총 금액 계산 ========
        totalAmount() {
            return this.cartItems.reduce((total, item) => total + item.price * item.count, 0);
        },

    },
    watch:{
        totalAmount(newTotal) {
            this.total = newTotal;
        }
    },
    created(){

        //======== 전체 리스트 불러오기 ========
        this.getList();

    },
    mounted() {

        //======== 메뉴 클릭했을때 스타일 변경 ========
        const firstLink = document.querySelector("li:first-child a");

        firstLink.style.backgroundColor = "#fff";
        firstLink.style.color = "#000";
        firstLink.style.fontWeight = "bold";
        firstLink.style.height = "80px";

    }

 };
</script>
 <style>

</style>