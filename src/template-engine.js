import {includeData, injectData} from "./template-definitions.js";
import $ from "jquery"


export class TemplateEngine {

    constructor() {
        this.handlers = {
            "data-bind": injectData,
            "data-include": includeData
        }

    }


    traverse(element, doc, engine, selector, data) {

        Object.keys(this.handlers).forEach(function (key) {
            if (element instanceof HTMLElement && element.hasAttribute(key))
                this.handlers[key](element, doc, engine, selector, data);

            $(selector).html(doc.documentElement.innerHTML);

        }.bind(this));


        var children = element.children;


        for (var i = 0; i < children.length; i++) {
            this.traverse(children[i], doc, engine, selector, data);
        }
    }
}