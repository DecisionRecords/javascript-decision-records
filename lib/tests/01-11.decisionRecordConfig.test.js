import { tmpdir } from 'os';
import path from 'path';
import { createTeardown, addFile } from 'fs-teardown';
import DecisionRecordConfig from '../decisionRecordConfig';

test('01-11 Use custom template name.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test', '01-11'),
    addFile(path.join('doc', 'decision_records', '.templates', 'custom_template.md'), ""),
    addFile('.decisionrecords-config', "template=custom_template")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateFile).toEqual('custom_template');
  expect(decisionConfig.fullTemplatePath).toEqual(path.join(getPath('.'), 'doc', 'decision_records', '.templates', 'custom_template.md'));
  await cleanup();
})

test('01-11a Use custom template name with en language.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test', '01-11a'),
    addFile(path.join('doc', 'decision_records', '.templates', 'custom_template.en.md'), ""),
    addFile(path.join('doc', 'decision_records', '.templates', 'custom_template.md'), ""),
    addFile('.decisionrecords-config', "template=custom_template\nlanguage=en_GB\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateLanguage).toEqual('en');
  expect(decisionConfig.fullTemplatePath).toEqual(path.join(getPath('.'), 'doc', 'decision_records', '.templates', 'custom_template.en.md'));
  await cleanup();
})

test('01-11b Use custom template name with en_GB language.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test', '01-11b'),
    addFile(path.join('doc', 'decision_records', '.templates', 'custom_template.en_GB.md'), ""),
    addFile(path.join('doc', 'decision_records', '.templates', 'custom_template.en.md'), ""),
    addFile(path.join('doc', 'decision_records', '.templates', 'custom_template.md'), ""),
    addFile('.decisionrecords-config', "template=custom_template\nlanguage=en_GB\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateLanguage).toEqual('en_GB');
  expect(decisionConfig.fullTemplatePath).toEqual(path.join(getPath('.'), 'doc', 'decision_records', '.templates', 'custom_template.en_GB.md'));
  await cleanup();
})