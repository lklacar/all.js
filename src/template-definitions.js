import {API} from "./api.js";


export function includeData(element, doc, engine, selector, data) {

    const includeDefinition = element.getAttribute('data-include');
    const html = data[includeDefinition].load();

    element.removeAttribute('data-include');
    element.innerHTML = html;
    engine.traverse(element, doc, engine, selector, data);
}

export function injectData(element, doc, engine, selector, data) {

    const bindDefinition = element.getAttribute("data-bind");
    const source = bindDefinition.split("->")[0].trim();
    const destination = bindDefinition.split("->")[1].trim();
    if (destination === "text") {
        element.innerHTML = data[source];
    } else {
        element.setAttribute(destination, data[source]);
    }

}

export function injectMethods(element, doc, engine, selector, data, controllerClass) {
    const methodDefinition = element.getAttribute("data-method");
    const on = methodDefinition.split("->")[0].trim();
    const methodName = methodDefinition.split("->")[1].trim();

    setTimeout(function () {
        document.querySelectorAll("[data-method='" + methodDefinition + "']").addEventListener(on, controllerClass[methodName]);
    }.bind(this), 0);
}


export function injectForData(element, doc, engine, selector, data) {

    const bindDefinition = element.getAttribute("data-for-bind");
    const source = bindDefinition.split("->")[0].trim();
    const destination = bindDefinition.split("->")[1].trim();
    if (destination === "text") {
        console.log(data);
        element.innerHTML = data[source];
    } else {
        element.setAttribute(destination, data[source]);
    }

}


export function dataFor(element, doc, engine, selector, data, controllerClass) {

    const forDefinition = element.getAttribute("data-for");

    const varName = forDefinition.split("->")[0].trim();
    const dataName = forDefinition.split("->")[1].trim();
    const childElement = element.children[0];

    element.innerHTML = "";

    for (let i = 0; i < data[dataName].length; i++) {

        const newData = {};
        newData[varName] = data[dataName][i];
        injectForData(childElement, doc, engine, selector, newData);
        element.innerHTML += childElement.outerHTML;
    }
}