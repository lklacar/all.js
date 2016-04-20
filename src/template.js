import $ from "jquery";
import parser from "./html2hscript";
import diff from "virtual-dom/diff";
import patch from "virtual-dom/patch";
import createElement from "virtual-dom/create-element";


var WatchJS = require("./watch");
var watch = WatchJS.watch;
var unwatch = WatchJS.unwatch;
var callWatchers = WatchJS.callWatchers;
var h = require("virtual-dom/h");


var VText = require('virtual-dom/vnode/vtext');
var VNode = require('virtual-dom/vnode/vnode');


class VirtualDomStructure {

    constructor(selector, html) {
        this.virtualDom = this.html2virtualdom(html);
        this.rootNode = createElement(this.virtualDom);
        this.selector = selector;


    }

    html2virtualdom(html) {
        var virtualDom = {};

        parser(html, function (err, hscript) {
            virtualDom = eval(hscript)
        });
        return virtualDom;
    }

    render(data) {

        this.firstRender(this.virtualDom, data);

        watch(data, function (e) {
            this.updateModified(this.virtualDom, e, data[e])
        }.bind(this));


        document.querySelector(this.selector).appendChild(this.rootNode);
    }


    firstRender(node, data) {

        if (node.children == undefined)
            return;


        if (node.properties.dataset) {

            // Bind
            var bindDefinition = node.properties.dataset.bind;
            var varName = bindDefinition.split("->")[0].trim();


            var oldVirtualDom = this.html2virtualdom(createElement(this.virtualDom).outerHTML);


            node.children = [new VText(data[varName])];

            var patches = diff(oldVirtualDom, this.virtualDom);
            this.rootNode = patch(this.rootNode, patches);

        }

        for (var i = 0; i < node.children.length; i++) {
            var childNode = node.children[i];
            this.firstRender(childNode, data);
        }


    }

    updateModified(node, modifiedDataKey, modifiedDataValue) {


        if (node.children == undefined)
            return;


        if (node.properties.dataset) {

            // Bind
            var bindDefinition = node.properties.dataset.bind;
            var varName = bindDefinition.split("->")[0].trim();


            var oldVirtualDom = this.html2virtualdom(createElement(this.virtualDom).outerHTML);

            if (varName == modifiedDataKey) {

                node.children = [new VText(modifiedDataValue)];

                var patches = diff(oldVirtualDom, this.virtualDom);
                this.rootNode = patch(this.rootNode, patches);
            }
        }

        for (var i = 0; i < node.children.length; i++) {
            var childNode = node.children[i];
            this.updateModified(childNode, modifiedDataKey, modifiedDataValue);
        }
    }

    update(newHtml) {
        var newVirtualDom = this.html2virtualdom(newHtml);
        var patches = diff(this.virtualDom, newVirtualDom);
        this.rootNode = patch(this.rootNode, patches);
        this.virtualDom = newVirtualDom;
    }

}


export default class Template {
    constructor(element) {
        this.virtualDomStructure = new VirtualDomStructure(element, this.getHtml());

    }

    load() {

    }

    getHtml() {

    }

    render(data) {
        this.virtualDomStructure.render(data)
    }


}
