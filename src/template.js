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
        var virtualDom;

        parser(html, function (err, hscript) {
            virtualDom = eval(hscript)
        });
        return virtualDom;
    }

    render(data) {

        watch(data, function (e) {


            this.updateModified(this.virtualDom, e, data[e])

        }.bind(this));


        document.querySelector(this.selector).appendChild(this.rootNode);
    }


    updateModified(node, modifiedDataKey, modifiedDataValue) {


        if (node.children == undefined)
            return;


        if (node.properties.dataset) {

            // Bind
            var bindDefinition = node.properties.dataset.bind;
            var propertyName = bindDefinition.split("->")[1].trim();
            var varName = bindDefinition.split("->")[0].trim();


            var oldVirtualDom = this.html2virtualdom(createElement(this.virtualDom).outerHTML);

            if (varName == modifiedDataKey) {


                node.children = [new VText(modifiedDataValue)];


                console.log(oldVirtualDom);
                console.log(this.virtualDom);
                console.log(node);
                console.log("\n");


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


$(document).ready(function () {


    var virtualDomStructure = new VirtualDomStructure("body", "<div><h1>Count</h1><h1 data-bind='count -> text'></h1></div>");

    var data = {
        count: 1
    };


    virtualDomStructure.render(data);

    setInterval(function () {
        data['count']++;
    }, 1000);


});