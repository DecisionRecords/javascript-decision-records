import decisionRecordInit from './decisionRecordInit.js';

export default function do_init(args, opts) {
  var decisionRecordDir = ''
  var templateDir = ''
  var templateSource = ''
  var templateFile = ''
  var templateType = ''
  var systemLanguage = ''
  var adr_format = false
  var force = false
  if ('directory' in args) {
    decisionRecordDir = args['directory'];
  }
  if ('adr' in opts) {
    adr_format = true;
  }
  if ('template' in opts) {
    templateFile = opts['template'];
  }
  if ('format' in opts) {
    templateType = opts['format'];
  }
  if ('language' in opts) {
    systemLanguage = opts['language'];
  }
  if ('templatedirectory' in opts) {
    templateDir = opts['templatedirectory'];
  } 
  if ('source' in opts) {
    templateSource = opts['source'];
  }
  if ('force' in opts) {
    force = true;
  }
  decisionRecordInit(
    decisionRecordDir,
    templateDir,
    templateSource,
    templateFile,
    templateType,
    systemLanguage,
    '.',
    adr_format,
    force
  )
}