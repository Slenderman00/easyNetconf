import { rejects } from "assert";
import { createRequire } from "module";
import { yuma123, yangcli, safeConnect } from "node-yuma123";
import { resolve } from "path";
const require = createRequire(import.meta.url);
const { XMLParser } = require("fast-xml-parser");


class easyNetconf {
    constructor(server=null, port=null, username=null, password=null, privatekey_path=null, publickey_path=null) {
        this.connected = false;
        this.session = null;
        this.parser = new XMLParser();
        if(server != null && port != null) {
            this.connect(server, port, username, password, privatekey_path, publickey_path);
        }
    }

    connect(server, port, username, password, privatekey_path=null, publickey_path=null, timeout=30) {
        if(!this.connected) {
            this.session = safeConnect(server, port, username, password, privatekey_path, publickey_path, `--timeout=${timeout}`);
            this.connected = true;
        }
    }

    async_connect(server, port, username, password, privatekey_path=null, publickey_path=null, timeout=30) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                try {
                    if(!this.connected) {
                        this.session = safeConnect(server, port, username, password, privatekey_path, publickey_path, `--timeout=${timeout}`);
                        this.connected = true;
                        resolve(this.session);
                    }
                } catch (error) {
                    reject(error);
                }
            }, 0);
        });
    }

    perform(command) {
        if(!this.connected) {
            return;
        }

        let res = yangcli(this.session, command);

        let jObject = this.parser.parse(res)

        return jObject
    }

    close() {
        if(this.connected) {
            yuma123.yangrpc.close(this.session)
        }
    }
}

export { easyNetconf }