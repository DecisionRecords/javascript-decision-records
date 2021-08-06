import { tmpdir } from 'os';
import { resolve } from 'path';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import DecisionRecordConfig from './decisionRecordConfig';

test('01-09 Complains because while the directory exists, and the .adr-dir points to it, there is no template there.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-09',
    addDirectory('dr01-09'),
    addFile('.adr-dir', "dr01-09\n")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("Your template directory was not found. Have you run `decision-record init`, or put your templates in");
  await cleanup();
})

test('01-09a Complains because while the directory exists, and the .decisionrecords-config points to it, there is no template there.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-09a',
    addDirectory('dr01-09a'),
    addFile('.decisionrecords-config', "records=dr01-09a\n")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("Your template directory was not found. Have you run `decision-record init`, or put your templates in");
  await cleanup();
})

test('01-09b Complains because while the directory doc/adr exists, there is no template there.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-09b',
    addDirectory('doc/adr')
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("Your template directory was not found. Have you run `decision-record init`, or put your templates in");
  await cleanup();
})

test('01-09c Complains because while the directory doc/decision_records exists, there is no template there.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-09c',
    addDirectory('doc/decision_records')
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("Your template directory was not found. Have you run `decision-record init`, or put your templates in");
  await cleanup();
})