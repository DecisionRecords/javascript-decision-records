import { tmpdir } from 'os';
import { resolve } from 'path';
import { createTeardown, addDirectory, addFile } from 'fs-teardown';
import DecisionRecordConfig from './decisionRecordConfig';

test('01-00 Does not find a decision record root because no file structures were created', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-00'
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})

test('01-01 Finds a decision record root because it found a doc/adr path', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-01',
    addFile('doc/adr/.templates/template.md', "")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})

test('01-02 Finds a decision record root because it found a doc/decision_records path', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-02',
    addFile('doc/decision_records/.templates/template.md', "")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})

test('01-03 Finds a decision record root because it found a .adr-dir path (unix ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-03',
    addFile('doc/adr01-03/.templates/template.md', ""),
    addFile('.adr-dir', "doc/adr01-03\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})

test('01-03a Finds a decision record root because it found a .adr-dir path (windows ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-03a',
    addFile('doc/adr01-03a/.templates/template.md', ""),
    addFile('.adr-dir', "doc/adr01-03a\r\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})

test('01-03b Finds a decision record root because it found a .adr-dir path (no ending)', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-03b',
    addFile('doc/adr01-03b/.templates/template.md', ""),
    addFile('.adr-dir', "doc/adr01-03b")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.recordRoot).toEqual(resolve(getPath('.')));
  await cleanup();
})

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

test('01-05 Does not find a decision record root because the .adr-dir path points to an invalid location', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-05',
    addDirectory('not_adr01-05'),
    addFile('.adr-dir', "doc/adr01-05\n")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})

test('01-06 Does not find a decision record root because the .decisionrecords-config file points to an invalid location', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-06',
    addDirectory('not_dr01-06'),
    addFile('.decisionrecords-config', "records=dr01-06\n")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})

test('01-07 Does not find a decision record root because the .adr-dir path is empty', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-07',
    addDirectory('adr01-07'),
    addFile('.adr-dir', "")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})

test('01-08 Does not find a decision record root because the .decisionrecords-config file points to an invalid location', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-08',
    addDirectory('dr01-08'),
    addFile('.decisionrecords-config', "")
  );
  await prepare();
  expect(() => new DecisionRecordConfig(getPath('.'))).toThrow("The decision record root was not discovered. Have you run `decision-record init`?");
  await cleanup();
})

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

test('01-10 Use RST based template.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-10',
    addFile('doc/decision_records/.templates/template.rst', ""),
    addFile('.decisionrecords-config', "fileType=rst")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateType).toEqual('rst');
  expect(decisionConfig.fullTemplatePath).toEqual(getPath('.') + '/doc/decision_records/.templates/template.rst');
  await cleanup();
})

test('01-10a Use RST based template with en language.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-10a',
    addFile('doc/decision_records/.templates/template.en.rst', ""),
    addFile('doc/decision_records/.templates/template.rst', ""),
    addFile('.decisionrecords-config', "fileType=rst\nlanguage=en_GB\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateType).toEqual('rst');
  expect(decisionConfig.templateLanguage).toEqual('en');
  expect(decisionConfig.fullTemplatePath).toEqual(getPath('.') + '/doc/decision_records/.templates/template.en.rst');
  await cleanup();
})

test('01-10b Use RST based template with en_GB language.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-10b',
    addFile('doc/decision_records/.templates/template.en_GB.rst', ""),
    addFile('doc/decision_records/.templates/template.en.rst', ""),
    addFile('doc/decision_records/.templates/template.rst', ""),
    addFile('.decisionrecords-config', "fileType=rst\nlanguage=en_GB\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateType).toEqual('rst');
  expect(decisionConfig.templateLanguage).toEqual('en_GB');
  expect(decisionConfig.fullTemplatePath).toEqual(getPath('.') + '/doc/decision_records/.templates/template.en_GB.rst');
  await cleanup();
})

test('01-10c Use RST based template with en_GB language but no en_GB templates.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-10b',
    addFile('doc/decision_records/.templates/template.rst', ""),
    addFile('.decisionrecords-config', "fileType=rst\nlanguage=en_GB\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateType).toEqual('rst');
  expect(decisionConfig.templateLanguage).toEqual('');
  expect(decisionConfig.language).toEqual('en_GB');
  expect(decisionConfig.fullTemplatePath).toEqual(getPath('.') + '/doc/decision_records/.templates/template.rst');
  await cleanup();
})

test('01-11 Use custom template name.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-11',
    addFile('doc/decision_records/.templates/custom_template.md', ""),
    addFile('.decisionrecords-config', "template=custom_template")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateFile).toEqual('custom_template');
  expect(decisionConfig.fullTemplatePath).toEqual(getPath('.') + '/doc/decision_records/.templates/custom_template.md');
  await cleanup();
})

test('01-11a Use custom template name with en language.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-11a',
    addFile('doc/decision_records/.templates/custom_template.en.md', ""),
    addFile('doc/decision_records/.templates/custom_template.md', ""),
    addFile('.decisionrecords-config', "template=custom_template\nlanguage=en_GB\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateLanguage).toEqual('en');
  expect(decisionConfig.fullTemplatePath).toEqual(getPath('.') + '/doc/decision_records/.templates/custom_template.en.md');
  await cleanup();
})

test('01-10b Use custom template name with en_GB language.', async () => {
  const { prepare, getPath, cleanup } = createTeardown(
    tmpdir() + '/test/01-11b',
    addFile('doc/decision_records/.templates/custom_template.en_GB.md', ""),
    addFile('doc/decision_records/.templates/custom_template.en.md', ""),
    addFile('doc/decision_records/.templates/custom_template.md', ""),
    addFile('.decisionrecords-config', "template=custom_template\nlanguage=en_GB\n")
  );
  await prepare();
  var decisionConfig = new DecisionRecordConfig(getPath('.'));
  expect(decisionConfig.templateLanguage).toEqual('en_GB');
  expect(decisionConfig.fullTemplatePath).toEqual(getPath('.') + '/doc/decision_records/.templates/custom_template.en_GB.md');
  await cleanup();
})