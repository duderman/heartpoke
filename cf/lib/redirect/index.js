"use strict";

exports.handler = (event, context, callback) => {
    const response = event.Records[0].cf.response;

    if (response.status == 404) {
        const redirect_path = '/'; //redirects back to root so to index.html
        response.status = 302;
        response.statusDescription = "Found";
        /* Drop the body, as it is not required for redirects */
        response.body = "";
        response.headers["location"] = [{ key: "Location", value: redirect_path }];
    }
    callback(null, response);
};