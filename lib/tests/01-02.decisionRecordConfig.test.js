import { tmpdir } from 'os';
import path from 'path';
import { createTeardown, addFile } from 'fs-teardown';
import DecisionRecordConfig from '../decisionRecordConfig';

test('01-02 Finds a decision record root because it found a doc/decision_records path', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_01-02'),
    addFile(path.join('doc', 'decision_records', '.templates', 'template.md'), "")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(path.resolve(getPath('.')));
  await cleanup();
})