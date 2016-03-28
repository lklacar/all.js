import $ from "jquery";
import {API} from "./model.js";
import Mustache from "mustache";

export class Controller {

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

        html = $(html);


        var elements = html.find("*[data-bind]");


        elements.each(function (i, element) {
            element = $(element);
            var bindDefinition = element.data("bind");

            var source = data[bindDefinition.split("->")[0].trim()];
            var property = bindDefinition.split("->")[1].trim();

            if (property == "text")
                element.text(source);
            else
                element.attr(property, source);

        });


        var newHtml = "";
        for (var i = 0; i < html.length; i++) {
            var outerHtml = html.get(i).outerHTML;

            if (outerHtml != undefined)
                newHtml += outerHtml;
        }

        return newHtml;

    }

}