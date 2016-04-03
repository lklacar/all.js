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