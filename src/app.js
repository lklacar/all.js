import $ from "jquery"

class Template {

    constructor() {
        this.handlers = {
            "data-bind": dataBind,
        }
    }

    render(selector, html, data) {

        var parser = new DOMParser();
        var doc = parser.parseFromString(html, "text/html");
        this.traverse(doc, data);
        $(selector).html(doc.innerHTML);

    }

    traverse(element, data) {

        this.invokeHandler(element, data);
        for (var i = 0; i < element.children.length; i++)
            this.traverse(element.children[i], data);
    }

    invokeHandler(element, data) {
        Object.keys(this.handlers).forEach(function (key) {

            if (element instanceof HTMLElement && element.hasAttribute(key))
                this.handlers[key](element, data, key);

        }.bind(this));
    }

}


function dataBind(element, data, attribute) {

    var bindDefinition = element.getAttribute(attribute);




    


}


$(document).ready(function () {
    var t = new Template();

    t.render('body', require("./template.html"), {});

});

