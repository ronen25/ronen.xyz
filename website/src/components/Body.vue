<template>
  <div class="website_main_body">
    <!-- About Me section-->
    <section id="aboutme">
      <br />
      <p class="lead text-center">Hi, I'm Ronen, and welcome to my website.</p>

      <div class="text-md-center">
        <p>I am a full stack developer, interested mainly in developing backend/system software using C++, Java, Rust or Go.</p>

        <p>
          I served in the Israeli Air Force as a C/C++/Java/C# full-stack developer, discharging honorably in 2016.
          <br />I then worked at Cyren as a C++ Software Engineer (and a Tech Lead, since May 2018) until January 2019.
        </p>

        <p>Currently enrolled in the Open University of Israel, studying for a BSc. in Computer Science (expected graduation Jan. 2023)</p>
      </div>
    </section>

    <!-- Skills section-->
    <hr />

    <section id="skills">
      <h1 class="text-center">Skills</h1>

      <SkillCard title="Programming Languages" color="#3734eb" colorOrder="0">
        <b-card-text>
          <ul>
            <li>C99 / C++ (03, 14+)</li>
            <li>Java (8+)</li>
            <li>Python 3</li>
            <li>Golang</li>
            <li>Rust</li>
            <li>QML (Qt 5+)</li>
            <li>ES6</li>
          </ul>
        </b-card-text>
      </SkillCard>

      <SkillCard title="Backend" color="#3462eb" colorOrder="0">
        <b-card-text>
          <p>
            Most of my experience comes from maintaining and developing cross-platform
            apps, most of them backend infrastructure.
          </p>
          <ul>
            <li>Cross-platform development with native tools</li>
            <li>POSIX, Win32, COM</li>
            <li>Docker, Docker Compose</li>
          </ul>
        </b-card-text>
      </SkillCard>

      <SkillCard title="Frontend" color="#3480eb" colorOrder="0">
        <b-card-text>
          <p>I have experience both with desktop and web UI frameworks:</p>
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
        </b-card-text>
      </SkillCard>

      <SkillCard title="Utilities / Software" color="#34a2eb" colorOrder="0">
        <b-card-text>
          <ul>
            <li>GCC / LLVM Toolchains</li>
            <li>Valgrind</li>
            <li>Doxygen</li>
            <li>CMake, Autotools</li>
            <li>Cargo</li>
            <li>go* tools</li>
          </ul>
        </b-card-text>
      </SkillCard>
    </section>
  </div>
</template>

<script>
import SkillCard from "./SkillCard";

export default {
  name: "Body",
  components: {
    SkillCard
  }
};
</script>

<style scoped>
</style>