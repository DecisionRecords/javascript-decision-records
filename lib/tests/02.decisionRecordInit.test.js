import { tmpdir } from 'os';
import { createTeardown } from 'fs-teardown';
import path from 'path';
import test_init from './__utility.js';

test('02-01 Running decision-record Init', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    path.join(tmpdir(), 'test_' + Date.now() + '_02-01')
  );
  await prepare();
  let decisionRecordConfig = test_init(getPath('.'));
  expect(decisionRecordConfig.recordRoot).toEqual(path.resolve(getPath('.')));
  expect(decisionRecordConfig.recordPath).toEqual(path.join('doc', 'decision_records'));
  expect(decisionRecordConfig.templatePath).toEqual(path.join('doc', 'decision_records', '.templates'));
  expect(decisionRecordConfig.templateFile).toEqual("template");
  expect(decisionRecordConfig.systemLanguage).toEqual("en");
  expect(decisionRecordConfig.templateLanguage).toEqual("en");
  expect(decisionRecordConfig.templateType).toEqual("md");
  expect(decisionRecordConfig.fullTemplatePath).toEqual(path.join(getPath('.'), 'doc', 'decision_records', '.templates', 'template.en.md'));
  expect(decisionRecordConfig.fullTemplateReferencePath).toEqual("");
  expect(decisionRecordConfig.dateOnStatus).toEqual(false);
  await cleanup();
})

//// TODO: Currently fails as RST templates fail :(
// test('02-02 Running decision-record Init', async () => {
//   const { prepare, getPath, cleanup } = createTeardown(
//     path.join(tmpdir(), 'test_' + Date.now() + '_02-02')
//   );
//   await prepare();
//   var decisionRecordConfig = decisionRecordInit(
//     getPath('.'),
//     path.join('doc', 'decision_records'),
//     path.join('doc', 'decision_records', '.templates'),
//     '',
//     'template',
//     'rst',
//     'en'
//   )
//   expect(decisionRecordConfig.recordRoot).toEqual(path.resolve(getPath('.')));
//   expect(decisionRecordConfig.recordPath).toEqual(path.join('doc', 'decision_records'));
//   expect(decisionRecordConfig.templatePath).toEqual(path.join('doc', 'decision_records', '.templates'));
//   expect(decisionRecordConfig.templateFile).toEqual("template");
//   expect(decisionRecordConfig.systemLanguage).toEqual("en");
//   expect(decisionRecordConfig.templateLanguage).toEqual("en");
//   expect(decisionRecordConfig.templateType).toEqual("rst");
//   expect(decisionRecordConfig.fullTemplatePath).toEqual(path.join(getPath('.'), 'doc', 'decision_records', '.templates', 'template.en.rst'));
//   expect(decisionRecordConfig.fullTemplateReferencePath).toEqual("");
//   expect(decisionRecordConfig.dateOnStatus).toEqual(false);
//   await cleanup();
// })