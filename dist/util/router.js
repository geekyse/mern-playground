"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncErrors = void 0;
// Catch error that are throw inside route
function catchAsyncErrors(fn) {
    return (req, res, next) => {
        const routePromise = fn(req, res, next);
        if (routePromise.catch) {
            routePromise.catch((err) => {
                console.log("+++++++++ catchAsyncErrors ++++++++++++");
                console.log(err);
                console.log("+++++++++ catchAsyncErrors ++++++++++++");
                next(err);
            });
        }
    };
}
exports.catchAsyncErrors = catchAsyncErrors;
