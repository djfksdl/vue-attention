<template>
    <div>
        <header>
            <div class="headerBoxOne">
                <img src="@/assets/images/attention.png">
            </div>
            <div class="headerBoxTwo">
                <a href="" class="home"><img src="@/assets/images/home_icon.png" alt=""></a>
                <ul>
                    <li v-on:click="bColorChange"><a href="#">커피</a></li>
                    <li v-on:click="bColorChange"><a href="#">논커피</a></li>
                    <li v-on:click="bColorChange"><a href="#">밀크쉐이크</a></li>
                    <li v-on:click="bColorChange"><a href="#">스무디/프라페</a></li>
                    <li v-on:click="bColorChange"><a href="#">디저트</a></li>
                </ul>
            </div>
        </header>
    </div>
 </template>
 <script>
 import '@/assets/css/attention.css';
 export default {
    name: "AppHeader",
    components: {},
    data() {
        return {
            
        };
    },
    methods: {
        bColorChange(event) {
    // 모든 li 요소의 하위 a 요소를 선택합니다.
            const links = document.querySelectorAll("li a");

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
        }
        
    },
    created(){

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
 <style></style>