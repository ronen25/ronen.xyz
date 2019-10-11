<template>
  <div id="app">
    <GithubCorner />
    <Header />

    <div class="container container-fluid">
      <Body />

      <hr />
      <Projects />

      <hr />
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
