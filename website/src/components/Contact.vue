<template>
  <section id="contact">
    <h1 class="text-center">Contact</h1>

    <b-container>
      <b-row>
        <b-col class="text-center">
          <address>
            <h3>Contact Info</h3>
            <b>Ronen Lapushner</b>
            <div>
              ronenk17
              <code>@</code>gmail
              <code>.</code>com
            </div>
            <div>Netanya, Israel</div>
          </address>
        </b-col>

        <b-col class="text-center">
          <h3>CV and Grade Sheets</h3>

          <div>
            <b>CV</b>

            <br />
            <!-- TODO: Add links to the actual files -->
            <b-button-group aria-label="buttons-cv-formats">
              <b-button variant="danger" href="#">
                <font-awesome-icon :icon="['fas', 'file-pdf']"></font-awesome-icon>&nbsp;PDF
              </b-button>
              <b-button variant="primary" href="#">
                <font-awesome-icon :icon="['fas', 'file-contract']"></font-awesome-icon>&nbsp;DOCX
              </b-button>
              <b-button variant="primary" href="#">
                <font-awesome-icon :icon="['fas', 'file-contract']"></font-awesome-icon>&nbsp;DOC
              </b-button>
              <b-button variant="info" href="#">
                <font-awesome-icon :icon="['fas', 'file-alt']"></font-awesome-icon>&nbsp;ODT
              </b-button>
            </b-button-group>
          </div>

          <br />

          <div>
            <b>Grade Sheet</b>

            <br />
            <!-- TODO: Add link here -->
            <b-button variant="danger" href="#">
              <font-awesome-icon :icon="['fas', 'file-pdf']"></font-awesome-icon>&nbsp;May 2019 Grade Sheet (PDF)
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>