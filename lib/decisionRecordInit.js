import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { cwd } from 'process';
import path from 'path';
import pkg from './__dirname.cjs';
const { __dirname } = pkg;
import { EOL } from 'os';
import DecisionRecordConfig from './decisionRecordConfig.js';
import log from './__log.js';
import { logOptions } from './__log.js';

function _copyTemplateIn(
  isVerbose,
  decisionRecordDir,
  workingDir,
  templateDir,
  templateFile,
  systemLanguage,
  templateType,
  sourcePath = path.join(__dirname, '..', 'templates')
) {
  if (templateDir.length == 0) {
    templateDir = path.join(decisionRecordDir, '.templates'); // TODO: Untested Line
  }

  if (templateFile.length == 0) {
    templateFile = 'template'; // TODO: Untested Line
  }

  if (systemLanguage.length == 0) {
    systemLanguage = 'en'; // TODO: Untested Line
    if (isVerbose) {
      console.log("No language provided. Falling back to 'en'."); // TODO: Untested Line
    }
  }

  var source_template_file = path.resolve(path.join(sourcePath, templateFile + '.' + systemLanguage + '.' + templateType));
  var source_language_file = path.resolve(path.join(sourcePath, templateFile + '.' + systemLanguage + '.ref'));
  var destination_template_file = path.resolve(path.join(workingDir, templateDir, templateFile + '.' + systemLanguage + '.' + templateType));
  var destination_language_file = path.resolve(path.join(workingDir, templateDir, templateFile + '.' + systemLanguage + '.ref'));

  if (!existsSync(source_template_file)) {
    log("Did not find the source template file: " + source_template_file, isVerbose); // TODO: Untested Line
    source_template_file = path.resolve(path.join(sourcePath, templateFile + '.' + systemLanguage.split('_')[0].split('-')[0] + '.' + templateType)); // TODO: Untested Line
    source_language_file = path.resolve(path.join(sourcePath, templateFile + '.' + systemLanguage.split('_')[0].split('-')[0] + '.ref')); // TODO: Untested Line
    destination_template_file = path.resolve(path.join(workingDir, templateDir, templateFile + '.' + systemLanguage.split('_')[0].split('-')[0] + '.' + templateType)); // TODO: Untested Line
    destination_language_file = path.resolve(path.join(workingDir, templateDir, templateFile + '.' + systemLanguage.split('_')[0].split('-')[0] + '.ref')); // TODO: Untested Line

    if (!existsSync(source_template_file)) {
      log("Did not find the source template file: " + source_template_file, isVerbose); // TODO: Untested Line
      source_template_file = path.resolve(path.join(sourcePath, templateFile + '.' + templateType)); // TODO: Untested Line
      source_language_file = path.resolve(path.join(sourcePath, templateFile + '.ref')); // TODO: Untested Line
      destination_template_file = path.resolve(path.join(workingDir, templateDir, templateFile + '.' + templateType)); // TODO: Untested Line
      destination_language_file = path.resolve(path.join(workingDir, templateDir, templateFile + '.' + '.ref')); // TODO: Untested Line
    }

    if (!existsSync(source_template_file)) {
      log("Did not find the source template file: " + source_template_file, isVerbose); // TODO: Untested Line
      source_template_file = path.resolve(path.join(sourcePath, templateFile + '.en.' + templateType)); // TODO: Untested Line
      source_language_file = path.resolve(path.join(sourcePath, templateFile + '.en.ref')); // TODO: Untested Line
      destination_template_file = path.resolve(path.join(workingDir, templateDir, templateFile + '.' + templateType)); // TODO: Untested Line
      destination_language_file = path.resolve(path.join(workingDir, templateDir, templateFile + '.ref')); // TODO: Untested Line
    }
  }

  log("Source template found: " + source_template_file, isVerbose); // TODO: Untested Line

  if (!existsSync(path.join(workingDir, templateDir))) {
    mkdirSync(path.join(workingDir, templateDir), { recursive: true });
  }

  writeFileSync(destination_template_file, readFileSync(source_template_file, 'utf8'));
  if (existsSync(source_language_file)) {
    writeFileSync(destination_language_file, readFileSync(source_language_file, 'utf8')); // TODO: Untested Line
  }
}

