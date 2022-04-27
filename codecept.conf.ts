const { setHeadlessWhen } = require("@codeceptjs/configure");
require("ts-node/register");
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

exports.config = {
        tests: "codeceptjs/*.e2e.ts",
        output: "screenshots",
        helpers: {
                Puppeteer: {
                        url: "http://fptblog.vinhnhan.com",
                        show: true,
                        windowSize: "1200x900",
                },
        },
        include: {
                I: "./steps_file.js",
        },

        bootstrap: null,
        mocha: {},
        name: "mono-puppeteer",
        plugins: {
                pauseOnFail: {},
                retryFailedStep: {
                        enabled: true,
                },
                tryTo: {
                        enabled: true,
                },
                screenshotOnFail: {
                        enabled: true,
                },
        },
};
