<template>
  <!-- Projects section-->
  <section id="projects_section">
    <h1 class="text-center">Projects</h1>

    <!-- TODO: Replace this dummy text with actual stuff -->
    <div id="projectsAccordion" class="accordion">
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
          tagline: "A small Linux system monitor",
          description: "Every project has a small description. This description, along with the other things, is fetched from the README.md.",
          tags: ["cpp", "rust", "python"],
          stars: 1000,
          forks: 400,
          screenshots: [
            {
              num: 0,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4",
            },
            {
              num: 1,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4",
            },
            {
              num: 2,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4",
            },
          ]
        },
        {
          id: "ejntrjehbfu347hgt84se",
          name: "libcmdf",
          tagline: "A small library",
          description: "Every project has a small description. This description, along with the other things, is fetched from the README.md.",
          tags: ["c", "cpp"],
          stars: 222,
          forks: 44,
          screenshots: [
            {
              num: 0,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4",
            },
            {
              num: 1,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4",
            },
            {
              num: 2,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4",
            },
          ]
        },
        {
          id: "fgndjn3487rhwenu",
          name: "Panorama",
          tagline: "A small Linux system monitor",
          description: "Every project has a small description. This description, along with the other things, is fetched from the README.md.",
          tags: ["cpp", "rust", "python"],
          stars: 1000,
          forks: 400,
          screenshots: [
            {
              num: 0,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4",
            },
            {
              num: 1,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4",
            },
            {
              num: 2,
              url: "https://avatars3.githubusercontent.com/u/13414?s=400&v=4",
            },
          ]
        }
      ]
    };
  }
};
</script>