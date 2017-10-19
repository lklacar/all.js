import {includeData, injectData, injectMethods, dataFor} from "./template-definitions.js";
import $ from "jquery"


export default class TemplateEngine {

    constructor() {
        this.handlers = {
            "data-bind": injectData,
            "data-include": includeData,
            "data-method": injectMethods,
            "data-for": dataFor,
        }
    }

    traverse(element, doc, engine, selector, data, controllerClass) {

        Object.keys(this.handlers).forEach(function (key) {
            if (element instanceof HTMLElement && element.hasAttribute(key))
                this.handlers[key](element, doc, engine, selector, data, controllerClass);

            $(selector).html(doc.documentElement.innerHTML);

        }.bind(this));

        const children = element.children;

        for (let i = 0; i < children.length; i++) {
            this.traverse(children[i], doc, engine, selector, data, controllerClass);
        }
    }
}