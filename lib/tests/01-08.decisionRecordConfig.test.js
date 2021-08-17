import { tmpdir } from 'os';
import path from 'path';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import DecisionRecordConfig from '../decisionRecordConfig';

test('01-08 Does not find a decision record root because the .decisionrecords-config file points to an invalid location', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test', '01-08'),
    addDirectory('dr01-08'),
    addFile('.decisionrecords-config', "")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})