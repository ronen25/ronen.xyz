<template>
  <div class="website_main_body">
    <!-- About Me section-->
    <section id="aboutme">
      <p class="lead text-center">Hi, I'm Ronen, and welcome to my website.</p>

      <div class="text-lg-center">
        <p>I am a full stack developer, interested mainly in developing backend/system software using C++, Java, Rust or Go.</p>

        <p>
          I served in the Israeli Air Force as a C/C++/Java/C# full-stack developer, discharging honorably in 2016.
          <br />I then worked at Cyren as a C++ Software Engineer (and a Tech Lead, since May 2018) until January 2019.
        </p>

        <p>I am currently enrolled in the Open University of Israel, studying for a BSc. in Computer Science.</p>
      </div>
    </section>

    <!-- Skills section-->
    <hr />
    <section id="skills_section">
      <h1 class="text-center">Skills</h1>

      <div id="skilltable" class="container">
        <div class="row">
          <div id="skilltable_frontend" class="col-sm-3">
            <h3 class="text-center">Frontend</h3>
            <ul>
              <li>Qt5, wxWidgets</li>
              <li>Swing</li>
              <li>PyQt, qt-python, Tk</li>
              <li>Bootstrap, React, vue.js</li>
            </ul>
          </div>

          <div id="skilltable_backend" class="col-sm-3">
            <h3 class="text-center">Backend</h3>
            <ul>
              <li>Cross-platform development with native tools</li>
              <li>POSIX, Win32, COM</li>
              <li>Docker, k8s</li>
            </ul>
          </div>

          <div id="skilltable_languages" class="col-sm-3">
            <h3 class="text-center">Languages</h3>
            <ul>
              <li>C99 / C++ (03, 14+)</li>
              <li>Java (8+)</li>
              <li>Python 3</li>
              <li>Golang</li>
              <li>Rust</li>
              <li>QML (Qt 5+)</li>
              <li>ES6, Typescript</li>
            </ul>
          </div>

          <div id="skilltable_software" class="col-sm-3">
            <h3 class="text-center">Software/Tools</h3>
            <ul>
              <li>GCC / LLVM Toolchains</li>
              <li>Valgrind</li>
              <li>Doxygen</li>
              <li>CMake, Autotools</li>
              <li>Delve</li>
              <li>Cargo, rustfmt</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Body"
};
</script>