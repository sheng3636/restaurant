<template>
    <div class="login-container">
        <!-- <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form flex-container"
            auto-complete="on"
            label-position="left"
        > -->
        <!-- <div class="title-container">
                <h3 class="title">慧用餐核销系统</h3>
            </div>

            

            <el-button
                :loading="loading"
                type="primary"
                style="width: 100%; margin-bottom: 30px"
                @click.native.prevent="handleLogin"
                >登录</el-button
            > -->
        <div class="login-form flex-container">
            <div class="form-left x-flex-a">
                <div class="form-title flex-container t-c">
                    <div class="title-icon m-r-25">
                        <img src="../../assets/images/logo.png" alt="" />
                    </div>
                    <div class="f-40 f-B">慧用餐系统</div>
                </div>
                <div class="login-form-bd">
                    <el-form
                        ref="loginForm"
                        :model="loginForm"
                        :rules="loginRules"
                        class=""
                        auto-complete="on"
                        label-position="left"
                    >
                        <el-form-item prop="username">
                            <span class="svg-container">
                                <svg-icon icon-class="user" />
                            </span>
                            <el-input
                                ref="username"
                                v-model="loginForm.username"
                                placeholder="用户名"
                                name="username"
                                type="text"
                                tabindex="1"
                                auto-complete="on"
                            />
                        </el-form-item>

                        <el-form-item prop="password">
                            <span class="svg-container">
                                <svg-icon icon-class="password" />
                            </span>
                            <el-input
                                :key="passwordType"
                                ref="password"
                                v-model="loginForm.password"
                                :type="passwordType"
                                placeholder="密码"
                                name="password"
                                tabindex="2"
                                auto-complete="on"
                            />
                            <span class="show-pwd" @click="showPwdFn">
                                <svg-icon
                                    :icon-class="
                                        passwordType === 'password'
                                            ? 'eye'
                                            : 'eye-open'"
                                />
                            </span>
                        </el-form-item>
                        <div class="verifyCodeWrap">
                                <el-form-item prop="verifyCode">
                                    <span class="svg-container">
                                        <svg-icon icon-class="verifyCode" />
                                    </span>
                                    <el-input
                                        ref="verifyCode"
                                        v-model="loginForm.verifyCode"
                                        placeholder="验证码"
                                        @keyup.enter.native="handleLogin"
                                        name="username"
                                        type="text"
                                        tabindex="3"
                                        auto-complete="on"
                                    />
                                </el-form-item>
                            <img
                                :src="verifyCodeImgUrl"
                                @click="refreshCode"
                                alt="验证码"
                            />
                            </div>
                    </el-form>
                </div>
                <div class="login-btn c-fff f-28 t-c" @click="handleLogin">登录</div>
            </div>
            <div class="form-right"></div>
        </div>
    </div>
</template>

<script>
import { getVerifyCode, resultServlet } from '@/api/user'
import uuidv1 from 'uuid/v1'

export default {
    name: 'Login',
    data() {
        return {
            verifyCodeImgUrl: '', // 验证码url
            loginForm: {
                // 登录表单
                username: 'superadmin',
                password: 'ncjy123456',
                verifyCode: '',
                u: '',
            },
            loginRules: {
                // 登录验证
                username: [
                    {
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur',
                    },
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ],
                verifyCode: [
                    {
                        required: true,
                        message: '请输入验证码',
                        trigger: 'blur',
                    },
                ],
            },
            loading: false,
            passwordType: 'password',
            redirect: undefined,
        }
    },
    watch: {
        $route: {
            handler: function (route) {
                this.redirect = route.query && route.query.redirect
            },
            immediate: true,
        },
    },
    mounted() {
        this.refreshCode()
    },
    methods: {
        // 刷新验证码
        refreshCode() {
            console.log(process.env.VUE_APP_BASE_API)
            this.loginForm.u = uuidv1()
            this.verifyCodeImgUrl =
                process.env.VUE_APP_BASE_API +
                'verifyCodeServlet?u=' +
                this.loginForm.u
            // this.verifyCodeImgUrl = 'http://localhost:8083/prod-api/verifyCodeServlet?u='+this.loginForm.u
        },
        // 是否显示密码
        showPwdFn() {
            if (this.passwordType === 'password') {
                this.passwordType = ''
            } else {
                this.passwordType = 'password'
            }
            this.$nextTick(() => {
                this.$refs.password.focus()
            })
        },
        // 登录操作
        handleLogin() {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.$store
                        .dispatch('user/login', this.loginForm)
                        .then(() => {
                            this.$router.push({ path: this.redirect || '/' })
                            this.loading = false
                        })
                        .catch(() => {
                            this.loading = false
                        })
                } else {
                    console.log('提交错误')
                    return false
                }
            })
        },
    },
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
        color: $cursor;
    }
}

/* 重置element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;

        input {
            background: transparent;
            border: 0px;
            -webkit-appearance: none;
            border-radius: 0px;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            caret-color: $cursor;
			color: #000;

            &:-webkit-autofill {
                box-shadow: 0 0 0px 1000px transparent inset !important;
                -webkit-text-fill-color: $cursor !important;
            }
        }
    }

    .el-form-item {
		border-bottom: 2px solid #eee;
		margin-bottom: 2vh;

       
    }
}
</style>

<style lang="scss" scoped>
$bg: #076dea;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;
    position: relative;

    .login-form {
        background-color: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 80vw;
        max-width: 1528px;
        min-width: 1280px;
        height: 80vh;
        max-height: 862px;
        min-width: 400px;
        overflow: hidden;
        .form-left {
            padding: 7.5vh 5.5vw;
            height: 100%;
            min-width: 515px;
            .title-icon {
                width: 68px;
                height: 66px;
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .login-form-bd {
				padding-top: 13vh;
            }
            .login-btn {
                width: 100%;
                height: 66px;
                background: #076dea;
                border: 1px solid #1a72fe;
                border-radius: 33px;
                cursor: pointer;
				line-height: 66px;
				color: #fff;
				letter-spacing: 2px;
				margin-top: 11vh;
            }
        }
        .form-right {
            width: 57%;
            background: url('../../assets/images/bg.png') no-repeat center;
            background-size: cover;
            // background-color: red;
            height: 100%;
        }
    }

    .svg-container {
        padding: 6px 5px 6px 0;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
    }

    .title-container {
        position: relative;

        .title {
            font-size: 26px;
            color: $light_gray;
            margin: 0px auto 40px auto;
            text-align: center;
            font-weight: bold;
        }
    }

    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none;
    }
}
.verifyCodeWrap {
    // display: flex;
    // justify-content: space-between;
	position: relative;
    img {
        margin-top: 10px;
        width: 80px;
        height: 30px;
		position: absolute;
		top: 0;
		right: 0;
    }
}
</style>
