<template>
    <div 
      class="relative h-screen overflow-hidden"
      @wheel="handleWheel"
      @click="handleClick"
    >
      <div 
        class="absolute w-full transition-transform duration-500 ease-in-out"
        :style="containerTransform"
      >
        <!-- 第一屏 -->
        <div class=" relative h-screen bg-black flex flex-col p-12 px-32 pb-56 loginBackground">
            <div class="carousel-container w-full" style="height: 34rem;" ref="carousel">
                <Carousel class="h-full flex-1"/>
            </div>
            <div class=" absolute bottom-20 left-48 flex flex-row cursor-default">
                <RainbowText :text="'Welcome to the personal website of Li Linghao.'"/>
            </div>
        </div>
        
        <!-- 第二屏 -->
        <div class="h-screen bg-black flex flex-col items-center justify-center reverseLoginBackground" :key="loginMark" v-loading="isLoading" element-loading-text="加载中..." element-loading-spinner="el-icon-loading">
            <div class=" flex flex-row items-center justify-center bg-white rounded-2xl shadow-2xl" style="height: 36rem; width: 72rem;">
                <ul class=" flex flex-col space-y-4 ml-36">
                    <li 
                    v-for="item in mainFunctionList" 
                    :key="item.index"
                    class="flex items-start"
                    >
                        <!-- 圆点部分 -->
                        <div :style="{backgroundColor: item.color}" class="flex-shrink-0 w-2 h-2 mt-2 mr-3 rounded-full" style="marginTop: 0.4rem"></div>
                        <!-- 文字内容 -->
                        <span :style="{color: item.color}" class="text-gray-700 text-sm font-semibold">{{ item.name }}</span>
                    </li>
                </ul>
                
                <div class=" flex flex-col items-center ml-auto mr-36 mb-12" style="height: 24rem; width: 20rem;">
                    <div class=" flex flex-row space-x-8 mt-6">
                        <div @click="switchToLogin" class=" text-lg font-semibold border-b-2 cursor-pointer" :class="[serviceStatus == 1 ? ' text-main_color_1 border-main_color_1' : ' text-neutral_color_4 border-neutral_color_4']">登录</div>
                        <div @click="switchToRegister" class=" text-lg font-semibold border-b-2 cursor-pointer" :class="[serviceStatus == 2 ? ' text-main_color_1 border-main_color_1' : ' text-neutral_color_4 border-neutral_color_4']">注册</div>
                    </div>

                    <div v-if="serviceStatus == 1" class="flex flex-col items-center justify-center space-y-16 mt-32">
                        <div class="flex flex-col space-y-2">
                            <input v-model="username" class="h-8 w-64 rounded-xl bg-transparent border border-neutral_color_6 text-neutral_color_1 outline-none text-xs px-2 placeholder:text-neutral_color_5 focus:border-main_color_1" placeholder="用户名" type="text">
                            <input @keydown.enter="login" v-model="password" class="h-8 w-64 rounded-xl bg-transparent border border-neutral_color_6 text-neutral_color_1 outline-none text-xs px-2 placeholder:text-neutral_color_5 focus:border-main_color_1" placeholder="密码" type="password">
                        </div>
                        <button @click="login" class="h-8 w-64 text-white text-sm bg-main_color_1 rounded-xl hover:bg-main_color_1/75">登录</button>
                    </div>
                    <div v-if="serviceStatus == 2" class="flex flex-col items-center justify-center space-y-6 mt-8">
                        <div class="flex flex-col space-y-2">
                            <input v-model="username" class="h-8 w-64 text-xs rounded-xl bg-transparent border border-neutral_color_6 text-neutral_color_1 outline-none px-2 placeholder:text-neutral_color_5 focus:border-main_color_1" type="text" placeholder="用户名">
                            <input v-model="password" class="h-8 w-64 text-xs rounded-xl bg-transparent border border-neutral_color_6 text-neutral_color_1 outline-none px-2 placeholder:text-neutral_color_5 focus:border-main_color_1" type="password" placeholder="密码">
                            <input v-model="repeatedPassword" class="h-8 w-64 text-xs rounded-xl bg-transparent border border-neutral_color_6 text-neutral_color_1 outline-none px-2 placeholder:text-neutral_color_5 focus:border-main_color_1" type="password" placeholder="确认密码">
                            <input v-model="email" class="h-8 w-64 text-xs rounded-xl bg-transparent border border-neutral_color_6 text-neutral_color_1 outline-none px-2 placeholder:text-neutral_color_5 focus:border-main_color_1" type="text" placeholder="邮箱">
                            <a @click="sendEmail" class=" pl-6 text-neutral_color_4 text-xs cursor-pointer underline hover:text-main_color_1">发送验证码至邮箱...</a>
                            <input v-model="validationCode" class="h-8 w-64 text-xs rounded-xl bg-transparent border border-neutral_color_6 text-neutral_color_1 outline-none px-2 placeholder:text-neutral_color_5 focus:border-main_color_1" type="text" placeholder="邮箱验证码">
                            <input v-model="activationCode" class="h-8 w-64 text-xs rounded-xl bg-transparent border border-neutral_color_6 text-neutral_color_1 outline-none px-2 placeholder:text-neutral_color_5 focus:border-main_color_1" type="text" placeholder="激活码">
                        </div>
                        <div class="flex items-center space-x-8">
                            <button @click="register" class="h-8 w-64 text-white text-sm bg-main_color_1 rounded-xl hover:bg-main_color_1/75">注册</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
      </div>
    </div>
