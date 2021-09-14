import decisionRecordNew from '../decisionRecordNew';
import test_init from './__utility.js';
import { make_approved, set_approved_records, make_proposed, set_proposed_records } from '../setStatus';
import { tmpdir } from 'os';
import { createTeardown } from 'fs-teardown';
import path from 'path';

test('05-01 Set Approved Status', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_05-01')
  );
  await prepare();
  let decisionRecordConfig = test_init(getPath('.'));
  let args = {
    title: ['This', 'is', 'a', 'test']
  };
  let opts = {
    proposed: true
  };
  let testing = {
    config: decisionRecordConfig,
    date: '2000-01-01'
  }
  decisionRecordNew(args, opts, testing);
  expect(await make_approved(1, decisionRecordConfig)).toMatch(
    new RegExp(
      '## Status\r?\n' +
      '\r?\n' +
      'Approved\r?\n' +
      '\r?\n' +
      'Previously: Proposed\r?\n'
    )
  );
  await cleanup();
});

test('05-02 Set Proposed Status', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_05-02')
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
  expect(await make_proposed(1, decisionRecordConfig)).toMatch(
    new RegExp(
      '## Status\r?\n' +
      '\r?\n' +
      'Proposed\r?\n' +
      '\r?\n' +
      'Previously: Approved\r?\n'
    )
  );
  await cleanup();
});