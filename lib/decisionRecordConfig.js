import { existsSync, readFileSync } from 'fs';
import path from 'path';
import { cwd } from 'process';

export default class DecisionRecordConfig {
  recordRoot = ".";
  recordPath = path.join("doc", "decision_records");
  templatePath = path.join("doc", "decision_records", ".templates");
  templateFile = "template";
  systemLanguage = "en-GB";
  templateLanguage = "";
  templateType = "md";
  fullTemplatePath = path.join("doc", "decision_records", ".templates", "template.md");
  fullTemplateReferencePath = '';
  dateOnStatus = false;
  templateStrings = {};

  constructor(workingDir = cwd()) {
    this._decisionRecordRoot(workingDir);
  }

  _decisionRecordRoot(workingDir = cwd()) {
    if (this.recordRoot !== "." && workingDir !== cwd()) {
      return this.recordRoot; // TODO: Untested Line
    } else {
      var directory = path.resolve(workingDir);
      while (this.recordRoot == '.' && directory != '/' && !directory.match(/^[A-Za-z]:\\$/)) {
        // ADR set this as it's default directory, and used .adr-dir if not found.
        if (existsSync(path.join(directory, 'doc', 'adr'))) {
          this.recordRoot = directory;
          this.recordPath = path.join('doc', 'adr');
          this.templatePath = path.join(this.recordPath, '.templates');
        }
        // .adr-dir is the historic way of finding ADR records.
        // It should not take priority over .decisionrecords-config
        if (existsSync(path.join(directory, '.adr-dir'))) {
          var _file = readFileSync(path.join(directory, '.adr-dir'), 'utf8');
          if (_file.length > 0) {
            _file = path.normalize(_file.replace(/\\/g, '/'));
            var _recordPath = _file.split(/\r?\n/);
            if (_recordPath !== null && _recordPath.length > 0 && _recordPath[0] !== '') {
              if (existsSync(path.join(directory, _recordPath[0]))) {
                this.recordRoot = directory;
                this.recordPath = _recordPath[0];
                this.templatePath = path.join(this.recordPath, '.templates');
              }
            }
          }
        }
        // If you don't want a .decisionrecords-config file, then this, I guess, starts you in the
        // right direction!
        if (existsSync(path.join(directory, 'doc', 'decision_records'))) {
          this.recordRoot = directory;
          this.recordPath = path.join('doc', 'decision_records');
          this.templatePath = path.join(this.recordPath, '.templates');
        }
        // This is the new way of finding Decision Records.
        // It MUST take priority over .adr-dir
        if (existsSync(path.join(directory, '.decisionrecords-config'))) {
          var _recordPath = path.join('doc', 'decision_records');
          var _templateDirPath = '';
          var _configFile = path.join(directory, '.decisionrecords-config');
          var _file = readFileSync(_configFile, 'utf8');

          var _lines = _file.split(/\r?\n/);
          for (var _line = 0; _line < _lines.length; _line++) {
            var _parse = _lines[_line].match(/^records=(.*)$/);
            if (_parse !== null) {
              _recordPath = path.normalize(_parse[1]);
            }
            var _parse = _lines[_line].match(/^language=(.*)$/);
            if (_parse !== null) {
              this.systemLanguage = _parse[1];
            }
            var _parse = _lines[_line].match(/^dateOnStatus=(.*)$/);
            if (_parse !== null) {
              if (_parse[1].toLowerCase().match(/yes|1|on|true/)) {
                this.dateOnStatus = true; // TODO: Untested Line
              } else {
                this.dateOnStatus = false; // TODO: Untested Line
              }
            }
            var _parse = _lines[_line].match(/^templateDir=(.*)$/);
            if (_parse !== null) {
              _templateDirPath = path.normalize(_parse[1]); // TODO: Untested Line
            }
            var _parse = _lines[_line].match(/^template=(.*)$/);
            if (_parse !== null) {
              this.templateFile = _parse[1];
            }
            var _parse = _lines[_line].match(/^fileType=(.*)$/);
            if (_parse !== null) {
              this.templateType = _parse[1];
            }
          };

          if (existsSync(path.join(directory, _recordPath))) {
            this.recordRoot = directory;
            this.recordPath = _recordPath;
            this.templatePath = path.join(this.recordPath, '.templates');
            this.recordRoot = directory;
          }

          if (_templateDirPath != '') {
            this.templatePath = _templateDirPath; // TODO: Untested Line
          }
        }
        directory = path.resolve(path.join(directory, '..'));
      };
      if (this.recordRoot !== '.' && existsSync(this.recordRoot)) {
        if (!existsSync(path.join(this.recordRoot, this.templatePath))) {
          throw "Your template directory was not found. Have you run `decision-record init`, or put your templates in " + this.recordRoot + '/' + this.templatePath + "?";
        } else {
          if (existsSync(path.join(this.recordRoot, this.templatePath, this.templateFile + '.' + this.systemLanguage + '.' + this.templateType))) {
            this.fullTemplatePath = path.join(this.recordRoot, this.templatePath, this.templateFile + '.' + this.systemLanguage + '.' + this.templateType);
            this.templateLanguage = this.systemLanguage;
            if (existsSync(path.join(this.recordRoot, this.templatePath, this.templateFile + '.' + this.systemLanguage + '.ref'))) {
              this.fullTemplateReferencePath = path.join(this.recordRoot, this.templatePath, this.templateFile + '.' + this.systemLanguage + '.ref'); // TODO: Untested Line
            }
          } else if (existsSync(path.join(this.recordRoot, this.templatePath, this.templateFile + '.' + this.systemLanguage.replace(/(_|-).*/, '') + '.' + this.templateType))) {
            this.fullTemplatePath = path.join(this.recordRoot, this.templatePath, this.templateFile + '.' + this.systemLanguage.replace(/(_|-).*/, '') + '.' + this.templateType);
            this.templateLanguage = this.systemLanguage.replace(/(_|-).*/, '');
            if (existsSync(path.join(this.recordRoot, this.templatePath, this.templateFile + '.' + this.systemLanguage.replace(/(_|-).*/, '') + '.ref'))) {
              this.fullTemplateReferencePath = path.join(this.recordRoot, this.templatePath, this.templateFile + '.' + this.systemLanguage.replace(/(_|-).*/, '') + '.ref'); // TODO: Untested Line
            }
          } else if (existsSync(path.join(this.recordRoot, this.templatePath, this.templateFile + '.' + this.templateType))) {
            this.fullTemplatePath = path.join(this.recordRoot + '/' + this.templatePath + '/' + this.templateFile + '.' + this.templateType);
            this.templateLanguage = '';
            if (existsSync(path.join(this.recordRoot, this.templatePath, this.templateFile + '.ref'))) {
              this.fullTemplateReferencePath = path.join(this.recordRoot, this.templatePath, this.templateFile + '.ref'); // TODO: Untested Line
            }
          } else {
            throw "No variation of your desired language with your template file paths were found. Have you run `decision-record init`?"; // TODO: Untested Line
          }
        }
        if (this.fullTemplateReferencePath.length > 0) {
          var _file = readFileSync(this.fullTemplateReferencePath, 'utf8');
          var _lines = _file.split(/\r?\n/);
          for (var _line = 0; _line < _lines.length; _line++) {
            var _parse = _lines[_line].match(/^([^=]+)="(.*)"$/)
            templateStrings[_parse[1]] = _parse[2];
          }
        }
      } else {
        throw "The decision record root was not discovered. Have you run `decision-record init`?";
      }
    }
  };

  get_recordPath() {
    return path.join(this.recordRoot, this.recordPath);
  };

  get_templatePath() {
    return path.join(this.recordRoot, this.templatePath); // TODO: Untested Line
  }

  get_language() {
    return this.systemLanguage; // TODO: Untested Line
  }

  get_templateLanguage() {
    return this.templateLanguage; // TODO: Untested Line
  }

  get_template_string(key) {
    if (key in this.templateStrings) {
      return this.templateStrings[key];
    } else {
      return key;
    }
  }
}
