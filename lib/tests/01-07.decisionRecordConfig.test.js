import { tmpdir } from 'os';
import path from 'path';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import DecisionRecordConfig from '../decisionRecordConfig';

test('01-07 Does not find a decision record root because the .adr-dir path is empty', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_01-07'),
    addDirectory('adr01-07'),
    addFile('.adr-dir', "")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})