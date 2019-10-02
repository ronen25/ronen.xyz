<template>
  <div id="app">
    <GithubCorner />
    <Header />

    <div class="container container-fluid">
      <Body />
      <Projects />
      <Contact />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header'
import GithubCorner from './components/GithubCorner'
import Body from './components/Body'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Import fontawesome stuff
import("@fortawesome/fontawesome");
import("@fortawesome/fontawesome-free-solid");
import("@fortawesome/fontawesome-free-brands");

// Import bootstrap CSS and JS
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import'../node_modules/bootstrap/dist/js/bootstrap.min.js';

export default {
  name: 'app',
  components: {
    GithubCorner,
    Header,
    Body,
    Projects,
    Contact,
    Footer
  }
}
</script>

<style>
</style>
