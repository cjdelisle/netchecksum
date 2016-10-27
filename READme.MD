# NetChecksum - Validation for Packets

This is an ultra-simple library which implements the 1s complement checksum used by TCP,
UDP and ICMP in pure js.

To use it:
```javascript
const NetChecksum = require('netchecksum');
console.log(NetChecksum.raw(new Buffer("hello world")));
```
