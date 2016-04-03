import {API} from "./api.js"

export class Component {

    getComponentUrl() {
        return ""
    }

    load(callback) {

        API.get(this.getComponentUrl(), callback, 'html');
    }


}
