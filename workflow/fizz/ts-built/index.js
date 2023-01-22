"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fizz = void 0;
const fizz = (req, res) => {
    const input_val = req.body['input'];
    let output = [];
    for (let i = 1; i <= input_val; i++) {
        if (!(i % 3)) {
            output.push('Fizz');
        }
        else {
            output.push(i.toString());
        }
    }
    res.send({ result: output });
};
exports.fizz = fizz;
