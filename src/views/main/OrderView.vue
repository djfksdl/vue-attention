<template>
    <div>
        <div class="wrap">
            <AppHeader/>
            <div class="container">
                <!-- 메뉴 박스 -->
                <ul class="menuBox">
                    <!-- 이미지반복영역 -->
                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>
                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>
                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>
                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>
                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>

                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>
                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>
                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>
                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>
                    <li>
                        <img src="@/assets/images/coffee01.jpg">
                        <div ><strong>Hot아메리카노</strong></div>
                        <div ><strong>2500</strong></div>
                    </li>
                    
                    <!-- 이미지반복영역 -->
                </ul>

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
                                <tr>
                                    <td>ICE아메리카노</td>
                                    <td><button>-</button>1<button>+</button></td>
                                    <td>2500</td>
                                </tr>
                                <tr>
                                    <td>ICE아메리카노</td>
                                    <td><button>-</button>1<button>+</button></td>
                                    <td>2500</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!-- 결제하기 버튼 -->
                    <div class="orderBtn">
                        <p>총 금액: 5000 원</p>
                        <button type="button">주문하기</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- 모달창 -->
        <div class="modal">
            <div class="modal-content">
                <div>
                    <div class="Modal-top">
                        <div class="m-header">주문 정보</div>
                    </div>

                    <div class="m-body">
                        <table>
                            <tbody>
                                <tr>
                                    <td>ICE아메리카노</td>
                                    <td><button>-</button>1<button>+</button></td>
                                    <td><button>삭제</button></td>
                                </tr>
                                <tr>
                                    <td>ICE아메리카노</td>
                                    <td><button>-</button>1<button>+</button></td>
                                    <td><button>삭제</button></td>
                                </tr>
                                <tr>
                                    <td>ICE아메리카노</td>
                                    <td><button>-</button>1<button>+</button></td>
                                    <td><button>삭제</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="m-footer">
                        <p>총 금액 : 5000원</p>
                        <div class="btnBox">
                            <button type="button">돌아가기</button>
                            <button type="button">결제하기</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
 </template>
 <script>
 import '@/assets/css/order.css';
 import AppHeader from '@/components/AppHeader.vue';
 export default {
    name: "OrderView",
    components: {
        AppHeader
    },
    data() {
        return {};
    },
    methods: {},
    created(){}
 };
 </script>
 <style></style>