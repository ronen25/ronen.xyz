<template>
  <section id="contact">
    <h1 class="text-center">Contact</h1>

    <div class="container">
      <div class="row">
        <address id="contactcard" class="col text-center">
          <h3>Contact Info</h3>
          <b>Ronen Lapushner</b>
          <div>
            ronenk17
            <code>@</code>gmail
            <code>.</code>com
          </div>
          <div>Netanya, Israel</div>
        </address>

        <div id="cv_section" class="col text-center">
          <h3>CV and Grade Sheets</h3>

          <div>
            <b>CV</b>

            <br />
            <!-- TODO -->
            <div class="btn-group" role="group" aria-label="buttons-cv-formats">
              <a class="btn btn-primary btn-danger disabled" href="#">
                <font-awesome-icon :icon="['fas', 'file-pdf']"></font-awesome-icon> PDF
              </a>
              <a class="btn btn-primary disabled" href="#">
                <font-awesome-icon :icon="['fas', 'file-contract']"></font-awesome-icon> DOCX
              </a>
              <a class="btn btn-primary disabled" href="#">
                <font-awesome-icon :icon="['fas', 'file-contract']"></font-awesome-icon> DOC
              </a>
              <a class="btn btn-primary btn-info disabled" href="#">
                <font-awesome-icon :icon="['fas', 'file-alt']"></font-awesome-icon> ODT
              </a>
            </div>
          </div>

          <br />

          <div>
            <b>Grade Sheet</b>

            <br />
            <!-- TODO -->
            <a class="btn btn-primary btn-danger disabled" href="#">
              <font-awesome-icon :icon="['fas', 'file-pdf']"></font-awesome-icon> May 2019 Grade Sheet (PDF)
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>