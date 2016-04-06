import $ from "jquery"
import API from "./api"
import {includeData, injectData} from "./template-definitions.js";
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


        $(selector).html(this.getTemplate()(data));


    }


}