</template>
  
<script>
import * as login from '@/api/login';
import { hashPassword } from '@/utils/crypto';

import Carousel from '@/components/common/Carousel.vue'
import RainbowText from '@/components/common/RainbowText.vue'

export default {
    name: 'Login',
    components: {
        Carousel,
        RainbowText
    },
    data() {
      return {
        activeIndex: 0,
        isAnimating: false,

        serviceStatus: 1,

        isLoading: false,
        loginMark: 0,

        username: "",
        password: "",
        status: true,
        repeatedPassword: "",
        email: "",
        validationCode: "",
        activationCode: "",
        mainFunctionList: [
            {
                "id": 0,
                "name": "【Graph-MD-PDF】知识管理互连应用平台",
                "color": "#f94144"
            },
            {
                "id": 1,
                "name": "【论文-主题短语】知识网络构建与分析平台",
                "color": "#f3722c"
            },
            {
                "id": 2,
                "name": "【深度学习-机器学习】数据分析全流程实验平台",
                "color": "#f8961e"
            },
        ],
        colors: [
            "#f94144",
            "#f3722c",
            "#f8961e",
            "#f9844a",
            "#f9c74f",
            "#90be6d",
            "#43aa8b",
            "#4d908e",
            "#577590",
            "#277da1"
        ]
      }
    },
    mounted() {
        document.addEventListener('click', this.handleClick)
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClick)
    },
    computed: {
      containerTransform() {
        return {
          transform: `translateY(-${this.activeIndex * 100}vh)`
        }
      }
    },
    methods: {
        switchToLogin() {
            this.serviceStatus = 1;
        },

        switchToRegister() {
            this.serviceStatus = 2;
        },

        handleClick(event) {
            // 仅在首屏且未动画时生效
            if (this.activeIndex !== 0 || this.isAnimating) return
            
            // 判断点击是否在Carousel区域内
            const carouselEl = this.$refs.carousel
            const isCarousel = carouselEl?.contains(event.target)
            
            // 非Carousel区域触发切换
            if (!isCarousel) {
                this.activeIndex = 1
                this.isAnimating = true
                setTimeout(() => this.isAnimating = false, 500)
            }
        },

        async login() {
            try {

                if (this.username == "") { 
                    this.$message.warning("用户名不能为空"); 
                    return; 
                } 

                if (this.password == "") { 
                    this.$message.warning("密码不能为空"); 
                    return; 
                }

                const resp = await login.getSaltAPI(this.username)
                const content = resp.data;

                if (!content.check) {
                    this.$message.warning(content.message);
                    return;
                }

                const salt = content.data.salt;
                const hashedPassword = hashPassword(this.password, salt);

                const resp1 = await login.loginAPI(this.username, hashedPassword);
                const content1 = resp1.data; 

                if (content1.check) {
                    localStorage.setItem("token", content1.data.token);
                    this.$router.push({path: "/desktop"}); 
                } 
                else { 

                    if (content1.code == 50001) { 
                        this.username = ""; 
                        this.password = ""; 
                    } 
                    else if (content1.code == 50002) { 
                        this.password = ""; 
                    } 

                    this.$message.warning(content1.message); 
                } 
            }
            catch (error) { 
                this.$message.error(error.message); 
            } 
        }, 

        async sendEmail() {
            try { 

                if (this.email == "") { 
                    this.$message.warning("邮箱不能为空"); 
                    return; 
                } 

                var verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,20}/; 
                if (!verify.test(this.email)) { 
                    this.$message.warning('邮箱格式错误'); 
                    return; 
                } 

                const resp = await login.sendEmailAPI(this.email);
                const content = resp.data; 

                if (content.check) { 
                    this.$message.success("邮件发送成功，请前往邮箱查看验证码"); 
                } 
                else { 
                    this.$message.warning(content.message); 
                } 
            } 
            catch (error) { 
                this.$message.error(error.message); 
            } 
        }, 

        async register() {
            try {
                
                if (this.username == "") { 
                    this.$message.warning("用户名不能为空"); 
                    return; 
                } 

                if (this.password == "" || this.repeatedPassword == "") { 
                    this.$message.warning("密码不能为空"); 
                    return; 
                } 

                if (this.email == "") { 
                    this.$message.warning("邮箱不能为空"); 
                    return; 
                } 

                if (this.validationCode == "") { 
                    this.$message.warning("邮箱验证码不能为空"); 
                    return; 
                } 

                if (this.password != this.repeatedPassword) { 
                    this.$message.warning("两次密码输入不相同"); 
                    return; 
                } 

                var verify = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[^\da-zA-Z\s]).{8,20}$/; 
                if (!verify.test(this.password)) { 
                    this.$message.warning("密码应包含字母、数字、特殊字符，至少8位，最多20位"); 
                    return; 
                } 

                var verify1 = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/; 
                if (!verify1.test(this.email)) { 
                    this.$message.warning('邮箱格式错误'); 
                    return; 
                }

                const resp = await login.getSaltAPI(this.username)
                const content = resp.data;

                if (!content.check) {
                    this.$message.warning(content.message);
                    return;
                }

                const salt = content.data.salt;
                const hashedPassword = hashPassword(this.password, salt);

                this.loginMark = this.loginMark + 1;
                this.isLoading = true;

                const resp1 = await login.registerAPI(this.username, hashedPassword, this.email, this.validationCode, salt, this.activationCode); 
                const content1 = resp1.data;

                if (content1.check) { 
                    this.$message.success("注册成功"); 
                    this.serviceStatus = 1; 

                    this.isLoading = false;
                } 
                else { 
                    this.$message.warning(content1.message); 
                } 

            } 
            catch (error) { 
                this.$message.error(error.message); 
            } 
        },

        handleWheel(event) {
        if (this.isAnimating) return

        this.isAnimating = true
        const direction = Math.sign(event.deltaY)

        if (direction > 0 && this.activeIndex < 1) {
            this.activeIndex++
        } else if (direction < 0 && this.activeIndex > 0) {
            this.activeIndex--
        }

        setTimeout(() => {
            this.isAnimating = false
        }, 500) // 与transition-duration保持一致[2](@ref)
        }
    }
}
</script>

<style scoped>
/* 穿透控制轮播图内部元素 */
::v-deep .carousel-container .absolute.inset-0 {
  height: 34rem !important; /* 对应h-64 */
}

::v-deep .carousel-container .transition-opacity {
  height: 100%;
}
</style>