"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.executeWorkflow = void 0;
const workflows_1 = require("@google-cloud/workflows");
const client = new workflows_1.ExecutionsClient();
/**
 * Sleeps the process N number of milliseconds.
 * @param {Number} ms The number of milliseconds to sleep.
 */
function sleep(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}
// Execute workflow
const projectId = 'esoteric-dryad-120201';
const location = 'us-west1';
const workflow = 'takehome-workflow';
const executeWorkflow = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
        // Send response to OPTIONS requests
        res.set('Access-Control-Allow-Methods', 'GET');
        res.set('Access-Control-Allow-Methods', 'POST');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
        res.set('Access-Control-Max-Age', '3600');
    }
    console.log({ "logging body": req.body["input"] });
    const createExecutionRes = yield client.createExecution({
        parent: client.workflowPath(projectId, location, workflow),
        execution: {
            argument: JSON.stringify({ input: req.body['input'] })
        }
    });
    const executionName = createExecutionRes[0].name;
    // Wait for execution to finish, then print results.
    let executionFinished = false;
    let backoffDelay = 1000; // Start wait with delay of 1,000 ms
    console.log('will this log show on gcp?');
    while (!executionFinished) {
        const [execution] = yield client.getExecution({
            name: executionName,
        });
        executionFinished = execution.state !== 'ACTIVE';
        // If we haven't seen the result yet, wait a second.
        if (!executionFinished) {
            console.log('- Waiting for results...');
            yield sleep(backoffDelay);
            backoffDelay *= 2; // Double the delay to provide exponential backoff.
        }
        else {
            res.send({ result: execution.result });
        }
    }
});
exports.executeWorkflow = executeWorkflow;
