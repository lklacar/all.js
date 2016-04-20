import API from "./api";
import Component from "./component"
import Router, {setRouter} from "./router"
import Controller from "./controller";
import Model from "./model";
import TemplateEngine from "./template-engine.js";
import Template from "./template";

class Example extends Template {

    load() {
        var data = {count: 1};

        setInterval(function () {
            data['count']++;

        }, 1000);


        this.render(data)
    }

    getHtml() {
        return "<div><h1>Count</h1><h1 data-bind='count -> text'></h1></div>";

    }


}


var router = new Router('body');

router.registerRoute("", Example);

setRouter(router);