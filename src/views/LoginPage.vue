<template>
  <div class="container">
    <van-cell-group inset class="login-box">
      <van-row class="main title" justify="center">登录</van-row>
      <van-field class=" title" v-model="identity" is-link readonly label="身份" placeholder="请选择身份"
        @click="showPicker = true"></van-field>
      <van-field class=" title" label="账号" v-model="loginData.username" placeholder="请输入账号"></van-field>
      <van-field class=" title" label="密码" v-model="loginData.password" placeholder="请输入密码" type="password"></van-field>

      <van-row justify="center">
        <button class="login-btn title" @click="login">登录</button>
      </van-row>

      <van-row justify="end">
        <router-link class="register-btn title" to="/register">没有账号？立即注册</router-link>
      </van-row>
    </van-cell-group>

    <van-popup class="title" v-model:show="showPicker" round position="bottom">
      <van-picker :columns="columns" @cancel="showPicker = false" @confirm="onConfirm">
      </van-picker>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router';
const identity = ref("学生");
const loginData = reactive({
  username: '',
  password: '',
  role: 'CANDICATE'
})
const columns = [
  { text: '学生', value: 'CANDICATE' },
  { text: '专家', value: 'INTERVIEWER' },
]
interface pickerItem {
  text: string,
  value: string
}
const showPicker = ref(false);
const onConfirm = ({ selectedOptions }: { selectedOptions: pickerItem[] }) => {
  showPicker.value = false;
  identity.value = selectedOptions[0].text;
  loginData.role = selectedOptions[0].value;
};

const router = useRouter();
const login = function () {
  console.log("登录成功");
  if (loginData.role == 'CANDICATE') {
    router.push('/studentHome')
  }
  else if (loginData.role == 'INTERVIEWER') {
    router.push('/expertHome')
  }
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    font-size: 1rem;
  }


  .login-box {
    border: 0.1rem solid #eceff4;
    padding: 1rem;
    border-radius: 2.5rem;

    .main.title {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    .login-btn {
      margin-top: 1rem;
      font-size: 1rem;
      border-radius: 0.5rem;
      border: 0.1rem solid #c8c9cc;
      background-color: transparent;
      padding: 0.2rem 2rem;
    }

    .login-btn:active {
      background-color: #c8c9cc;
    }

    .register-btn {
      font-size: 1rem;
      color: black;
      margin-top: 1rem;
    }

  }
}
</style>
