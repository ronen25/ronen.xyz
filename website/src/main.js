// Import Vue's stuff
import Vue from 'vue'
import App from './App.vue'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import {
  faStar, faCodeBranch, 
  faAngleDown, faAngleUp,
  faFileAlt, faFileContract, faFilePdf
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faStar, faCodeBranch, faFileAlt, faFileContract,
  faAngleDown, faAngleUp, 
  faFilePdf,
  faGithub, faLinkedin )

Vue.component( 'font-awesome-icon', FontAwesomeIcon )

// Boostrap-vue
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.min.css'

// Import specific bootstrap components
import {
  BJumbotron,
  BNavbar, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem, BNavbarToggle,
  BCollapse,
  BContainer, BCol, BRow,
  BButtonGroup, BButton, BCard, BCardHeader, BCardBody, 
  VBToggle,
} from 'bootstrap-vue'

// UI Components
Vue.component( 'b-jumbotron', BJumbotron )
Vue.component( 'b-navbar', BNavbar )
Vue.component( 'b-navbar-nav', BNavbarNav )
Vue.component( 'b-nav-item', BNavItem )
Vue.component( 'b-nav-item-dropdown', BNavItemDropdown )
Vue.component( 'b-dropdown-item', BDropdownItem )
Vue.component( 'b-collapse', BCollapse )
Vue.component( 'b-navbar-toggle', BNavbarToggle )
Vue.component( 'b-container', BContainer )
Vue.component( 'b-row', BRow )
Vue.component( 'b-col', BCol )
Vue.component( 'b-button-group', BButtonGroup )
Vue.component( 'b-button', BButton )
Vue.component( 'b-card', BCard )
Vue.component( 'b-card-header', BCardHeader )
Vue.component( 'b-card-body', BCardBody )

// Directives
Vue.directive( 'b-toggle', VBToggle )

// -------------------------------------------------------------
Vue.config.productionTip = false

new Vue( {
  render: h => h( App ),
} ).$mount( '#app' )
