<template>
  <section id="aboutme">
    <br />
    <div class="padded">
      <h1>About Me</h1>

      <p style="padding-top: 40px;">Hi, I'm Ronen, and welcome to my website.</p>
      <p>I am a full stack developer, interested mainly in developing backend/system software using C++, Java and Go.</p>

      <p>
        Serving in the Israeli Air Force (IAF) as a Full-stack software engineer, I discharged honorably in 2016.
        <br />I then worked at <a target="_blank" href="http://www.cyren.com">Cyren</a> as a C++ Software Engineer (and a Tech Lead, since May 2018) until January 2019.
      </p>

      <p>Currently enrolled in the Open University of Israel, studying for a BSc. in Computer Science (expected graduation Oct. 2022)</p>

      <!-- Skills -->
      <b-container fluid style="padding-top: 40px;">
        <b-row align-v="top">
          <!-- Programming languages -->
          <b-col md>
            <h4>Languages</h4>
            <ul>
              <li>C99 / C++ (11+)</li>
              <li>Java (8+)</li>
              <li>Python 3</li>
              <li>Golang</li>
              <li>Rust</li>
            </ul>
          </b-col>

          <!-- Backend -->
          <b-col md>
            <h4>Backend</h4>
            <ul>
              <li>Cross-platform development with native tools</li>
              <li>POSIX, Win32</li>
              <li>Docker, Docker Compose</li>
              <li>Kubernetes (on GKE)</li>
            </ul>
          </b-col>

          <!-- Frontend -->
          <b-col md>
            <h4>Frontend</h4>
            <ul>
              <li>
                Qt5, wxWidgets, IMGui
                <small>
                  <em>(C++)</em>
                </small>
              </li>
              <li>
                Swing
                <small>
                  <em>(Java)</em>
                </small>
              </li>
              <li>PyQt, qt-python, Tk</li>
              <li>Bootstrap, vue.js</li>
            </ul>
          </b-col>

          <!-- Utilities / Software -->
          <b-col md>
            <h4>Software</h4>
            <ul>
              <li>GCC / LLVM Toolchains</li>
              <li>Valgrind</li>
              <li>Doxygen</li>
              <li>CMake, Autotools</li>
              <li>Cargo</li>
              <li>go* tools</li>
            </ul>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </section>
</template>

<script>
export default {
  name: "Body"
};
</script>

<style scoped>
h1 {
  text-transform: uppercase;
}

h4 {
  text-transform: uppercase;
}

#aboutme {
  background-color: #434a52;
  padding-bottom: 20px;
}

.padded {
  /*padding-right: 15% !important;
  padding-left: 15% !important;
  */

  max-width: 900px;
  margin: auto;
  color: rgb(252, 252, 252);
}

a {
  color: lightblue;
}

@media only screen and (max-width: 900px) {
  .padded {
    padding-right: 5px !important;
    padding-left: 5px !important;
    max-width: unset;
    margin: unset;
  }
}
</style>