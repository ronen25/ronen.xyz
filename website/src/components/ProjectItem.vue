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
          <b-button v-b-toggle="this.collapseId" variant="link" size="lg" class="stretched-link d-none d-sm-inline d-md-none d-lg-none d-xl-none">
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
        <b>TESTING</b>
      </b-card-body>
    </b-collapse>
  </b-card>
  <!--
  <div class="card">
    <div class="card-header" v-bind:id="this.headingId" style="position: relative;">
      <div class="row">
        <h4 class="col">
          {{ project.name }}
          <small class="text-muted">{{ project.tagline }}</small>
        </h4>

        <div class="col-1">
          <font-awesome-icon :icon="['fas', 'star']"></font-awesome-icon>
          <b>{{ project.stars }}</b>
        </div>

        <div class="col-1">
          <font-awesome-icon :icon="['fas', 'code-branch']"></font-awesome-icon>
          <b>{{ project.forks }}</b>
        </div>

        <button
          type="button"
          class="btn stretched-link"
          data-toggle="collapse"
          v-bind:data-target="this.collapseIdFormatted"
          aria-expanded="false"
          v-bind:aria-controls="this.headingId"
        >
          <font-awesome-icon :icon="['fas', 'angle-down']"></font-awesome-icon>
        </button>
      </div>
    </div>

    <div
      v-bind:id="this.collapseId"
      class="collapse"
      v-bind:aria-labelledby="this.headingId"
      data-parent="#projectsAccordion"
    >
      <div class="card-body" style>
        <div class="container container-fluid">
          <div :id="this.carouselId" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div
                class="carousel-item"
                v-bind:key="screenshot.num"
                v-for="screenshot in project.screenshots"
                :class="{ active: screenshot.num == 0 }"
              >
                <img :src="screenshot.url" class="d-block col" alt="..." />
              </div>
            </div>

            <a
              class="carousel-control-prev"
              v-bind:href="this.carouselIdFormatted"
              role="button"
              data-slide="prev"
            >
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              v-bind:href="this.carouselIdFormatted"
              role="button"
              data-slide="next"
            >
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>

          <hr v-if="project.screenshots.length > 0"/>

          <div class="row">
            <b>Topics:</b>
            <div v-for="tag in project.topics">
              <div class="badge badge-info">{{ tag }}</div>&nbsp;&nbsp;
            </div>
          </div>

          <div class="row">
            <div class="col-sm-4" v-if="project.license !== ''">
              <b>License:</b>
              <span>{{ project.license }}</span>
            </div>

            <div class="col-sm-8"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  -->
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