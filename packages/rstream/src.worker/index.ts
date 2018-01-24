self.onmessage = (e) => {
    console.log("worker", e.data);
    (<any>self).postMessage(Math.random());
};