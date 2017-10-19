import API from "./api.js";

export default class Model {

    static getUrlConfig() {
        return {
            CREATE: "",
            RETRIEVE_ONE: "",
            RETRIEVE_ALL: "",
            UPDATE: "",
            DELETE_ONE: "",
            DELETE_ALL: ""
        }
    }

    setup(data) {
        const keys = Object.keys(data);
        for (let i = 0; i < keys.length; i++) { //noinspection JSUnfilteredForInLoop
            const key = keys[i];
            this[key] = data[key]
        }
    }

    getData() {
        return this;
    }

    save() {
        API.post(this.constructor.getUrlConfig().CREATE, this.getData());
    }

    static all(callback) {
        API.get(this.getUrlConfig().ALL, function (array) {
            const data = [];
            for (let i = 0; i < array.length; i++) {
                const elem = array[i];
                const temp = new this();
                temp.setup(elem);
                data.push(temp);
            }
            callback(data);
        }.bind(this));
    }

    static get(id, callback) {

        API.get(this.getUrlConfig().GET.replace("\<id\>", id.toString() + "/"), function (data) {
            const temp = new this();
            temp.setup(data);
            callback(temp);
        }.bind(this));

    }

}




