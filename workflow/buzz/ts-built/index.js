"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buzz = void 0;
const buzz = (req, res) => {
    const input_val = req.body['input'];
    let output = [];
    for (let i = 1; i < input_val + 1; i++) {
        if (!(i % 5)) {
            output.push('Buzz');
        }
        else {
            output.push(i.toString());
        }
    }
    res.send({ result: output });
};
exports.buzz = buzz;
