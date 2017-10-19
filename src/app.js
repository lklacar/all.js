import ExampleTemplate from "./template.js";
import $ from "jquery";
import Router, {setRouter} from "./router"

const router = new Router($('body'));
router.registerRoute("", ExampleTemplate);
setRouter(router);