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

export default {
  name: "Projects",
  components: {
    ProjectItem
  },
  data() {
    return {
      projects: [
        {
          id: "45783y475y38745y7",
          name: "Panorama",
          tagline: "Really really long tagline here. What's the point? just for testing. Never gonna have one like this!",
          description:
            "Every project has a small description. This description, along with the other things, is fetched from the README.md.",
          topics: ["cpp", "rust", "python", "something", "clever", "which", "is", "really", "some", "buzzword", "but", "I", "guess", "that's", "how", "it", "works"],
          stars: 1000,
          forks: 400,
          screenshots: [
            {
              num: 0,
              url: "https://github.com/ronen25/panorama/raw/master/screenshots/screenshot.png"
            },
            {
              num: 1,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4"
            },
            {
              num: 2,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4"
            }
          ],
          license: "GPL-3.0"
        },
        {
          id: "ejntrjehbfu347hgt84se",
          name: "libcmdf",
          tagline: "A small library",
          description:
            "Every project has a small description. This description, along with the other things, is fetched from the README.md.",
          topics: ["c", "cpp"],
          stars: 222,
          forks: 44,
          screenshots: [
            {
              num: 0,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4"
            },
            {
              num: 1,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4"
            },
            {
              num: 2,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4"
            }
          ],
          license: "GPL-3.0"
        },
        {
          id: "fgndjn3487rhwenu",
          name: "Panorama",
          tagline: "A small Linux system monitor",
          description:
            "Every project has a small description. This description, along with the other things, is fetched from the README.md.",
          topics: ["cpp", "rust", "python"],
          stars: 1000,
          forks: 400,
          screenshots: [],
          license: ""
        }
      ]
    };
  }
};
</script>