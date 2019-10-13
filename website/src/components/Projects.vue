<template>
  <!-- Projects section-->
  <section id="projects_section">
    <h1 class="text-center">Projects</h1>

    <!-- TODO: Replace this dummy text with actual stuff -->
    <div id="projectsAccordion" role="tablist">
      <ProjectItem v-bind:key="project.id" v-bind:project="project" v-for="project in projects" />
    </div>
  </section>
</template>

<script>
import ProjectItem from "./ProjectItem";

const axios = require("axios").default;

export default {
  name: "Projects",
  components: {
    ProjectItem
  },
  data() {
    return {
      projects: []
    };
  },
  mounted() {
    console.log("URL: " + process.env.VUE_APP_PROJECTINFO_PROJECTINFO_ENDPOINT)
    // Get the info from the projectinfo service
    axios
      .get(process.env.VUE_APP_PROJECTINFO_PROJECTINFO_ENDPOINT)
      .then(response => {
        console.log(response.data)
        this.projects = response.data.repos;
      })
      .catch(function(error) {
        console.log(error)
      })
      .finally(function() {
        console.log("DONE");
      });
  }
};
</script>