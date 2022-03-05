const { GITHUB_ACTIONS, GITHUB_EVENT_PATH } = process.env;

/**
 * Get the PR number from the environment.
 * For Github Actions, the PR number is only available when a flow is trigered with `on: pull_request` and not `on: push`.
 */
export const getPRNumber = (): number | undefined => {
  if (GITHUB_ACTIONS) {
    try {
      const event = JSON.parse(fs.readFileSync(GITHUB_EVENT_PATH, 'utf8'));
      return event.number;
    } catch (error) {
      // @ts-ignore
      throw new Error(error);
    }
  }

  return;
};
