// const getWorldParams = () => {
//   const params = {
//     foo: "bar",
//   }

//   return params
// }

const config = {
  // requireModule: ['ts-node/register'],
  import: ["src/**/*.steps.ts", "support/**/*.ts"],
  paths: ["src/**/*.feature"],
  format: [
    "json:reports/cucumber-report.json",
    "html:reports/report.html",
    "junit:reports/junit.xml",
    "summary",
    "progress-bar",
  ],
  formatOptions: { snippetInterface: "async-await" },
  // worldParameters: getWorldParams(),
}

config.format.push("@cucumber/pretty-formatter")

export default config
