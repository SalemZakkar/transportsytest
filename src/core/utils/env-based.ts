export const envBased = function (dev: any, live: any) {
    if (process.env.ENV == "DEV") {
        return dev;
    } else {
        return live;
    }
};