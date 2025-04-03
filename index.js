import { createRequire } from "module";
import { yuma123, yangcli } from "node-yuma123";
const require = createRequire(import.meta.url);
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");

const server = "127.0.0.1";
const port = 830;
const username = "user";
const password = "pass";


class easyNetconf {
    constructor() {
        this.connected = false;
        this.session = null;
        this.parser = new XMLParser();
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

let n1 = new easyNetconf()
n1.connect(server, port, username, password);
console.log(n1.perform("xget /")['rpc-reply'])