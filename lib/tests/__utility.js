import decisionRecordInit from '../decisionRecordInit';

export default function test_init(a_path, opts = {}) {
  let rootPath = 'doc/decision_records';
  if ('rootPath' in opts) {
    rootPath = opts['rootPath'];
  }

  let templatePath = 'doc/decision_records/.templates';
  if ('templatePath' in opts) {
    templatePath = opts['templatePath'];
  }

  let templateSource = '';
  if ('templatePath' in opts) {
    rootPath = opts['templatePath'];
  }

  let templateName = 'template';
  if ('templateName' in opts) {
    templateName = opts['templateName'];
  }

  let templateType = 'md';
  if ('templateType' in opts) {
    templateType = opts['templateType'];
  }

  let templateLanguage = 'en';
  if ('templateLanguage' in opts) {
    templateLanguage = opts['templateLanguage'];
  }

  let adr_format = false;
  if ('adr_format' in opts) {
    adr_format = opts['adr_format'];
  }

  let force = false;
  if ('force' in opts) {
    force = opts['force'];
  }

  let defaultState = "Approved";
  if ('defaultState' in opts) {
    defaultState = opts['defaultState'];
  }

  return decisionRecordInit(
    a_path,
    rootPath,
    templatePath,
    templateSource,
    templateName,
    templateType,
    templateLanguage,
    adr_format,
    force,
    defaultState
  );
};