<template>
    <!-- WEBPAGE NAVIGATION BAR -->
    <b-navbar id="navigation_bar" type="dark" variant="dark" toggleable="lg"
    fixed="top" :sticky="true">
      <b-navbar-brand
        class="d-sm-inline d-md-none d-lg-none d-xl-none"
        href="#navigation_bar"
        >ronen.xyz</b-navbar-brand
      >

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav align="center" class="mx-auto">
          <!-- About -->
          <b-navbar-brand to="/" type="light">
            <b>Ronen Lapushner</b>
          </b-navbar-brand>

          <!-- Skills -->
          <b-nav-item to="software">
            SOFTWARE
          </b-nav-item>

          <!-- Projects -->
          <b-nav-item to="projects">
            PROJECTS
          </b-nav-item>

          <!-- Contact -->
          <b-nav-item to="contact">
            CONTACT
          </b-nav-item>

          <!-- Github Link -->
          <b-nav-item
            href="https://github.com/ronen25"
            target="_blank"
            title="Github Link"
            alt="GITHUB"
          >
            <div>
              <font-awesome-icon
                :icon="['fab', 'github']"
                size="lg"
              ></font-awesome-icon>
              <span class="d-sm-inline d-md-none d-lg-none d-xl-inline">
                &nbsp;GITHUB&nbsp;
              </span>
              <span>
                <font-awesome-icon
                :icon="['fas', 'external-link-square-alt']"
                size="xs"
              ></font-awesome-icon>
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
              <font-awesome-icon
                :icon="['fab', 'linkedin']"
                size="lg"
              ></font-awesome-icon>
              <span class="d-sm-inline d-md-none d-lg-none d-xl-inline">
                &nbsp;LINKEDIN&nbsp;
              </span>
              <span>
                <font-awesome-icon
                :icon="['fas', 'external-link-square-alt']"
                size="xs"
              ></font-awesome-icon>
              </span>
            </div>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</template>

<script>
export default {
    name: "Navbar",
}
</script>