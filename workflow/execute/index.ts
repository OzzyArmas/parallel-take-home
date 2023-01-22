import {ExecutionsClient} from '@google-cloud/workflows';
import { HttpFunction } from '@google-cloud/functions-framework';

const client = new ExecutionsClient();

/**
 * Sleeps the process N number of milliseconds.
 * @param {Number} ms The number of milliseconds to sleep.
 */
function sleep(ms : number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}
// Execute workflow
const projectId = 'esoteric-dryad-120201';
const location = 'us-west1';
const workflow = 'takehome-workflow'
export const executeWorkflow: HttpFunction =  async (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      // Send response to OPTIONS requests
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Allow-Methods', 'POST');
      res.set('Access-Control-Allow-Headers', 'Content-Type');
      res.set('Access-Control-Max-Age', '3600');
    }
    console.log({"logging body": req.body["input"]})
    const createExecutionRes = await client.createExecution({
        parent: client.workflowPath(projectId, location, workflow),
        execution: {
          argument: JSON.stringify({input: req.body['input']})
        }
    },);
    const executionName = createExecutionRes[0].name;

    // Wait for execution to finish, then print results.
    let executionFinished = false;
    let backoffDelay = 1000; // Start wait with delay of 1,000 ms
    console.log('will this log show on gcp?')
    while (!executionFinished) {
        const [execution] = await client.getExecution({
        name: executionName,
        });
        executionFinished = execution.state !== 'ACTIVE';

        // If we haven't seen the result yet, wait a second.
        if (!executionFinished) {
        console.log('- Waiting for results...');
        await sleep(backoffDelay);
        backoffDelay *= 2; // Double the delay to provide exponential backoff.
        } else {
          res.send({result: execution.result});
        }
    }
}