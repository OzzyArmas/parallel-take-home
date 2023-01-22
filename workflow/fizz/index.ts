import { HttpFunction } from '@google-cloud/functions-framework';

export const fizz: HttpFunction = (req: any, res: any) => {
    const input_val: number = req.body['input']
    let output: string[] = []
    for (let i = 1; i < input_val + 1; i++) {
        if (!(i % 3)) {
            output.push('Fizz');
        }
        else {
            output.push(i.toString());
        }
    }
    res.send({result : output})
};