import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { config, cwd } from 'process';
import path from 'path';
import { __dirname } from './__dirname.cjs';

function _copyTemplateIn(
  decisionRecordDir,
  workingDir,
  templateDir,
  templateFile,
  systemLanguage,
  templateType,
  sourcePath = path.join(__dirname, '..' , 'templates')
) {
  if (templateDir.length == 0) {
    templateDir = path.join(decisionRecordDir, '.templates');
  }

  if (templateFile.length == 0) {
    templateFile = 'template';
  }

  if (systemLanguage.length == 0) {
    systemLanguage = 'en';
  }

  var source_template_file = path.resolve(path.join(sourcePath, templateFile + '.' + systemLanguage + '.' + templateType));
  var source_language_file = path.resolve(path.join(sourcePath, templateFile + '.' + systemLanguage + '.ref'));

  if (!existsSync(source_template_file)) {
    source_template_file = path.resolve(path.join(sourcePath, templateFile + '.' + systemLanguage.split('_-')[0] + '.' + templateType));
    source_language_file = path.resolve(path.join(sourcePath, templateFile + '.' + systemLanguage.split('_-')[0] + '.ref'));
    
    if (!existsSync(source_template_file)) {
      source_template_file = path.resolve(path.join(sourcePath, templateFile + '.' + templateType));
      source_language_file = path.resolve(path.join(sourcePath, templateFile + '.ref'));
    }
    
    if (!existsSync(source_template_file)) {
      console.log("A specific template for your language was not found. The English template was used instead, and a pull request on the project would be gratefully received!");
      source_template_file = path.resolve(path.join(sourcePath, templateFile + '.en.' + templateType));
      source_language_file = path.resolve(path.join(sourcePath, templateFile + '.en.ref'));
    }
  }

  if (!existsSync(path.join(workingDir, templateDir))) {
    mkdirSync(path.join(workingDir, templateDir), { recursive: true });
  }

  writeFileSync(path.join(workingDir, templateDir, templateFile + '.' + templateType), readFileSync(source_template_file, 'utf8'));
  if (existsSync(source_language_file)) {
    writeFileSync(path.join(workingDir, templateDir, templateFile + '.ref'), readFileSync(source_language_file, 'utf8'));
  }
}

export default function decisionRecordInit(
  decisionRecordDir = '',
  templateDir = '',
  templateSource = '',
  templateFile = '',
  templateType = '',
  systemLanguage = '',
  workingDir = cwd(),
  adr_format = false,
  force = false
) {
  decisionRecordDir = decisionRecordDir.trim();
  templateDir = templateDir.trim();
  templateSource = templateSource.trim();
  templateFile = templateFile.trim();
  templateType = templateType.trim();
  systemLanguage = systemLanguage.trim();

  if (!force && existsSync(workingDir + '/.decisionrecords-config')) {
    throw "Your config file already exists. Either remove this config file, or create, manually, your target files and directories."
  } else {
    var config_content = ""
    if (decisionRecordDir.length == 0) {
      if (adr_format) {
        decisionRecordDir = 'doc/adr';
      } else {
        decisionRecordDir = 'doc/decision_records';
      }
    } else {
      config_content += "records=" + decisionRecordDir + "\n";
    }
    if (templateDir.length > 0) {
      config_content += "templatedir=" + templateDir + "\n";
    }
    if (templateFile.length > 0) {
      config_content += "template=" + templateFile + "\n";
    }
    if (templateType.length == 0) {
      templateType = 'md';
    } else {
      if (templateType != "md" && templateType != 'rst') {
        throw "The default filetype can currently only be a Markdown file, or a rst file. Please fix and try again, or raise a pull request.";
      } else {
        config_content += "filetype=" + templateType + "\n";
      }
    }

    if (systemLanguage.match(/^([a-z]{2}-[A-Z]{2}|[a-z]{2}_[A-Z]{2}|[a-z]{2}|)$/) === null) {
      throw "The language must use either the two letter language code (e.g. en) or the two letter language and two letter dialect code (e.g. en_GB or en-GB). Please try again."
    } else {
      if (systemLanguage.length > 0) {
        config_content += "language=" + systemLanguage + "\n";
      }
    }
    if (!existsSync(workingDir + '/' + decisionRecordDir)) {
      mkdirSync(workingDir + '/' + decisionRecordDir, { recursive: true });
    }

    if (templateSource.length == 0) {
      _copyTemplateIn(decisionRecordDir, workingDir, templateDir, templateFile, systemLanguage, templateType);
    } else if (templateSource.match(/^(\w+:\/\/)(.+@)*([\w\d\.]+)(:[\d]+){0,1}\/*(.*)|file:\/\/(.*)|(.+@)*([\w\d\.]+):(.*)/) !== null) {
      if (templateSource.match(/^file:\/\//) && !existsSync(path.resolve(templateSource.substring(7) + '/.git/refs'))) {
        _copyTemplateIn(decisionRecordDir, workingDir, templateDir, templateFile, systemLanguage, templateType, templateSource.substring(7) + '/');
      } else if (templateSource.match(/^\//) && !existsSync(path.resolve(templateSource + '/.git/refs'))) {
        _copyTemplateIn(decisionRecordDir, workingDir, templateDir, templateFile, systemLanguage, templateType, templateSource + '/');
      } else {
        console.log("Currently, this doesn't support performing git commands. Please either run `git clone " + templateSource + " " + workingDir + '/' + templateDir + '` or `git submodule add ' + templateSource + " " + workingDir + '/' + templateDir + '`')
      }
    }
    writeFileSync(workingDir + '/.decisionrecords-config', config_content);
  }
  return true;
}
