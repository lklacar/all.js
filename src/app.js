import Model from "./model.js"
import Controller from "./controller.js";
import $ from "jquery";
import Router, {setRouter} from "./router.js"
import Component from "./component"


class Post extends Model {
    static getUrlConfig() {
        var base = "http://localhost:8000/api/";
        return {
            CREATE: base + "posts/",
            GET: base + "posts/<id>",
            ALL: base + "posts/",
            UPDATE: base + "posts/<id>",
            DELETE_ONE: base + "posts/<id>",
            DELETE_ALL: base + "posts/"
        }
    }
}


class ExampleComponent extends Component {

    getTemplate() {
        return "this is a template";
    }

}

class ExampleTemplate extends Controller {

    getTemplate() {

        return "<div data-include='component'></div>";
    }

    load(element) {

        this.render(element, {
            data: "a",
            component: new ExampleComponent()


        });

    }
}


var router = new Router('body');


router.registerRoute("home", new ExampleTemplate());


setRouter(router);