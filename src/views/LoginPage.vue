<template>
  <div class="container">
    <van-cell-group inset class="login-box">
      <van-row class="main title" justify="center">登录</van-row>
      <van-field class=" title" v-model="identity" is-link readonly label="身份" placeholder="请选择身份"
        @click="showPicker = true"></van-field>
      <van-field class=" title" label="账号" v-model="loginData.username" placeholder="请输入账号"></van-field>
      <van-field class=" title" label="密码" v-model="loginData.password" placeholder="请输入密码" type="password"
        @keyup.enter="onLogin"></van-field>

      <van-row justify="center">
        <button class="login-btn title" @click="onLogin">登录</button>
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

  <!-- 开发阶段用于授权浏览器给不安全证书放行 -->
  <a ref="auth" style="display: none;"></a>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import useStudentStore from '@/store/modules/student';
import useExpertStore from '@/store/modules/expert';
import { login } from '@/apis/users';
import { showConfirmDialog, showFailToast, showSuccessToast, showToast } from 'vant';

const auth = ref<HTMLAnchorElement>();
onMounted(() => {
  //检测是否信任网站
  const { DEV } = import.meta.env;
  if (DEV && localStorage.getItem('isAuth') != 'true') {
    showConfirmDialog({
      title: '温馨提醒',
      message:
        '开发环境中使用了自签证书，需要浏览器信任，故请在确认后，信任在新窗口弹出的两个网站，否则无法使用相应功能\n(浏览器可能会阻止弹出多个窗口，请授权后刷新)\n(信任的具体操作：高级->继续前往 "xxx .com" ;若可以正常打开即已信任，回到登录界面即可)',
      messageAlign: 'left'
    })
      .then(() => {
        if (auth.value) {
          auth.value.target = '_blank';
          const {
            VITE_APP_BASE_API: api_url,
            VITE_APP_SOCKET_URL: socket_url
          } = import.meta.env;
          auth.value.href = socket_url;
          auth.value.click();
          auth.value.href = api_url;
          auth.value.click();
        }
      })
      .catch(() => {
        showToast('T_T\n再次刷新可以去信任');
      })
  }
})

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
const route = useRoute();
const onLogin = async function () {
  try {
    const res = await login(loginData);
    if (res.msg == 'success') {
      showSuccessToast("登录成功")
      if (loginData.role == 'CANDICATE') {
        const student = useStudentStore();

        student.data.username = loginData.username;
        sessionStorage.setItem('data', JSON.stringify(student.data));
        sessionStorage.setItem('store', 'student');

        if (route.query.redirect) {
          router.push(route.query.redirect as string);
        }
        else router.push('/studentHome')

      }
      else if (loginData.role == 'INTERVIEWER') {
        const expert = useExpertStore();
        expert.data.username = loginData.username;

        if (route.query.redirect) {
          router.push(route.query.redirect as string);
        }
        else router.push('/expertHome')
        sessionStorage.setItem('data', JSON.stringify(expert.data));
        sessionStorage.setItem('store', 'expert');
      }
      localStorage.setItem('isAuth', 'true');
      sessionStorage.setItem('isAuthenticated', JSON.stringify(true));

    }
    else {
      showFailToast(res.msg);
    }
  }
  catch (err) {
    console.error(err);
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
