import { Worker, isMainThread, parentPort, workerData } from "worker_threads";

if (isMainThread) {
  const worker = new Worker(__filename);
  worker.once("message", (m) => {
    console.log(m);
  });
  worker.postMessage("Main Thread: Hi!")
} else {
  parentPort.once("message", (m) => {
    console.log(m);
    parentPort.postMessage("Worker Thread: Hello world"); // send a message to parent thread
  });
}
