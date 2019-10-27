<template>
  <header>
    <!-- JUMBOTRON FOR DISPLAYING MY NAME -->
    <b-jumbotron
      id="jumbotron"
      header="Ronen Lapushner"
      lead="Full-stack software developer based in Israel"
      :fluid="true"
      class="text-center text-light text-break min-vh-100 d-flex flex-column justify-content-center animated"
      :header-level="headerLevel"
    >
      <br />
      <b-button variant="link" class="text-light text-decoration-none" href="#navigation_bar">
        <font-awesome-icon :icon="['fas', 'angle-down']" size="5x"></font-awesome-icon>&nbsp;
        <font-awesome-icon :icon="['fas', 'angle-down']" size="5x"></font-awesome-icon>&nbsp;
        <font-awesome-icon :icon="['fas', 'angle-down']" size="5x"></font-awesome-icon>
      </b-button>
    </b-jumbotron>

    <!-- WEBPAGE NAVIGATION BAR -->
    <b-navbar id="navigation_bar" type="dark" variant="dark" toggleable="lg">
      <b-navbar-brand
        class="d-sm-inline d-md-none d-lg-none d-xl-none"
        href="#navigation_bar"
      >ronen.xyz</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav align="center" class="mx-auto">
          <!-- About -->
          <b-nav-item href="#aboutme" class="text-white">
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
          <b-nav-item
            href="https://github.com/ronen25"
            target="_blank"
            title="Github Link"
            alt="GITHUB"
          >
            <div>
              <font-awesome-icon :icon="['fab', 'github']" size="lg"></font-awesome-icon>
              <span class="d-sm-inline d-md-none d-lg-none d-xl-inline">
                <b>&nbsp;GITHUB</b>
              </span>
            </div>
          </b-nav-item>

          <!-- Linkedin Link -->
          <b-nav-item
            href="https://www.linkedin.com/in/ronen-lapushner-521966143"
            target="_blank"
            title="LinkedIn Link"
            alt="LINKEDIN"
          >
            <div>
              <font-awesome-icon :icon="['fab', 'linkedin']" size="lg"></font-awesome-icon>
              <span class="d-sm-inline d-md-none d-lg-none d-xl-inline">
                <b>&nbsp;LINKEDIN</b>
              </span>
            </div>
          </b-nav-item>

          <!-- MORE -->
          <div>
            <b-nav-item-dropdown text="MORE" left @click="showModal=true">
              <b-dropdown-item v-b-modal.modal-center>
                About this site...
                <!-- ABOUT MODAL -->
                <b-modal id="modal-center" centered title="About ronen.xyz" v-model="showModal">
                  <p>
                    This website was designed to be fast and simplistic.
                    No point in doing fancy animations, since I'm not that
                    much into frontend anyways ;-)
                  </p>

                  <b>Versions:</b>
                  <br />

                  <ul>
                    <li>Vue.js: {{ this.vueVersion }}</li>
                    <li>Website: {{ this.websiteVersion }}</li>
                    <li>ProjectInfo: {{ this.projectinfoVersion }}</li>
                  </ul>

                  <template v-slot:modal-footer>
                    <div class="w-100">
                      <b-button variant="primary" class="float-right" @click="showModal=false">Close</b-button>
                    </div>
                  </template>
                </b-modal>
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
import Vue from "vue";

const axios = require("axios").default;

export default {
  name: "Header",
  data() {
    return {
      showModal: false,
      vueVersion: Vue.version,
      websiteVersion: process.env.VUE_APP_VERSION,
      projectinfoVersion: "--",
      headerLevel: "3" // Default header level
    };
  },
  mounted() {
    // Calculate header level
    if (document.body.clientWidth < 400) {
      this.headerLevel = "5";
    }
    else {
      this.headerLevel = "3";
    }

    // Get projectinfo version
    axios
      .get(process.env.VUE_APP_PROJECTINFO_VERSION_ENDPOINT)
      .then(response => {
        // Store repo data
        this.projectinfoVersion = response.data.version;
      })
      .catch(function(error) {
        console.error(error);
      })
      .finally(function() {
        console.debug("Done.")
      });
  }
};
</script>

<style scoped>
.jumbotron {
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0px;
  background: #042d73;
  background: -webkit-linear-gradient(top left, #042d73, #2c98d2);
  background: -moz-linear-gradient(top left, #042d73, #2c98d2);
  background: linear-gradient(to bottom right, #042d73, #2c98d2);
}
</style>