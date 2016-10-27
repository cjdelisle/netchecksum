const Checksum = require('./index');

const cases = [
    [
        new Buffer(
            "fce5de17cbdec87b528905568b83c9c8fc000000000000000000000000000001" +
            "0000001900000011b4a9003500190000e4e40100000100000000000000000200" +
            "01",
            "hex"),
        0x7249
    ],
    // Validate that even when the int rolls over it still works.
    [ new Buffer(new Array(40000).fill("This_is_a_test__").join('')), 0xd062 ],
    [ new Buffer(new Array(50000).fill("This_is_a_test__").join('')), 0x447c ]
];
cases.forEach((c) => {
    if (Checksum.raw(c[0]) !== c[1]) { throw new Error(); }
});
