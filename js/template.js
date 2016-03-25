import $ from "jquery";
import {API} from "./model.js";
import Mustache from "mustache";

function parseReturnedXML(strToParse, strStart, strFinish) {

    strToParse = strToParse.replace(/(\r\n|\n|\r)/gm, "");

    var str = strToParse.match(strStart + "(.*?)" + strFinish);

    return str[1];

}


export class Template {

    getTemplateUrl() {
        return "";
    }


    load() {

    }

    render(tag, data = []) {

        function process(html) {

            $(tag).html(this.parse(html, data));
        }

        process = process.bind(this);

        $.ajax({
            type: "GET",
            url: this.getTemplateUrl(),
            success: process,
            error: function (xhr, status, error) {

            },
            dataType: "html"
        });


    }


    parse(html, data) {
        return Mustache.render(html, data);
    }

}