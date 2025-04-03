
# EasyNetconf

EasyNetconf is a [node-yuma123](https://github.com/Slenderman00/node-yuma123) wrapper that manages your netconf connections for you.


## Installation

Install EasyNetconf with npm

```bash
  npm install EasyNetconf
```
    
## Usage/Examples

```javascript
import { easyNetconf } from "easyNetconf";

const server = "127.0.0.1";
const port = 830;
const username = "user";
const password = "pass";

const session = easyNetconf(server, port, username, password);

console.log(session.perform('xget /'))

```


## TODO

- [ ]  Connection watchdog


## Authors

- [@slenderman00](https://github.com/Slenderman00)

