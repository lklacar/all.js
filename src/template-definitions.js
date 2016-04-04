import {API} from "./api.js";
import $ from "jquery";


export function includeData(element, doc, engine, selector, data) {

    var includeDefinition = element.getAttribute('data-include');
    var html = data[includeDefinition].load();

    element.removeAttribute('data-include');
    element.innerHTML = html;
    engine.traverse(element, doc, engine, selector, data);


}

export function injectData(element, doc, engine, selector, data) {

    var bindDefinition = element.getAttribute("data-bind");
    var source = bindDefinition.split("->")[0].trim();
    var destination = bindDefinition.split("->")[1].trim();
    if (destination == "text") {
        element.innerHTML = data[source];
    } else {
        element.setAttribute(destination, data[source]);
    }

}

export function injectMethods(element, doc, engine, selector, data, controllerClass) {


    var methodDefinition = element.getAttribute("data-method");
    var on = methodDefinition.split("->")[0].trim();
    var methodName = methodDefinition.split("->")[1].trim();


    setTimeout(function () {
        $("[data-method='" + methodDefinition + "']").on(on, controllerClass[methodName]);
    }.bind(this), 0);


}