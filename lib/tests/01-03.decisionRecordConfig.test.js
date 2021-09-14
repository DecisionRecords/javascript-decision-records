import { tmpdir } from 'os';
import path from 'path';
import { createTeardown, addFile } from 'fs-teardown';
import DecisionRecordConfig from '../decisionRecordConfig';

test('01-03 Finds a decision record root because it found a .adr-dir path (unix ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_01-03'),
    addFile(path.join('doc', 'adr01-03', '.templates', 'template.md'), ""),
    addFile('.adr-dir', "doc/adr01-03\n")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(path.resolve(getPath('.')));
  await cleanup();
})

test('01-03a Finds a decision record root because it found a .adr-dir path (windows ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test' + Math.floor(Date.now() / 1000), '01-03a'),
    addFile(path.join('doc', 'adr01-03a', '.templates', 'template.md'), ""),
    addFile('.adr-dir', "doc/adr01-03a\r\n")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(path.resolve(getPath('.')));
  await cleanup();
})

test('01-03b Finds a decision record root because it found a .adr-dir path (no ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test' + Math.floor(Date.now() / 1000), '01-03b'),
    addFile(path.join('doc', 'adr01-03b', '.templates', 'template.md'), ""),
    addFile('.adr-dir', "doc/adr01-03b")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(path.resolve(getPath('.')));
  await cleanup();
})

test('01-03c Finds a decision record root because it found a .adr-dir path (unix ending, windows paths)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test' + Math.floor(Date.now() / 1000), '01-03c'),
    addFile(path.join('doc', 'adr01-03c', '.templates', 'template.md'), ""),
    addFile('.adr-dir', "doc\\adr01-03c\n")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(path.resolve(getPath('.')));
  await cleanup();
})

test('01-03d Finds a decision record root because it found a .adr-dir path (windows ending, windows paths)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test' + Math.floor(Date.now() / 1000), '01-03d'),
    addFile(path.join('doc', 'adr01-03d', '.templates', 'template.md'), ""),
    addFile('.adr-dir', "doc\\adr01-03d\r\n")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(path.resolve(getPath('.')));
  await cleanup();
})

test('01-03e Finds a decision record root because it found a .adr-dir path (no ending, windows paths)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test' + Math.floor(Date.now() / 1000), '01-03e'),
    addFile(path.join('doc', 'adr01-03e', '.templates', 'template.md'), ""),
    addFile('.adr-dir', "doc\\adr01-03e")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(path.resolve(getPath('.')));
  await cleanup();
})