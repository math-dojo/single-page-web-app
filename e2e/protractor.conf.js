// @ts-check
// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter, StacktraceOption } = require("jasmine-spec-reporter");
const { request } = require("gaxios");

/**
 * @type { import("protractor").Config }
 */
exports.config = {
  allScriptsTimeout: 11000,
  specs: ["./src/**/*.e2e-spec.ts"],
  capabilities: {
    browserName: "chrome",
  },
  directConnect: true,
  baseUrl: "http://127.0.0.1:4200/",
  framework: "jasmine",
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () {},
    random: true,
  },
  onPrepare() {
    require("ts-node").register({
      project: require("path").join(__dirname, "./tsconfig.json"),
    });
    jasmine
      .getEnv()
      .addReporter(
        new SpecReporter({
          spec: { displayStacktrace: StacktraceOption.PRETTY },
        })
      );

    return browser
      .getProcessedConfig()
      .then((config) => {
        const baseUrl = config["baseUrl"];
        if (/127\.0\.0\.0.1/.test(baseUrl) || /localhost/.test(baseUrl)) {
          console.info(`reaching out to the mock backend`);
          return request({ url: "http://localhost:4201" }).then(
            (response) => {
              console.info(
                `got a happy response ${response.status} from the backend`
              );
            }
          );
        }
      })
      .catch((err) => {
        console.error(
          `the mock backend could not be reached because ${err.message}`
        );
        throw err;
      });
  },
};
