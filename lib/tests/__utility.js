import decisionRecordInit from '../decisionRecordInit';

export default function test_init(a_path, opts = {}) {
  var rootPath = 'doc/decision_records';
  if ('rootPath' in opts) {
    rootPath = opts['rootPath'];
  }

  var templatePath = 'doc/decision_records/.templates';
  if ('templatePath' in opts) {
    templatePath = opts['templatePath'];
  }

  var templateSource = '';
  if ('templatePath' in opts) {
    rootPath = opts['templatePath'];
  }

  var templateName = 'template';
  if ('templateName' in opts) {
    templateName = opts['templateName'];
  }

  var templateType = 'md';
  if ('templateType' in opts) {
    templateType = opts['templateType'];
  }

  var templateLanguage = 'en';
  if ('templateLanguage' in opts) {
    templateLanguage = opts['templateLanguage'];
  }

  var adr_format = false;
  if ('adr_format' in opts) {
    adr_format = opts['adr_format'];
  }

  var force = false;
  if ('force' in opts) {
    force = opts['force'];
  }

  var defaultState = "Approved";
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