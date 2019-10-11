<template>
  <header>
    <!-- JUMBOTRON FOR DISPLAYING MY NAME -->
    <b-jumbotron
      header="Ronen Lapushner"
      lead="Full-stack software developer based in Israel"
      v-bind:fluid="true"
      class="text-center"
    ></b-jumbotron>

    <!-- WEBPAGE NAVIGATION BAR -->
    <b-navbar v-bind:type="'dark'" v-bind:variant="'dark'">
      <b-navbar-nav v-bind:align="'center'" class="mx-auto">
        <!-- About -->
        <b-nav-item href="#about" class="text-white">
          <b>ABOUT ME</b>
        </b-nav-item>

        <!-- Skills -->
        <b-nav-item href="#skills">
          <b>SKILLS</b>
        </b-nav-item>

        <!-- Projects -->
        <b-nav-item href="#projects">
          <b>PROJECTS</b>
        </b-nav-item>

        <!-- Contact -->
        <b-nav-item href="#contact">
          <b>CONTACT</b>
        </b-nav-item>

        <!-- Github Link -->
        <b-nav-item href="https://github.com/ronen25" target="_blank" 
        title="Github Link"
        alt="GITHUB">
          <font-awesome-icon :icon="['fab', 'github']" size="lg"></font-awesome-icon>
        </b-nav-item>

        <!-- Linkedin Link -->
        <b-nav-item href="https://www.linkedin.com/in/ronen-lapushner-521966143" target="_blank" 
        title="LinkedIn Link"
        alt="LINKEDIN">
          <font-awesome-icon :icon="['fab', 'linkedin']" size="lg"></font-awesome-icon>
        </b-nav-item>

        <!-- MORE -->
        <b-nav-item-dropdown text="MORE" left>
          <b-dropdown-item href="#">About this site...</b-dropdown-item>
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-navbar>
  </header>
</template>

<script>
export default {
  name: "Header"
};
</script>