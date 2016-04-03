import Model from "all.js/model";
import {Router, setRouter} from "all.js/router";
import Template from "all.js/template";

class ExampleTemplate extends Template {

    getTemplateUrl() {
        return "template.html";
    }

    load(element) {
        this.render(element, {
            data: "Example data"
        });
    }
}


var router = new Router('body');
router.registerRoute("home", new ExampleTemplate());
setRouter(router);