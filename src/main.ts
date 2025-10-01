import {
  component
} from '@pionjs/pion';

import App from "../src/app";

import './styles/main.css';


customElements.define('my-app', component(App));
