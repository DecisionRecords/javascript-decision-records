import { tmpdir } from 'os';
import path from 'path';
import { createTeardown } from 'fs-teardown';
import DecisionRecordConfig from './decisionRecordConfig';

test('01-00 Does not find a decision record root because no file structures were created', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test', '01-00')
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})