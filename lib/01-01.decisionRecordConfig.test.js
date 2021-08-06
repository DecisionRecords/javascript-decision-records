import { tmpdir } from 'os';
import { resolve } from 'path';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import DecisionRecordConfig from './decisionRecordConfig';

test('01-01 Finds a decision record root because it found a doc/adr path', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-01',
    addFile('doc/adr/.templates/template.md', "")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})