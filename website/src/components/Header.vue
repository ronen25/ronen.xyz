<template>
  <header>
    <!-- JUMBOTRON FOR DISPLAYING MY NAME -->
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-3 text-center">RONEN LAPUSHNER</h1>
        <p class="lead text-center">Full-stack software developer based in Israel</p>
      </div>
    </div>

    <!-- WEBPAGE NAVIGATION BAR -->
    <nav>
      <div class="navbar navbar-expand-lg navbar-dark bg-dark" role="navigation">
        <ul class="navbar-nav mx-auto">
          <!-- About Me -->
          <li class="nav-item active">
            <a href="#" alt class="nav-link text-light text-uppercase font-weight-bold">About Me</a>
          </li>

          <!-- Skills -->
          <li class="nav-item active">
            <a href="#" alt class="nav-link text-light text-uppercase font-weight-bold">Skills</a>
          </li>

          <!-- Projects -->
          <li class="nav-item active">
            <a
              href="#projects"
              alt
              class="nav-link text-light text-uppercase font-weight-bold"
            >Projects</a>
          </li>

          <!-- Projects -->
          <li class="nav-item active">
            <a
              href="#contact"
              alt
              class="nav-link text-light text-uppercase font-weight-bold"
            >Contact</a>
          </li>

          <!-- Github link -->
          <li class="nav-item active">
            <a
              href="https://github.com/ronen25"
              id="link_github"
              class="nav-link"
              alt="Github Profile Link"
              title="Github Profile Link"
              target="_blank"
            >
              <!-- <i class="fab fa-lg fa-github-square"></i> -->
              <font-awesome-icon :icon="['fab', 'github']" size="lg"></font-awesome-icon>
            </a>
          </li>

          <!-- Linkedin link -->
          <li class="nav-item active">
            <a
              href="https://www.linkedin.com/in/ronen-lapushner-521966143"
              id="link_linkedin"
              class="nav-link"
              alt="Linkedin Profile Link"
              title="Linkedin Profile Link"
              target="_blank"
            >
            <font-awesome-icon :icon="['fab', 'linkedin']" size="lg"></font-awesome-icon>
            </a>
          </li>

          <!-- More -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle disabled text-uppercase font-weight-bold"
              href="#"
              id="navbarDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >More</a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">Action</a>
              <a class="dropdown-item" href="#">Another action</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: "Header"
}
</script>