import decisionRecordInit from './decisionRecordInit.js';
import { logOptions } from './__log.js';

export default function do_init(args, opts) {
  let decisionRecordDir = '';
  let templateDir = '';
  let templateSource = '';
  let templateFile = '';
  let templateType = '';
  let systemLanguage = '';
  let adr_format = false;
  let force = false;
  let defaultState = "Accepted";
  let isVerbose = logOptions(args, opts);

  if ('directory' in args) {
    decisionRecordDir = args['directory'];
    log('decisionRecordDir: ' + decisionRecordDir, isVerbose);
  }
  if ('adr' in opts && opts['adr']) {
    adr_format = true;
    log('adr_format: ' + adr_format, isVerbose);
  }
  if ('template' in opts) {
    templateFile = opts['template'];
    log('templateFile: ' + templateFile, isVerbose);
  }
  if ('format' in opts) {
    templateType = opts['format'];
    log('templateType: ' + templateType, isVerbose);
  }
  if ('language' in opts) {
    systemLanguage = opts['language'];
    log('systemLanguage: ' + systemLanguage, isVerbose);
  }
  if ('templatedirectory' in opts) {
    templateDir = opts['templatedirectory'];
    log('templateDir: ' + templateDir, isVerbose);
  }
  if ('source' in opts) {
    templateSource = opts['source'];
    log('templateSource: ' + templateSource, isVerbose);
  }
  if ('force' in opts && opts['force']) {
    force = true;
    log('force: ' + force, isVerbose);
  }
  if ('defaultProposed' in opts && opts['defaultProposed']) {
    defaultState = 'Proposed';
    log('defaultState: ' + defaultState, isVerbose);
  }
  log('======== Variable parsing done', isVerbose);
  log("", isVerbose);

  decisionRecordInit(
    '.',
    decisionRecordDir,
    templateDir,
    templateSource,
    templateFile,
    templateType,
    systemLanguage,
    adr_format,
    force,
    defaultState,
    isVerbose
  );
}