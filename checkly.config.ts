import { defineConfig } from '@checkly/cli'

/**
 * See https://www.checklyhq.com/docs/cli/project-structure/
 */
const config = defineConfig({
  /* A human friendly name for your project */
  projectName: 'Shopware 6 Project',
  /** A logical ID that needs to be unique across your Checkly account,
  * See https://www.checklyhq.com/docs/cli/constructs/ to learn more about logical IDs.
  */
  logicalId: 'shopware-project',
  /* Sets default values for Checks */
  checks: {
    /* A default for how often your Check should run in minutes */
    frequency: 30,
    /* Checkly data centers to run your Checks as monitors */
    locations: ['eu-central-1', 'eu-west-1'],
    runtimeId: '2022.10',
    /* A glob pattern that matches the Checks inside your repo, see https://www.checklyhq.com/docs/cli/using-check-test-match/ */
    checkMatch: '**/__checks__/**/*.check.ts',
    browserChecks: {
      /* A glob pattern matches any Playwright .spec.ts files and automagically creates a Browser Check. This way, you
      * can just write native Playwright code. See https://www.checklyhq.com/docs/cli/using-check-test-match/
      * */
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    /* The default datacenter location to use when running npx checkly test */
    runLocation: 'eu-west-1',
    /* An array of default reporters to use when a reporter is not specified with the "--reporter" flag */
    reporters: ['list'],
  },
})

export default config
