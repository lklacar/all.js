import "./all";

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
        var a = "";

        for (var i = 0; i < 1; i++) {
            a += "<div data-method='click -> test'>test</div>";
        }


        return a;
    }

    load() {

        this.render(this.element, {
            data: "a",
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