const NetChecksum = require('./index');

const buf = (x) => (new Buffer(x, 'hex'));

const cases = [
    [
        buf("fce5de17cbdec87b528905568b83c9c8fc000000000000000000000000000001" +
            "0000001900000011b4a9003500190000e4e40100000100000000000000000200" +
            "01"),
        0x4972
    ],
    // Validate that even when the int rolls over it still works.
    [ new Buffer(new Array(40000).fill("This_is_a_test__").join('')), 0x62d0 ],
    [ new Buffer(new Array(50000).fill("This_is_a_test__").join('')), 0x7c44 ],
    [ buf("45000054ccf3000040010000c0a80001c0a8000b"), 0x2c59 ],
    [ buf("45000034fa4d400040064b8d0a4206015cde87c8"), 0x0000 ],
    [ buf("45000034fa4d4000400600000a4206015cde87c8"), 0x4b8d ]
];
cases.forEach((c) => {
    const mycs = NetChecksum.raw(c[0]);
    if (mycs !== c[1]) {
        throw new Error("expected [" + c[1].toString(16) + "] got [" + mycs.toString(16) + "]");
    }
});

(() => {
    const src = buf('c0a80191');
    const dst = buf('c0a80101');
    const content = buf('fe8d0100000100000000000006676f6f676c6503636f6d0000010001');
    if (NetChecksum.udp4(src, dst, buf('f970'), buf('0035'), content).toString(16) !== '6fd6') {
        throw new Error();
    }
    if (NetChecksum.udp4(src, dst, 63856, 53, content).toString(16) !== '6fd6') {
        throw new Error();
    }
})();
