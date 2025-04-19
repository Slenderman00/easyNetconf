# EasyNetconf

EasyNetconf is a [node-yuma123](https://github.com/Slenderman00/node-yuma123) wrapper that manages your netconf connections for you.

## Installation

Install EasyNetconf with npm

```bash
npm install easynetconf
```
    
## Usage/Examples

### Synchronous Connection

```javascript
import { easyNetconf } from "easynetconf";

const server = "127.0.0.1";
const port = 830;
const username = "user";
const password = "pass";

// Create a new session and connect
const netconf = new easyNetconf(server, port, username, password);

// Or connect after initialization
// const netconf = new easyNetconf();
// netconf.connect(server, port, username, password);

// Perform a command
const result = netconf.perform('xget /');
console.log(result);

// Close the connection when done
netconf.close();
```

### Asynchronous Connection

```javascript
import { easyNetconf } from "easynetconf";

const server = "127.0.0.1";
const port = 830;
const username = "user";
const password = "pass";

// Create a new session
const netconf = new easyNetconf();

// Connect asynchronously with Promises
netconf.async_connect(server, port, username, password)
  .then(connection => {
    // Perform commands after successful connection
    const result = netconf.perform('xget /');
    console.log(result);
    
    // Close the connection when done
    netconf.close();
  })
  .catch(error => {
    console.error("Connection failed:", error);
  });
```

### Optional Parameters

Both connection methods support additional optional parameters:

```javascript
// Using private key authentication
netconf.connect(
  server, 
  port, 
  username, 
  password, 
  "/path/to/privatekey", 
  "/path/to/publickey", 
  60 // timeout in seconds (default: 30)
);

// Or asynchronously with Promises
netconf.async_connect(
  server, 
  port, 
  username, 
  password, 
  "/path/to/privatekey", 
  "/path/to/publickey", 
  60 // timeout in seconds (default: 30)
)
  .then(connection => {
    // Use the connection
  })
  .catch(error => {
    // Handle errors
  });
```

## Features

- ✅ Connection management
- ✅ Non-blocking calls with async/await support
- ✅ XML to JSON conversion
- ✅ Timeout configuration
- ✅ SSH key authentication support

## TODO

- [ ] Connection watchdog

## Authors

- [@slenderman00](https://github.com/Slenderman00)