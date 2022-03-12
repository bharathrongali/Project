<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink } from "vue-router";
import LoginBadge from './LoginBadge.vue';
const isOpen = ref(false);
</script>

<template>
  <nav class="navbar is-outlined navHeaderbg" role="navigation" aria-label="main navigation">
    <div class="container homepagebg">
      <div class="navbar-menu" :class="{ 'is-active': isOpen }">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>  
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">Tasks</a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/assignedtasks">View Tasks</router-link>
              <!-- <router-link class="navbar-item" to="/viewAllTasks">All Tasks</router-link> -->
            </div>
          </div>
          <!-- <div iv class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">More</a>
            <div class="navbar-dropdown">
              <router-link class="navbar-item" to="/about">About</router-link>
              <hr class="navbar-divider" />
              <router-link class="navbar-item" to="/contact">Report an issue</router-link>
            </div>
          </div> -->
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <login-badge />
          </div>

        </div>
      </div>
    </div>
  </nav>
</template>

<style>
.dark{
  background-color: #000000;
}
.navbar-item, .navbar-link {
  color: #FFFFFF;
}
.container .white{
  background: #FFFFFF !important;
}
.navHeaderbg{
  background: -webkit-linear-gradient(#8CA6DB, #B993D6);
  background: linear-gradient(#8CA6DB, #B993D6);
}
.window {
  margin-top: 2em;
  width: 100%;
}
</style>