<template>
  <div id="app">
    <!-- Navbar + Router stuff -->
    <Navbar />
    <router-view />

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
