function promiseSettled(promise) {
  return new Promise((resolve, reject) => {
    let newPromiseArray = [];
    let completed = 0;
    if (promise.length == 0) resolve(newPromiseArray);
    promise.forEach((p, idx) => {
      Promise.resolve(p)
        .then((res) => {
          newPromiseArray[idx] = {
            status: "fufilled",
            value: res,
          };
          //   newPromiseArray[idx].status = "fufilled";
          completed++;

          if (completed == promise.length) {
            resolve(newPromiseArray);
          }
        })
        .catch((err) => {
        //   console.log("err", err);
            completed++;
          newPromiseArray[idx] = {
            status: "rejected",
            value: err,
          };
        });
    });
  });
}

const p1 = Promise.resolve(3);
const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // console.log("time", "p", 2, Date.now() - time);
    resolve("p2");
  }, 4000);
});
const p3 = 1337;
const p4 = new Promise((resolve, reject) => {
  let time = Date.now();
  setTimeout(() => {
    // console.log("time", "p", 4, Date.now() - time);
    reject("p4");
  }, 2000);
});

const customPromise = promiseSettled([p1, p2, p3, p4]);
// const defaultPromise = Promise.allSettled([p1, p2, p3, p4]);
customPromise.then((val) => console.log(val, "---> promise all custom"));
// defaultPromise.then((val) => console.log(val, "---> promise all default"));
