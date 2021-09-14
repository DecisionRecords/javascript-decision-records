import { tmpdir } from 'os';
import path from 'path';
import { createTeardown, addFile } from 'fs-teardown';
import DecisionRecordConfig from '../decisionRecordConfig';

test('01-10 Use RST based template.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_01-10'),
    addFile(path.join('doc', 'decision_records', '.templates', 'template.rst'), ""),
    addFile('.decisionrecords-config', "fileType=rst")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateType).toEqual('rst');
  expect(decisionConfig.fullTemplatePath).toEqual(path.join(getPath('.'), 'doc', 'decision_records', '.templates', 'template.rst'));
  await cleanup();
})

test('01-10a Use RST based template with en language.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test' + Math.floor(Date.now() / 1000), '01-10a'),
    addFile(path.join('doc', 'decision_records', '.templates', 'template.en.rst'), ""),
    addFile(path.join('doc', 'decision_records', '.templates', 'template.rst'), ""),
    addFile('.decisionrecords-config', "fileType=rst\nlanguage=en_GB\n")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateType).toEqual('rst');
  expect(decisionConfig.templateLanguage).toEqual('en');
  expect(decisionConfig.fullTemplatePath).toEqual(path.join(getPath('.'), 'doc', 'decision_records', '.templates', 'template.en.rst'));
  await cleanup();
})

test('01-10b Use RST based template with en_GB language.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test' + Math.floor(Date.now() / 1000), '01-10b'),
    addFile(path.join('doc', 'decision_records', '.templates', 'template.en_GB.rst'), ""),
    addFile(path.join('doc', 'decision_records', '.templates', 'template.en.rst'), ""),
    addFile(path.join('doc', 'decision_records', '.templates', 'template.rst'), ""),
    addFile('.decisionrecords-config', "fileType=rst\nlanguage=en_GB\n")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateType).toEqual('rst');
  expect(decisionConfig.templateLanguage).toEqual('en_GB');
  expect(decisionConfig.fullTemplatePath).toEqual(path.join(getPath('.'), 'doc', 'decision_records', '.templates', 'template.en_GB.rst'));
  await cleanup();
})

test('01-10c Use RST based template with en_GB language but no en_GB templates.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test' + Math.floor(Date.now() / 1000), '01-10b'),
    addFile(path.join('doc', 'decision_records', '.templates', 'template.rst'), ""),
    addFile('.decisionrecords-config', "fileType=rst\nlanguage=en_GB\n")
  );
  await prepare();
  let decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateType).toEqual('rst');
  expect(decisionConfig.templateLanguage).toEqual('');
  expect(decisionConfig.systemLanguage).toEqual('en_GB');
  expect(decisionConfig.fullTemplatePath).toEqual(path.join(getPath('.'), 'doc', 'decision_records', '.templates', 'template.rst'));
  await cleanup();
})