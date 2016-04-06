import API from "./api";
import Component from "./component"
import Router, {setRouter} from "./router"
import Controller from "./controller";
import Model from "./model";
import TemplateEngine from "./template-engine.js";



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
        return require("./template.html");
    }

}

class ExampleTemplate extends Controller {

    getTemplate() {

        return require("./a.jade");
    }

    load() {

        this.render(this.element, {
            variable: "test",
            component: new ExampleComponent()


        });

    }


    test() {
        alert('test');
    }
}


var router = new Router('body');


router.registerRoute("", ExampleTemplate);


setRouter(router);