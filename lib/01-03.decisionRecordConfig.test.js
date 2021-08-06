import { tmpdir } from 'os';
import { resolve } from 'path';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import DecisionRecordConfig from './decisionRecordConfig';

test('01-03 Finds a decision record root because it found a .adr-dir path (unix ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-03',
    addFile('doc/adr01-03/.templates/template.md', ""),
    addFile('.adr-dir', "doc/adr01-03\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})

test('01-03a Finds a decision record root because it found a .adr-dir path (windows ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-03a',
    addFile('doc/adr01-03a/.templates/template.md', ""),
    addFile('.adr-dir', "doc/adr01-03a\r\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})

test('01-03b Finds a decision record root because it found a .adr-dir path (no ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-03b',
    addFile('doc/adr01-03b/.templates/template.md', ""),
    addFile('.adr-dir', "doc/adr01-03b")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})