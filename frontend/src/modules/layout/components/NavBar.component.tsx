import { defineComponent } from "vue";
import NavBar from "../models/NavBar.model";

export default defineComponent({
  setup() {
    const navBar = new NavBar();
  }
});