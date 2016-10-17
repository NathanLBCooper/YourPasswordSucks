import _ = require("lodash")
import { Analyser } from "./services/analyser"

/** Using window.onmessage and declaring postmessage here.
 * This is wrong because we're inside a webworker.
 * Getting away with it though.
*/
declare function postMessage(data: any) : void;

self.onmessage = event => {

    var analyser = new Analyser();
    var output = _.add(event.data.length, analyser.bullshitFunction());
    postMessage(output);
}