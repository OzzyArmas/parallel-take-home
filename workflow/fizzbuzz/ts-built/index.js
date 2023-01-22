"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fizzbuzz = void 0;
const fizzbuzz = (req, res) => {
    const fizz = req.body['fizz'];
    const buzz = req.body['buzz'];
    let output = [];
    for (let i = 0; i < fizz.length; i++) {
        let f = fizz[i];
        let b = buzz[i];
        if (f === 'Fizz' && b === 'Buzz') {
            output.push('FizzBuzz');
        }
        else if (f === 'Fizz') {
            output.push('Fizz');
        }
        else if (b === 'Buzz') {
            output.push('Buzz');
        }
        else {
            output.push(f);
        }
    }
    res.send({ result: output });
};
exports.fizzbuzz = fizzbuzz;
