import { tmpdir } from 'os';
import path from 'path';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import DecisionRecordConfig from '../decisionRecordConfig';

test('01-06 Does not find a decision record root because the .decisionrecords-config file points to an invalid location', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test', '01-06'),
    addDirectory('not_dr01-06'),
    addFile('.decisionrecords-config', "records=dr01-06\n")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})