import Model from "all.js/model";


class ExampleTemplate extends Template {

    getTemplateUrl() {
        return "template.html";
    }

    load(element) {
        this.render(element, {
            data: "Example data"
        });
    }
}

var template = new ExampleTemplate();
template.load('body');