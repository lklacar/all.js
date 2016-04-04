import $ from "jquery"
import {API} from "./api.js";
import {includeData, injectData} from "./template-definitions.js";
import TemplateEngine from "./template-engine.js";


export default class Controller {

    constructor(element) {
        this.element = element;
    }

    getTemplate() {
        return ""
    }

    load() {

    }

    render(selector, data) {


        var html = this.getTemplate();


        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");

        var templateEngine = new TemplateEngine();

        templateEngine.traverse(doc, doc, templateEngine, selector, data);

    }


}



