<template>
  <div class="card">
    <div class="card-header" v-bind:id="this.headingId">
      <div class="row">
        <h4 class="col">
          {{ project.name }}
          <small class="text-muted">{{ project.tagline }}</small>
        </h4>

        <!-- Stars -->
        <div class="col-1">
          <i class="fas fa-star"></i>
          <b>{{ project.stars }}</b>
        </div>

        <!-- Forks -->
        <div class="col-1">
          <i class="fas fa-code-branch"></i>
          <b>{{ project.forks }}</b>
        </div>

        <!-- Expand/collapse button -->
        <button
          type="button"
          class="btn"
          data-toggle="collapse"
          v-bind:data-target="this.collapseIdFormatted"
          aria-expanded="false"
          v-bind:aria-controls="this.headingId"
        >
          <i class="fas fa-angle-down"></i>
        </button>
      </div>
    </div>

    <div
      v-bind:id="this.collapseId"
      class="collapse"
      v-bind:aria-labelledby="this.headingId"
      data-parent="#projectsAccordion"
    >
      <!-- Project Item Body -->
      <div class="card-body">
        <div class="container container-fluid">
          <div :id="this.carouselId" class="carousel slide" data-ride="carousel">
            <!-- Data (i.e. the screenshots to display) -->
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

            <!-- Controls -->
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

          <hr />

          <!-- Project description -->
          <p class="text-justify">
            {{ project.description }}
          </p>

          <!-- Tags -->
            <b>Technologies: </b>
            <div class="container">
              <div class="row">
          <div v-for="tag in project.tags">
            <div class="badge badge-info">
            {{ tag }}
            </div>
            &nbsp;&nbsp;
          </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
</style>