export default function decisionRecordInit(
  workingDir = cwd(),
  decisionRecordDir = '',
  templateDir = '',
  templateSource = '',
  templateFile = '',
  templateType = '',
  systemLanguage = '',
  adr_format = false,
  force = false,
  defaultState = "Approved",
  isVerbose = false
) {
  decisionRecordDir = decisionRecordDir.trim();
  templateDir = templateDir.trim();
  templateSource = templateSource.trim();
  templateFile = templateFile.trim();
  templateType = templateType.trim();
  systemLanguage = systemLanguage.trim();

  if (force === false && existsSync(workingDir + '/.decisionrecords-config')) {
    throw "Your config file already exists. Either remove this config file, or create, manually, your target files and directories." // TODO: Untested Line
  } else {
    var config_content = ""
    if (decisionRecordDir.length == 0) {
      if (adr_format) {
        decisionRecordDir = 'doc/adr'; // TODO: Untested Line
      } else {
        decisionRecordDir = 'doc/decision_records'; // TODO: Untested Line
      }
    } else {
      config_content += "records=" + decisionRecordDir + EOL;
    }
    if (templateDir.length > 0) {
      config_content += "templatedir=" + templateDir + EOL;
    }
    if (templateFile.length > 0) {
      config_content += "template=" + templateFile + EOL;
    }
    if (templateType.length == 0) {
      templateType = 'md'; // TODO: Untested Line
    } else {
      if (templateType != "md" && templateType != 'rst') {
        throw "The default filetype can currently only be a Markdown file, or a rst file. Please fix and try again, or raise a pull request."; // TODO: Untested Line
      } else {
        config_content += "filetype=" + templateType + EOL;
      }
    }
    if (defaultState.length > 0) {
      config_content += "state=" + defaultState + EOL;
    }

    if (systemLanguage.match(/^([a-z]{2}-[A-Z]{2}|[a-z]{2}_[A-Z]{2}|[a-z]{2}|)$/) === null) {
      throw "The language must use either the two letter language code (e.g. en) or the two letter language and two letter dialect code (e.g. en_GB or en-GB). Please try again." // TODO: Untested Line
    } else {
      if (systemLanguage.length > 0) {
        config_content += "language=" + systemLanguage + EOL;
      }
    }
    if (!existsSync(workingDir + '/' + decisionRecordDir)) {
      mkdirSync(workingDir + '/' + decisionRecordDir, { recursive: true });
    }

    if (templateSource.length == 0) {
      _copyTemplateIn(isVerbose, decisionRecordDir, workingDir, templateDir, templateFile, systemLanguage, templateType);
    } else if (templateSource.match(/^(\w+:\/\/)(.+@)*([\w\d\.]+)(:[\d]+){0,1}\/*(.*)|file:\/\/(.*)|(.+@)*([\w\d\.]+):(.*)/) !== null) {
      if (templateSource.match(/^file:\/\//) && !existsSync(path.resolve(templateSource.substring(7) + '/.git/refs'))) {
        _copyTemplateIn(isVerbose, decisionRecordDir, workingDir, templateDir, templateFile, systemLanguage, templateType, templateSource.substring(7) + '/'); // TODO: Untested Line
      } else if (templateSource.match(/^\//) && !existsSync(path.resolve(templateSource + '/.git/refs'))) {
        _copyTemplateIn(isVerbose, decisionRecordDir, workingDir, templateDir, templateFile, systemLanguage, templateType, templateSource + '/'); // TODO: Untested Line
      } else {
        log("Currently, this doesn't support performing git commands. Please either run `git clone " + templateSource + " " + workingDir + '/' + templateDir + '` or `git submodule add ' + templateSource + " " + workingDir + '/' + templateDir + '`', true); // TODO: Untested Line
      }
    }
    writeFileSync(workingDir + '/.decisionrecords-config', config_content);
  }

  var decisionRecordConfig = new DecisionRecordConfig(workingDir);
  return decisionRecordConfig;
}
