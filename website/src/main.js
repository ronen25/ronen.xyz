// Import Vue's stuff
import Vue from 'vue'
import App from './App.vue'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeBranch, faAngleDown,
  faFileAlt, faFileContract, faFilePdf
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faStar, faCodeBranch, faAngleDown, faFileAlt, faFileContract,
  faFilePdf,
  faGithub, faLinkedin )

Vue.component( 'font-awesome-icon', FontAwesomeIcon )

Vue.config.productionTip = false

new Vue( {
  render: h => h( App ),
} ).$mount( '#app' )
