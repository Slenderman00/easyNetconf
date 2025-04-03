import { createRequire } from "module";
import { yuma123, yangcli } from "node-yuma123";
const require = createRequire(import.meta.url);
const { XMLParser } = require("fast-xml-parser");


class easyNetconf {
    constructor(server, port, username, password, privatekey_path=null, publickey_path=null) {
        this.connected = false;
        this.session = null;
        this.parser = new XMLParser();
        this.connect(server, port, username, password, privatekey_path, publickey_path);
    }

    connect(server, port, username, password, privatekey_path=null, publickey_path=null) {
        if(!this.connected) {
            this.session = yuma123.yangrpc.connect(server, port, username, password, privatekey_path, publickey_path);
            this.connected = true;
        }
    }

    perform(command) {
        if(!this.connected) {
            return;
        }

        let res = yangcli(this.session, command);

        let jObject = this.parser.parse(res)

        return jObject
    }
}

export { easyNetconf }