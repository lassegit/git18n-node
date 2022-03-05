const fs = require('fs');

const { GITHUB_EVENT_PATH, CIRCLE_PR_NUMBER } = process.env;

/**
 * Get the PR number from the environment.
 * For Github Actions, the PR number is only available when a flow is trigered with `on: pull_request` and not `on: push`.
 */
export const getPRNumber = (): number | undefined => {
  // Github
  if (GITHUB_EVENT_PATH) {
    try {
      const event = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH, 'utf8'));
      return event.number;
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  }

  // Circle CI
  if (CIRCLE_PR_NUMBER) {
    return Number(CIRCLE_PR_NUMBER);
  }

  return;
};
