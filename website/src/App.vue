<template>
  <div id="app">
    <!-- Router stuff -->
    <div id="nav">
      <Navbar />
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>

    <Contact />
    <Footer />
  </div>
</template>

<script>

import Contact from './components/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

export default {
  name: "app",
  components: {
    Contact,
    Footer,
    Navbar
  }
}
</script>

<style>
html {
  scroll-behavior: smooth;
}

body {
  background: #fdfdfd !important;
  font-family: 'Lato', sans-serif !important;
}
</style>
