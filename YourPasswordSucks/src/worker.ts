import _ = require('lodash')

/** Using window.onmessage and declaring postmessage here.
 * This is wrong because we're inside a webworker.
 * Getting away with it though.
*/
declare function postMessage(data: any) : void;

self.onmessage = event => {

    var output = _.add(event.data.length, 3);
    postMessage(output);
}