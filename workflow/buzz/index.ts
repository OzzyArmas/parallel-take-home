import { HttpFunction } from '@google-cloud/functions-framework';

export const buzz: HttpFunction = (req: any, res: any) => {
    const input_val = req.body['input']
    let output: string[] = []
    for (let i = 1; i < input_val + 1; i++) {
        if (!(i % 5)) {
            output.push('Buzz');
        }
        else {
            output.push(i.toString());
        }
    }
    res.send({result : output})
};