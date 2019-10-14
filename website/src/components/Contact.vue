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
              <b-button
                variant="danger"
                :href="cv_pdf_path"
                v-bind:class="{ disabled: cv_pdf_path == null || cv_pdf_path == '' }"
              >
                <font-awesome-icon :icon="['fas', 'file-pdf']"></font-awesome-icon>&nbsp;PDF
              </b-button>
              <b-button
                variant="primary"
                :href="cv_docx_path"
                v-bind:class="{ disabled: cv_docx_path == null || cv_docx_path == '' }"
              >
                <font-awesome-icon :icon="['fas', 'file-contract']"></font-awesome-icon>&nbsp;DOCX
              </b-button>
              <b-button
                variant="primary"
                :href="cv_doc_path"
                v-bind:class="{ disabled: cv_doc_path == null || cv_doc_path == '' }"
              >
                <font-awesome-icon :icon="['fas', 'file-contract']"></font-awesome-icon>&nbsp;DOC
              </b-button>
              <b-button
                variant="info"
                :href="cv_odt_path"
                v-bind:class="{ disabled: cv_odt_path == null || cv_odt_path == '' }"
              >
                <font-awesome-icon :icon="['fas', 'file-alt']"></font-awesome-icon>&nbsp;ODT
              </b-button>
            </b-button-group>
          </div>

          <br />

          <div>
            <b>Grade Sheet</b>

            <br />
            <!-- TODO: Add link here -->
            <b-button
              variant="danger"
              :href="gradesheet_pdf_path"
              v-bind:class="{ disabled: gradesheet_pdf_path == null || gradesheet_pdf_path == '' }"
            >
              <font-awesome-icon :icon="['fas', 'file-pdf']"></font-awesome-icon>&nbsp;May 2019 Grade Sheet (PDF)
            </b-button>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      cv_pdf_path: process.env.VUE_APP_CV_FILE_PDF,
      cv_odt_path: process.env.VUE_APP_CV_FILE_ODT,
      cv_doc_path: process.env.VUE_APP_CV_FILE_DOC,
      cv_docx_path: process.env.VUE_APP_CV_FILE_DOCX,
      gradesheet_pdf_path: process.env.VUE_APP_GRADESHEET_FILE
    };
  }
};
</script>