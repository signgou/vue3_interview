<template>
  <div class="container">
    <van-cell-group inset class="register-box">
      <van-row class="main title" justify="center">注册</van-row>
      <van-field class=" title" v-model="identity" is-link readonly label="身份" placeholder="请选择身份"
        @click="showPicker = true"></van-field>
      <van-field class=" title" label="账号" v-model="registerData.username" placeholder="请输入账号"></van-field>
      <van-field class=" title" label="密码" v-model="registerData.password" placeholder="请输入密码"
        type="password"></van-field>
      <van-field class=" title" label="再次确认密码" v-model="confirmPassword" placeholder="请确认密码"
        type="password"></van-field>
      <van-row justify="center">
        <button class="register-btn title" @click="onRegister">注册</button>
      </van-row>
      <van-row justify="end">
        <router-link class="back-btn title" to="/login">返回登录</router-link>
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
import { register } from '@/apis/users';
import { showSuccessToast, showFailToast } from 'vant';


const identity = ref("学生");
const confirmPassword = ref('');
const registerData = reactive({
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
  registerData.role = selectedOptions[0].value;
};

const onRegister = async function () {
  console.log('注册');
  if (registerData.password != confirmPassword.value) {
    showFailToast("两次密码不一样")
    return;
  }

  const res = await register(registerData);
  console.log(res);
  if (res.msg == 'success') {
    showSuccessToast("注册成功")
  }
  else {
    showFailToast(res.msg);
  }
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    font-size: 1rem;
  }


  .register-box {
    border: 0.1rem solid #eceff4;
    padding: 1rem;
    border-radius: 2.5rem;

    .main.title {
      font-size: 1.8rem;
      margin-bottom: 1rem;
    }

    .register-btn {
      margin-top: 1rem;
      font-size: 1rem;
      border-radius: 0.5rem;
      border: 0.1rem solid #c8c9cc;
      background-color: transparent;
      padding: 0.2rem 2rem;
    }

    .register-btn:active {
      background-color: #c8c9cc;
    }

    .back-btn {
      margin-top: 0.5rem;
      font-size: 1rem;
      color: #000;
    }

    .back-btn:active {
      color: #c8c9cc;
    }
  }
}
</style>
