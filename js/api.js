import $ from "jquery"

export class API {
    static post(url, data, dataType = "json") {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (e) {

            },
            dataType: "json"
        });
    }

    static get(url, callback, dataType = "json") {
        $.ajax({
            type: "GET",
            url: url,
            success: callback,
            error: function (xhr, status, error) {

            },
            dataType: "json"
        });
    }
}