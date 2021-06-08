import { CancellationToken, CancellationTokenSource, asyncs } from 'util-kit';
const {
    createCancelablePromise, timeout, raceTimeout, Queue, Limiter, Throttler, Delayer, TaskSequentializer,
} = asyncs;


let factory = (n) => () => timeout(Math.random() * 100).then(() => { 
    console.log(`No.${n} task is called.`); 
    return n; 
});

let delayer = new Delayer(10);

Promise.all([
    timeout(11).then( () => delayer.trigger(factory(1)).then((result) => { console.log(`1 reuslt be 1`, result); })),
    delayer.trigger(factory(2)).then((result) => { console.log(`2 reuslt be 5`, result); }),
    delayer.trigger(factory(3)).then((result) => { console.log(`3 reuslt be 5`, result); }),
    delayer.trigger(factory(4)).then((result) => { console.log(`4 reuslt be 5`, result); }),
    delayer.trigger(factory(5)).then((result) => { console.log(`5 reuslt be 5`, result); })
]).then(() => {
    
});

const sequentializer = new TaskSequentializer();

let pendingDone = false;
sequentializer.setPending(1, timeout(1).then(() => { pendingDone = true; console.log('pending done first'); return; }));

// next finishes instantly
let nextDone = false;
const res = sequentializer.setNext(() => Promise.resolve(null).then(() => { nextDone = true; console.log('next after pending'); return; }));