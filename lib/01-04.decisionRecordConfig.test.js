import { tmpdir } from 'os';
import { resolve } from 'path';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import DecisionRecordConfig from './decisionRecordConfig';

test('01-04 Finds a decision record root because it found a .decisionrecords-config file (unix ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-04',
    addFile('dr01-04/.templates/template.md', ""),
    addFile('.decisionrecords-config', "records=dr01-04\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})

test('01-04a Finds a decision record root because it found a .decisionrecords-config file (windows ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-04a',
    addFile('dr01-04a/.templates/template.md', ""),
    addFile('.decisionrecords-config', "records=dr01-04a\r\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})

test('01-04b Finds a decision record root because it found a .decisionrecords-config file (no ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-04b',
    addFile('dr01-04b/.templates/template.md', ""),
    addFile('.decisionrecords-config', "records=dr01-04b")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})