<template style="margin: 0">
  <div class="row px-0 mx-0 centering-form">
    <div class="col-md-6 d-flex align-items-center justify-content-center mx-0 px-0" style="margin-top: 140px;">
      <div class="wrapper">
        <h5 class="text-secondary fw-semibold text-capitalize mb-1 text-center">Nice to see you!</h5>
        <h1 class="fw-semibold text-uppercase text-center mb-4">Welcome to (AppName)!</h1>
        <p class="text-center w-75 d-block mx-auto">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
          earum amet excepturi a placeat provident
          fugit
          in nesciunt tenetur eveniet sequi rerum suscipit, temporibus aliquid doloribus</p>
      </div>
    </div>
    <div class="col-md-6 mt-4">
      <div class="w-75 d-block mx-auto login-form">
        <form class="py-4 px-4 rounded-3" @submit.prevent="saveData()">
          <img class="mb-2 d-block mx-auto"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/1184px-Vue.js_Logo_2.svg.png"
            alt="" width="72" height="57" />

          <h2 class="mb-2 fw-semibold text-center">Register</h2>
          <p class="text-secondary fw-semibold mb-5 text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore
            dolorem, ut, quas omnis modi dolores, nulla eveniet doloremque quisquam sapiente saepe natus blanditiis eius
            dolor.</p>

          <div class="form-group form-floating mb-3">
            <input type="email" v-model="user.email" name="email" id="email" class="form-control" placeholder="Username"
              autofocus />
            <label for="floatingName">Email</label>
            <span class="text-danger text-left"></span>
          </div>
          <div class="form-group form-floating mb-3">
            <input type="text" v-model="user.name" name="name" id="name" class="form-control" placeholder="Email"
              autofocus />
            <label for="floatingName">Username</label>
            <span class="text-danger text-left"></span>
          </div>
          <div class="form-group form-floating mb-3">
            <input type="password" v-model="user.password" name="password" id="password" class="form-control"
              placeholder="Password" />
            <label for="floatingPassword">Password</label>
            <span class="text-danger text-left"></span>
          </div>

          <div class="form-group mb-3 float-start">
            <p class="fw-semibold text-secondary">Already have an account? <RouterLink to="/login">Login</RouterLink></p>
          </div>

          <button class="w-100 btn btn-lg btn-primary" type="submit" value="Save">Register</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script scoped>
import router from '../../router';

export default {
  data() {
    return {
      result: {},
      user: {
        name: '',
        email: '',
        password: ''
      },
      info: []
    }
  },
  created() { },
  mounted() {
    this.axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => (this.info = response))
  },
  methods: {
    saveData() {
      this.axios.post('http://127.0.0.1:8000/api/register', this.user).then(({ data }) => {
        console.log('User registered successfully!')
        router.push({ path: '/login' })
      })
    }
  }
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
</style>
