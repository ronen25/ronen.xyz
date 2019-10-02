<template>
    <!-- Projects section-->
    <section id="projects_section">
        <h1 class="text-center">Projects</h1>

        <!-- TODO: Replace this dummy text with actual stuff -->
        <div id="projectsAccordion" class="accordion">
          <div class="card">
            <div class="card-header" id="card1_heading">
              <div class="container">
                <div class="row">
                  <h4 class="mb-0">Project #1</h4>

                  <button
                    type="button"
                    class="btn btn-primary"
                    data-toggle="collapse"
                    data-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >V</button>
                </div>

                <div
                  id="collapseOne"
                  class="collapse show"
                  aria-labelledby="card1_heading"
                  data-parent="#projectsAccordion"
                >
                  <div
                    class="card-body"
                  >Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>

<script>
import ProjectItem from './ProjectItem'

export default {
  name: "Projects",
}
</script>