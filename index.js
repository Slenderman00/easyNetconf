import { createRequire } from "module";
import { yuma123, yangcli, getErrorMessage } from "node-yuma123";
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
            if(!this.connected) {
                yuma123.yangrpc.async_connect(server, port, username, password, privatekey_path, publickey_path, `--timeout=${timeout}`).then((connection) => {
                    this.session = connection;
                    this.connected = true;
                    resolve(this.session);
                }).catch((e) => {
                    this.connected = false;
                    reject(getErrorMessage(e.code));
                })
            }
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
            this.connected = false;
        }
    }
}

export { easyNetconf }