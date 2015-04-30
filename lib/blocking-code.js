var endTime = Date.now() + 1000;

setTimeout(timeout, 500);

// block();
// tick();
// immediate();

console.log('sync code');

function timeout() {
    console.log('setTimeout');
}

function block() {
    while (Date.now() < endTime);
    console.log('sync block end');
}

function tick() {
    if (Date.now() < endTime) {
        process.nextTick(tick);
    } else {
        console.log('nextTick end');
    }
}

function immediate() {
    if (Date.now() < endTime) {
        setImmediate(immediate);
    } else {
        console.log('setImmediate end');
    }
}
