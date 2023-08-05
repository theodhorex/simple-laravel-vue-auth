<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <nav class="navbar navbar-expand-lg py-4">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" aria-current="page" to="/about">About</RouterLink>
          </li>
        </ul>
        <button class="btn btn-primary ms-auto float-start fw-semibold" @click="logout()">Logout</button>
      </div>
    </div>
  </nav>
</template>


<script>
export default {
  methods: {
    logout() {
      this.$swal({
        title: 'Are you sure to logout?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#cb0c9f',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.removeItem('access_token');
          window.location.href = '/login';
        }
      });
    }
  }
}
</script>
