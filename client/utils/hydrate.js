import {createElement} from "react";
import { hydrate } from "react-dom";

export default ({ props, component }) => 
  hydrate(
    createElement(component, props),
    document.getElementById("root")
  );
