import TemplateEngine from "./template-engine.js";


export default class Controller {

    constructor(element) {
        this.element = element;
    }

    getTemplate() {
        return ""
    }

    load() {

    }

    render(selector, data) {

        const html = this.getTemplate();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const templateEngine = new TemplateEngine();

        templateEngine.traverse(doc, doc, templateEngine, selector, data, this);

    }


}



