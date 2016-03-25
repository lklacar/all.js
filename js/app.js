import {API, Model} from "./model.js"
import {Template} from "./template.js";
import $ from "jquery";
import {Router, setRouter} from "./router.js"

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


class ExampleTemplate extends Template {

    getTemplateUrl() {
        return "template.html";
    }

    load(element) {
        Post.all(function (posts) {
            this.render(element, {"posts": posts});
        }.bind(this));
    }
}


var router = new Router("body");


router.registerRoute("home", new ExampleTemplate());


setRouter(router);