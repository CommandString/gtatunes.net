/**
 * Generates a random string
 *
 * @param {number} length of the random string
 * @returns {string}
 */
export function generateRandomString(length = 16) {
    const array = new Uint8Array(length / 2);
    window.crypto.getRandomValues(array);
    return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Gets the current microtime
 *
 * @param {boolean} getAsFloat
 * @returns {number}
 */
export function microTime(getAsFloat = true) {
    let s, now, multiplier;

    if(typeof performance !== 'undefined' && performance.now) {
        now = (performance.now() + performance.timing.navigationStart) / 1000;
        multiplier = 1e6; // 1,000,000 for microseconds
    }
    else {
        now = (Date.now ? Date.now() : new Date().getTime()) / 1000;
        multiplier = 1e3; // 1,000
    }

    // Getting microtime as a float is easy
    if(getAsFloat) {
        return now;
    }

    // Dirty trick to only get the integer part
    s = now | 0;

    let num = (Math.round((now - s) * multiplier ) / multiplier ) + ' ' + s;

    return getAsFloat ? parseFloat(num) : parseInt(num);
}

/**
 * Allows you to enforce a minimum load time
 *
 * @param time in milliseconds to load
 * @returns {function(): Promise<void>} A function to await when done loading
 */
export function load(time = 0) {
    let started = microTime();

    return () => {
        return new Promise(resolve => {
            setTimeout(() => {
                if (microTime() - started < time) {
                    resolve();
                } else {
                    resolve();
                }
            }, time);
        });
    }
}
