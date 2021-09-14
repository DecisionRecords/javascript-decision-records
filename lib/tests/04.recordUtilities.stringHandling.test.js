import decisionRecordNew from '../decisionRecordNew';
import test_init from './__utility.js';
import { findRecordFile, findRecordFileName, addStringToBlock } from '../__recordUtilities';
import { tmpdir } from 'os';
import { createTeardown } from 'fs-teardown';
import path from 'path';


test('04-01 Find a valid record', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_04-01')
  );
  await prepare();
  let decisionRecordConfig = test_init(getPath('.'));
  let args = {
    title: ['This', 'is', 'a', 'test']
  };
  let opts = {};
  let testing = {
    config: decisionRecordConfig,
    date: '2000-01-01'
  }
  decisionRecordNew(args, opts, testing);
  expect(findRecordFile(1, decisionRecordConfig)).toEqual(path.join(path.resolve(getPath('.')), 'doc', 'decision_records', '0001-this-is-a-test.md'));
  await cleanup();
});

test('04-01a Find a valid record', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_04-01a')
  );
  await prepare();
  let decisionRecordConfig = test_init(getPath('.'));
  let args = {
    title: ['This', 'is', 'a', 'test']
  };
  let opts = {};
  let testing = {
    config: decisionRecordConfig,
    date: '2000-01-01'
  }
  decisionRecordNew(args, opts, testing);
  expect(findRecordFileName(1, decisionRecordConfig)).toEqual('0001-this-is-a-test.md');
  await cleanup();
});

test('04-02 Fail to find a valid record', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_04-02')
  );
  await prepare();
  let decisionRecordConfig = test_init(getPath('.'));
  expect(() => findRecordFile(1, decisionRecordConfig)).toThrow("Decision Record not found.");
  await cleanup();
});

test('04-02a Fail to find a valid record', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_04-02a')
  );
  await prepare();
  let decisionRecordConfig = test_init(getPath('.'));
  expect(() => findRecordFileName(1, decisionRecordConfig)).toThrow("Decision Record not found.");
  await cleanup();
});

test('04-03 Add new Status to a record', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_04-03')
  );
  await prepare();
  let decisionRecordConfig = test_init(getPath('.'));
  let args = {
    title: ['This', 'is', 'a', 'test']
  };
  let opts = {};
  let testing = {
    config: decisionRecordConfig,
    date: '2000-01-01'
  }
  decisionRecordNew(args, opts, testing);
  let filename = findRecordFile(1, decisionRecordConfig);
  expect(await addStringToBlock(filename, decisionRecordConfig, 'Status', 'Declined', true, 'Previously: ')).toMatch(
    new RegExp(
      '## Status\r?\n' +
      '\r?\n' +
      'Declined\r?\n' +
      '\r?\n' +
      'Previously: Approved\r?\n'
    )
  );
  await cleanup();
});

//// TODO: Currently fails as RST templates fail :(
// test('04-03a Add new Status to a record', async () => {
//   const { prepare, getPath, cleanup } = createTeardown(
//     path.join(tmpdir(), 'test_' + Date.now() + '_04-03a')
//   );
//   await prepare();
//   var decisionRecordConfig = test_init(getPath('.'), { templateType: 'rst' });
//   var args = {
//     title: ['This', 'is', 'a', 'test']
//   };
//   var opts = {};
//   var testing = {
//     config: decisionRecordConfig,
//     date: '2000-01-01'
//   }
//   decisionRecordNew(args, opts, testing);
//   var filename = findRecordFile(1, decisionRecordConfig);
//   expect(await addStringToBlock(filename, decisionRecordConfig, 'Status', 'Declined', true, 'Previously: ')).toMatch(
//     new RegExp(
//       '******\r?\n' +
//       'Status\r?\n' +
//       '******\r?\n' +
//       '\r?\n' +
//       'Declined\r?\n' +
//       '\r?\n' +
//       'Previously: Approved\r?\n'
//     )
//   );
//   await cleanup();
// });

test('04-04 Add new context to a record', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_04-04')
  );
  await prepare();
  let decisionRecordConfig = test_init(getPath('.'));
  let args = {
    title: ['This', 'is', 'a', 'test']
  };
  let opts = {};
  let testing = {
    config: decisionRecordConfig,
    date: '2000-01-01'
  }
  decisionRecordNew(args, opts, testing);
  let filename = findRecordFile(1, decisionRecordConfig);
  expect(await addStringToBlock(filename, decisionRecordConfig, 'Status', 'Linked To Something', false)).toMatch(
    new RegExp(
      '## Status\r?\n' +
      '\r?\n' +
      'Approved\r?\n' +
      '\r?\n' +
      'Linked To Something\r?\n'
    )
  );
  await cleanup();
});
