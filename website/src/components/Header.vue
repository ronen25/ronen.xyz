<template>
  <header>
    <!-- JUMBOTRON FOR DISPLAYING MY NAME -->
    <b-jumbotron
      id="jumbotron"
      header="Ronen Lapushner"
      lead="Full-stack software developer based in Israel"
      :fluid="true"
      class="text-center text-break min-vh-100 d-flex flex-column justify-content-center animated"
      :header-level="headerLevel"
    >
      <br />
      <b-button
        id="btnScrollDown"
        variant="link"
        class="text-decoration-none"
        href="#navigation_bar"
      >
        <font-awesome-icon
          :icon="['fas', 'angle-down']"
          size="5x"
        ></font-awesome-icon
        >&nbsp;
        <font-awesome-icon
          :icon="['fas', 'angle-down']"
          size="5x"
        ></font-awesome-icon
        >&nbsp;
        <font-awesome-icon
          :icon="['fas', 'angle-down']"
          size="5x"
        ></font-awesome-icon>
      </b-button>
    </b-jumbotron>
  </header>
</template>

<script>
const axios = require("axios").default;

export default {
  name: "Header",
  data() {
    return {
      projectinfoVersion: "--",
      headerLevel: "3" // Default header level
    };
  },
  mounted() {
    // Calculate header level
    if (document.body.clientWidth < 400) {
      this.headerLevel = "5";
    } else {
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
      })
      .finally(function() {
      });
  }
};
</script>

<style scoped>
.jumbotron {
  font-family: "Open Sans", sans-serif;
  margin-bottom: 0px;
  background-image: url("../assets/jumbotron_background.jpg");
  background-repeat: no-repeat;
  background-position: left;
  color: rgba(20, 20, 109, 0.76);
}

#btnScrollDown {
  color: rgba(20, 20, 109, 0.76);
}

@media only screen and (max-width: 978px) {
  .jumbotron {
    background: #042d73;
    background: -webkit-linear-gradient(top left, #042d73, #2c98d2);
    background: -moz-linear-gradient(top left, #042d73, #2c98d2);
    background: linear-gradient(to bottom right, #042d73, #2c98d2);
    color: white;
  }

  #btnScrollDown {
  color: white;
}
}
</style>
