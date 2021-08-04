import { tmpdir } from 'os';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import decisionRecordInit from './decisionRecordInit';

test('02-01 Running decision-record Init', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/02-01'
  );
  await prepare();
  expect(
    () => decisionRecordInit(
      'doc/decision_records',
      'doc/decision_records/.templates',
      '',
      'template',
      'md',
      'en',
      getPath('.')
    )
  ).toBeTruthy();
  await cleanup();
})