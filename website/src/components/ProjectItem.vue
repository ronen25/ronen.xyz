<template>
  <b-card no-body class="mb-1">
    <!-- Card header -->
    <b-card-header header-tag="header" class="p-1" role="tab">
      <b-row align-v="center" class="position-relative" align-h="between">
        <!-- Project name -->
        <b-col>
          <h4>{{ project.name }}</h4>
          <span class="text-wrap text-muted">{{ project.tagline }}</span>
        </b-col>

        <b-col cols="4" md="auto" class="position-static">
          <!-- Stars -->
          <span class="d-none d-md-inline">
            <font-awesome-icon :icon="['fas', 'star']" size="lg"></font-awesome-icon>
            <b>&nbsp;{{ project.stars }}</b>
          </span>
          &nbsp;
          <!-- Forks -->
          <span class="d-none d-md-inline">
            <font-awesome-icon :icon="['fas', 'code-branch']" size="lg"></font-awesome-icon>
            <b>&nbsp;{{ project.forks }}</b>
          </span>
          &nbsp;
          <!-- Expand/collapse button (all devices, except mobile) -->
          <b-button v-b-toggle="this.collapseId" class="stretched-link d-none d-md-inline">
            <span class="when-closed">
              <font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon>
            </span>
            <span class="when-opened">
              <font-awesome-icon :icon="['fas', 'angle-up']"></font-awesome-icon>
            </span>
          </b-button>

          <!-- Expand/collapse button for mobile -->
          <b-button
            v-b-toggle="this.collapseId"
            variant="link"
            size="lg"
            class="stretched-link d-sm-inline d-md-none d-lg-none d-xl-none"
          >
            <span class="when-closed">
              <font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon>
            </span>
            <span class="when-opened">
              <font-awesome-icon :icon="['fas', 'angle-up']"></font-awesome-icon>
            </span>
          </b-button>
        </b-col>
      </b-row>
    </b-card-header>

    <!-- Card body -->
    <b-collapse v-bind:id="this.collapseId" accordion="projectsAccordion" role="tabpanel">
      <b-card-body>
        <!-- Container for stars and forks - used on Mobile only,
        since on mobile that information is not shown in the main header-->
        <b-container
          class="d-sm-block d-md-none d-lg-none d-xl-none"
        >
          <b-row align-h="center" align-v="center">
            <b-col cols="auto">
              <font-awesome-icon :icon="['fas', 'star']" size="lg"></font-awesome-icon>
              <b>&nbsp;{{ project.stars }}</b>
            </b-col>
            <!-- Forks -->
            <b-col cols="auto">
              <font-awesome-icon :icon="['fas', 'code-branch']" size="lg"></font-awesome-icon>
              <b>&nbsp;{{ project.forks }}</b>
            </b-col>
          </b-row>
        </b-container>

        <hr class="d-sm-block d-md-none d-lg-none d-xl-none"/>

        <!-- Image carousel -->
        <b-carousel
          :id="this.carouselId"
          :interval="5000"
          v-if="this.project.screenshots != 0"
          controls
          indicators
        >
          <b-carousel-slide
            v-bind:key="screenshot.num"
            v-for="screenshot in project.screenshots"
            :img-src="screenshot.url"
          ></b-carousel-slide>
        </b-carousel>

        <!-- Separator between the rest of the content and the screenshots. -->
        <hr v-if="project.screenshots.length > 0" />

        <b-container>
          <!-- Topics -->
          <b-row align-v="center">
            <b-col cols="7">
              <b>Topics:&nbsp;</b>
              <span v-for="tag in project.topics">
                <span class="badge badge-info">{{ tag }}</span>&nbsp;&nbsp;
              </span>
            </b-col>

            <!-- License information -->
            <b-col cols="3">
              <b class="d-none d-md-inline" v-if="this.project.license != ''">License:&nbsp;</b>
              <span>{{ project.license }}</span>
            </b-col>

            <!-- Github repo link -->
            <b-col cols="2">
              <b-button variant="primary" size="sm" :href="project.url">
                <font-awesome-icon :icon="['fab', 'github']"></font-awesome-icon>
                <span class="d-none d-lg-inline">&nbsp;Github Link</span>
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-card-body>
    </b-collapse>
  </b-card>
</template>

<script>
export default {
  name: "ProjectItem",
  props: ["project"],
  created() {
    // Register properties
    this.collapseId = "collapse_" + this.project.id;
    this.collapseIdFormatted = "#" + this.collapseId;
    this.headingId = "heading_" + this.project.id;
    this.carouselId = "carousel_" + this.project.id;
    this.carouselIdFormatted = "#carousel_" + this.project.id;
  }
};
</script>

<style scoped>
.collapsed > .when-opened,
:not(.collapsed) > .when-closed {
  display: none;
}
</style>