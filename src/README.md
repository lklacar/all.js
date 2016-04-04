## Install

```
$ npm install all.js
```

## Usage

### Model example
```js
import Model from "all.js/model";


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


// Create model
var example = new Post();
example.text = "Example text";
example.save();

// Retrieve one
Post.get(id = 0, function (post) {
    console.log(post);
});

// Retreve all
Post.all(function (posts) {
    console.log(posts);
});
```

### Template example
```js
import Model from "all.js/model";
import Template from "all.js/template";

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
```

```html
<html>
<head>
</head>

<body>
<h1 data-bind="data -> text"></h1>
</body>

</html>
```

### Router example
```js
import Model from "all.js/model";
import {Router, setRouter} from "all.js/router";
import Template from "all.js/template";

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


var router = new Router('body');
router.registerRoute("home", new ExampleTemplate());
setRouter(router);
```
