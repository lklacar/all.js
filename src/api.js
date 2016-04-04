import $ from "jquery"

export default class API {
    static post(url, data, dataType = "json") {
        $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: function (e) {

            },
            dataType: dataType
        });
    }

    static get(url, callback, dataType = "json") {
        $.ajax({
            type: "GET",
            url: url,
            success: callback,
            error: function (xhr, status, error) {
                console.log(xhr);
            },
            dataType: dataType
        });
    }
}