const workerFunction = (array) => {
  return new Promise((resolve, reject) => {});
};

const forkFunction = (array) => {
  return new Promise((resolve, reject) => {});
};

const main = async () => {
  await workerFunction([25, 46, 24, 11, 50]);
  await forkFunction([25, 46, 24, 11, 50]);
};

main();
