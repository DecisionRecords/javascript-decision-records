import { tmpdir } from 'os';
import path from 'path';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import DecisionRecordConfig from '../decisionRecordConfig';

test('01-05 Does not find a decision record root because the .adr-dir path points to an invalid location', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_01-05'),
    addDirectory('not_adr01-05'),
    addFile('.adr-dir', "doc/adr01-05\n")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})

test('01-05a Does not find a decision record root because the .adr-dir path points to an invalid location', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_01-05'),
    addDirectory('not_adr01-05'),
    addFile('.adr-dir', "doc\\adr01-05\n")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})