// IIFE: Immediately invoked function expression
function evaluate(a, b) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res(a + b);
        }, 1000);
    })
}

(async function () {
    const res = await evaluate(10, 20);
    console.log(res);
})();

// (function () {
//     console.log('inialiazation');
// })();