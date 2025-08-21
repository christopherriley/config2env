import * as core from "@actions/core";
import * as github from "@actions/github";

try {
  const configFile = core.getInput("config-file");
  core.info(`reading config file: ${configFile}`);

  // Get the current time and set it as an output variable
  const time = new Date().toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  core.info(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
