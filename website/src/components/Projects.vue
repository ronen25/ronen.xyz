<template>
  <!-- Projects section-->
  <section id="projects">
    <h1 class="text-center">Projects</h1>

    <!-- Spinner that is shown while projects are loading -->
    <div class="d-flex justify-content-center mb-3" v-if="projects.length == 0">
      <b-spinner style="width: 3rem; height: 3rem;" label="Loading project info..."></b-spinner>
    </div>

    <!-- Actual project data -->
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
      projects: [],

      // TODO: Reserved for future use, currently not implemented
      // in projectinfo and as such, not implemented in the site.
      totalRepos: -1,
      totalStars: -1,
      totalForks: -1
    };
  },
  mounted() {
    // Get the info from the projectinfo service
    axios
      .get(process.env.VUE_APP_PROJECTINFO_PROJECTINFO_ENDPOINT)
      .then(response => {
        // Store repo data
        this.projects = response.data.repos;
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