import { tmpdir } from 'os';
import path from 'path';
import { createTeardown, addFile } from 'fs-teardown';
import DecisionRecordConfig from '../decisionRecordConfig';

test('01-01 Finds a decision record root because it found a doc/adr path', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_01-01'),
    addFile(path.join('doc', 'adr', '.templates', 'template.md'), "")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(path.resolve(getPath('.')));
  await cleanup();
})