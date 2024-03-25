// closure
function outer(x) {
    function inc() {
        ++x;
        console.log('value of x is', x);
    }

    return inc;
}

const inc = outer(100);
inc();
inc();
inc();
inc();
inc();
inc();