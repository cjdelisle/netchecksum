'use strict';

const raw = module.exports.raw = (buf) => {
    // Checksum pairs.
    let state = 0;
    let hbit = 0;
    const add = (num) => {
        state += num;
        if (state > 0x7fffffff) {
            hbit ^= 1;
            state &= 0x7fffffff;
        }
    };

    for (let i = 0; i < buf.length - 1; i += 2) {
        add(buf.readUInt16LE(i));
    }

    // Do the odd byte if there is one.
    if (buf.length % 2) {
        add(buf[buf.length - 1]);
    }

    state |= hbit << 31;

    while (state < 0 || state > 0xFFFF) {
        state = (state >>> 16) + (state & 0xFFFF);
    }

    return state ^ 0xffff;
};
