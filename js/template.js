import $ from "jquery";
import {API} from "./model.js";
import Mustache from "mustache";

var parse = function (html, options) {


    var re = /<%([^%>]+)?%>/g, reExp = /(^( )?(if|for|else|switch|case|break|{|}))(.*)?/g, code = 'var r=[];\n', cursor = 0, match;
    var add = function (line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    };
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
};


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
        return parse(html, data);
    }

}