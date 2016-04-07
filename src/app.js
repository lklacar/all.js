var $ = require('jquery');

$(document).ready(function () {

    var h = require('virtual-dom/h');
    var diff = require('virtual-dom/diff');
    var patch = require('virtual-dom/patch');
    var createElement = require('virtual-dom/create-element');


    function render(count) {
        return h("div", ["\n", h("h1", [count]), "\n", h("h1", ["asd"]), "\n", h("input", {"attributes": {"type": "text"}})])
    }


    var count = 0;

    var tree = render(count);
    var rootNode = createElement(tree);
    document.body.appendChild(rootNode);


    setInterval(function () {
        count++;

        var newTree = render(count);
        var patches = diff(tree, newTree);
        console.log(patches);

        rootNode = patch(rootNode, patches);
        tree = newTree;
    }, 1000);


});