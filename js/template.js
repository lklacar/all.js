import $ from "jquery"
import {API} from "./api.js";
import {includeData, injectData} from "./template-definitions.js";
import {TemplateEngine} from "./template-engine.js";


export class Template {

    getTemplateUrl() {
        return ""
    }

    load() {

    }

    render(selector, data) {

        API.get(this.getTemplateUrl(), function (html) {

            var parser = new DOMParser();
            var doc = parser.parseFromString(html, "text/html");

            var templateEngine = new TemplateEngine();

            templateEngine.traverse(doc, doc, templateEngine, selector, data);

        }, 'html');
    }


}



