import { HttpFunction } from '@google-cloud/functions-framework';

export const fizzbuzz: HttpFunction = (req: any, res: any) => {
    const fizz: string[] = req.body['fizz']
    const buzz: string[] = req.body['buzz']
    let output: string[] = []
    for (let i = 0; i < fizz.length; i++) {
        let f = fizz[i]
        let b = buzz[i]
        if (f === 'Fizz' && b === 'Buzz') {
            output.push('FizzBuzz')
        } else if (f === 'Fizz') {
            output.push('Fizz')
        } else if (b === 'Buzz') {
            output.push('Buzz')
        } else {
            output.push(f)
        }
    }
    res.send({result : output})
};