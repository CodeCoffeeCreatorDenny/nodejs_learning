const { Worker } = require('worker_threads');

const perf_hooks = require('perf_hooks');
// test = perf_hooks.performance.timerify(test);

const performanceObserver = new perf_hooks.PerformanceObserver(
  (items, observer) => {
    console.log(items.getEntries());
    // const entry = items.getEntriesByName('slow').pop();
    const entry = items.getEntriesByName('main').pop();
    console.log(`${entry.name}: ${entry.duration}`);
    observer.disconnect();
  }
);
performanceObserver.observe({ entryTypes: ['measure', 'function'] });

// function test() {
//   const arr = [];
//   for (let i = 0; i < 100000000; i++) {
//     arr.push(i * i);
//   }
// }

// function slow() {
//   performance.mark('start');

//   const arr = [];
//   for (let i = 0; i < 100000000; i++) {
//     arr.push(i * i);
//   }

//   performance.mark('end');
//   performance.measure('slow', 'start', 'end');
// }

// slow();
// test();

const compute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', {
      workerData: {
        array,
      },
    });

    worker.on('message', (msg) => {
      console.log(worker.threadId);
      resolve(msg);
    });

    worker.on('error', (err) => {
      reject(err);
    });

    worker.on('exit', () => {
      console.log('Work end');
    });
  });
};

const main = async () => {
  try {
    performance.mark('start');

    const result = await Promise.all([
      compute([25, 35, 15, 44, 30, 50]),
      compute([25, 35, 15, 44, 30, 50]),
      compute([25, 35, 15, 44, 30, 50]),
      compute([25, 35, 15, 44, 30, 50]),
    ]);
    console.log(result);

    performance.mark('end');
    performance.measure('main', 'start', 'end');
  } catch (err) {
    console.error(err.message);
  }
};

main();
