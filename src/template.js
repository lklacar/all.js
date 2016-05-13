import $ from "jquery";


function selectElementById(id) {
    return $('*[data-alljsid="' + id + '"]')
}

class Template {


    constructor() {
        this.data = {}
        this.bindings = {};
    }

    /**
     * Must implement.
     * Should return html template.
     */
    getHtml() {
        throw "Not implemented"
    }

    /**
     * Sets data and triggers onDataChange
     * @param key Data key
     * @param value Data valye
     */
    setData(key, value) {
        this.data[key] = value;
        this.onDataChange();
    }

    /**
     * Is triggered every time the user calls setData
     * @param key
     * @param value
     */
    onDataChange() {
        // Optimize this
        for (var nodeKey in this.bindings) {
            if (this.bindings.hasOwnProperty(nodeKey)) {

                var newValue = eval("this.data." + this.bindings[nodeKey] + ";");
                var oldValue = $('*[data-alljsid="' + nodeKey + '"]').text();


                if (oldValue != newValue)
                    $('*[data-alljsid="' + nodeKey + '"]').text(newValue);

            }
        }
    }

    /**
     * Should implement
     * Code will execute right before the rendering. Should be used to set data using setData(key, value);
     */
    load() {
        throw "Not implemented"
    }

    /**
     * Renders element on the screen
     * @param element Element which will contain the template
     */
    render(element) {
        this.load();

        var html = this.getHtml();
        var $html = $(html);


        this.traverse($html, [
            this.generateUniqueNodeId,

        ], -1);

        element.html($html[0].outerHTML);

        this.traverse($html, [
            this.bindData,
            this.bindEvent,
        ], -1);

        this.onDataChange();


    }

    /**
     * Binds defined event to method defined in extended class
     * @param node
     * @param index
     */
    bindEvent(node, index) {
        if (!node.attr("data-on"))
            return;

        var bindDefinition = node.attr("data-on");
        var eventName = bindDefinition.split("->")[0].trim();
        var callback = bindDefinition.split("->")[1].trim()
        var nodeId = node.attr('data-alljsid');

        selectElementById(nodeId).on(eventName, eval('this.' + callback).bind(this));
    }

    //noinspection JSMethodCanBeStatic
    /**
     * Generates unique id for the node from parents id
     * @param node - node to process
     * @param index - node index in the parent element
     */
    generateUniqueNodeId(node, index) {
        if (index == -1) { //if root element, set id to 0
            node.attr("data-alljsid", '0');
            return;
        }

        var id = node.parent().attr("data-alljsid") + "." + index;
        $(node).attr("data-alljsid", id);
    }

    //noinspection JSMethodCanBeStatic
    /**
     * Logs currently processed node to the console
     * @param node - node to process
     * @param index - node index in the parent element
     */
    logNode(node, index) {
        console.log(node, index);
    }


    /**
     * Binds data
     * @param node
     * @param index
     */
    bindData(node, index) {
        if (!node.attr("data-bind"))
            return;

        var bindDefinition = node.attr("data-bind");
        var dataKey = bindDefinition.split("->")[0].trim();
        var propertyName = bindDefinition.split("->")[1].trim();
        var dataValue = this.data[dataKey];
        var nodeId = node.attr('data-alljsid');

        if (propertyName == "text") {
            node.text(dataValue);
        } else {
            node.attr(propertyName, dataValue);
        }

        this.bindings[nodeId] = dataKey;


    }

    /**
     * Traverses whole dom tree
     * @param node - node currently being processed
     * @param callbacks - list of callbacks to apply on the current node
     * @param index - node index in the parent element
     */
    traverse(node, callbacks, index) {

        // Call every callback for given node
        $.each(callbacks, function (callbackIndex, callbackObject) {
            callbackObject.bind(this)(node, index);
        }.bind(this));

        // Traverse further
        $.each(node.children(), function (nodeIndex, nodeObject) {
            this.traverse($(nodeObject), callbacks, nodeIndex);
        }.bind(this));


    }


}


export default class ExampleTemplate extends Template {

    getHtml() {
        return require("./template.html");

    }


    load() {
        var i = 0;
        this.setData('count', 0);
        this.setData("obj", {"a": "b"});


        /*
         setInterval(function () {
         this.setData("a", i++);
         }.bind(this), 1000);*/

    }

    //noinspection JSMethodCanBeStatic
    onClick() {
        this.setData('count', this.data.count + 1)
    }


}