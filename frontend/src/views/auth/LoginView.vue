<template>
  <div class="row mx-0 px-0 centering-form">
    <div class="col-md-6 d-flex align-items-center justify-content-center mx-0 px-0" style="margin-top: 70px;">
      <div class="wrapper">
        <h5 class="text-secondary fw-semibold text-capitalize mb-1 text-center">Nice to see you again!</h5>
        <h1 class="fw-semibold text-uppercase text-center mb-4">Welcome back Chief!</h1>
        <p class="text-center w-75 d-block mx-auto">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          earum amet excepturi a placeat provident
          fugit
          in nesciunt tenetur eveniet sequi rerum suscipit, temporibus aliquid doloribus</p>
      </div>
    </div>
    <div class="col-md-6 mx-0 px-0 mt-4">
      <div class="w-75 d-block mx-auto login-form">
        <form class="p-4 rounded-3" @submit.prevent="loginData()">
          <input type="hidden" name="_token" value="{{ csrf_token() }}" />
          <img class="mb-2 d-block mx-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png"
            alt="" width="72" height="57" />

          <h2 class="mb-2 fw-semibold text-center">Login</h2>
          <p class="text-secondary fw-semibold mb-5 text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Inventore
            dolorem, ut, quas omnis modi dolores, nulla eveniet doloremque quisquam sapiente saepe natus blanditiis eius
            dolor.</p>
          <p class="fw-semibold text-danger mx-2 mb-2">{{ invalidMessage }}</p>
          <div class="form-group form-floating mb-3">
            <input type="email" class="form-control" v-model="user.email" name="email" id="email" placeholder="Username"
              autofocus />
            <label for="floatingName">Email</label>
            <span class="text-danger text-left"></span>
          </div>

          <div class="form-group form-floating mb-3">
            <input type="password" class="form-control" v-model="user.password" name="password" id="password"
              placeholder="Password" />
            <label for="floatingPassword">Password</label>
            <span class="text-danger text-left"></span>
          </div>

          <div class="form-group mb-3 float-start">
            <p class="fw-semibold text-secondary">Don't have account? <RouterLink to="/register">Register</RouterLink>
            </p>
          </div>

          <button class="w-100 btn btn-lg btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  data() {
    return {
      result: {},
      user: {
        email: '',
        password: ''
      },
      info: [],
      invalidMessage: ''
    };
  },
  created() { },
  mounted() {
    this.axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response));
    const authToken = localStorage.getItem('access_token');
    if (authToken) {
      this.$router.push({ path: '/' });
    }
  },
  methods: {
    loginData() {
      this.axios.post('http://127.0.0.1:8000/api/login', this.user).then(({ data }) => {
        if (data.status == false) {
          return this.invalidMessage = 'Invalid email or password.'
        }

        console.log('User login successfully!');
        const token = data.access_token;
        localStorage.setItem('access_token', token);
        window.location.href = '/';
      });
    }
  },
  components: { RouterLink }
}
</script>

<style scoped>
.centering-form {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 100%;
}

@media (min-width: 992px) {
  .wrapper {
    max-width: 700px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
