import decisionRecordNew from '../decisionRecordNew';
import test_init from './__utility.js';
import { tmpdir } from 'os';
import { createTeardown } from 'fs-teardown';
import path from 'path';

test('03-01 Create a basic Decision Record', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_03-01')
  );
  await prepare();
  var decisionRecordConfig = test_init(getPath('.'));
  var args = {
    title: ['This', 'is', 'a', 'test']
  };
  var opts = {};
  var testing = {
    config: decisionRecordConfig,
    date: '2000-01-01'
  }
  var template = decisionRecordNew(args, opts, testing);
  expect(template).toMatch(/# 1. This is a test/);
  expect(template).toMatch(/Approved/);
  expect(template).toMatch(/Date: 2000-01-01/);
  await cleanup();
});

test('03-02 Create a basic Decision Record in proposed', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_03-02')
  );
  await prepare();
  var decisionRecordConfig = test_init(getPath('.'));
  var args = {
    title: ['This', 'is', 'a', 'test']
  };
  var opts = {
    proposed: true
  };
  var testing = {
    config: decisionRecordConfig,
    date: '2000-01-01'
  }
  var template = decisionRecordNew(args, opts, testing);
  expect(template).toMatch(/Proposed/);
  await cleanup();
});

test('03-03 Create a basic Decision Record in Approved', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_03-03')
  );
  await prepare();
  var decisionRecordConfig = test_init(getPath('.'), { defaultState: 'Proposed' });
  var args = {
    title: ['This', 'is', 'a', 'test']
  };
  var opts = {
    approved: true
  };
  var testing = {
    config: decisionRecordConfig,
    date: '2000-01-01'
  }
  var template = decisionRecordNew(args, opts, testing);
  expect(template).toMatch(/Approved/);
  await cleanup();
});