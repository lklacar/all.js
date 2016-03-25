import $ from "jquery";


export class Router {

    constructor() {
        this.routes = {};

    }


    registerRoute(path, callback) {
        this.routes[path] = callback;
    }


    check() {
        var path = window.location.hash.substring(1);

        try {
            this.routes[path]();
        }
        catch (ex) {
            $("body").html("");
        }


    }

}


export function setRouter(router) {
    if (!window.router) {
        window.router = router;
    }

    window.addEventListener('hashchange', function () {
        window.router.check();
    });
    window.addEventListener('load', function () {
        window.router.check();

    });
}