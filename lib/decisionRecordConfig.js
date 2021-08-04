import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import { cwd } from 'process';

export default class DecisionRecordConfig {
  recordRoot = ".";
  recordPath = "doc/decision_records";
  templatePath = "doc/decision_records/.templates";
  templateFile = "template";
  systemLanguage = "en-GB";
  templateLanguage = "";
  templateType = "md";
  fullTemplatePath = "doc/decision_records/.templates/template.md";
  dateOnStatus = false;

  constructor(workingDir = cwd()) {
    this._decisionRecordRoot(workingDir);
  }

  _decisionRecordRoot(workingDir = cwd()) {
    // i18n.use(Backend).init({
    //   initImmediate: false,
    //   fallbackLng: 'en',
    //   lng: this.systemLanguage,
    //   preload: readdirSync(join(__dirname, '../locales')).filter((fileName) => {
    //     const joinedPath = join(join(__dirname, '../locales'), fileName)
    //     const isDirectory = lstatSync(joinedPath).isDirectory()
    //     return isDirectory
    //   }),
    //   ns: 'translation',
    //   backend: {
    //     loadPath: join(__dirname, '../locales/{{lng}}/{{ns}}.json')
    //   }
    // })
    if (this.recordRoot !== "." && workingDir !== cwd()) {
      return this.recordRoot;
    } else {
      var directory = resolve(workingDir);
      while (directory != '/' && this.recordRoot == '.') {
        // ADR set this as it's default directory, and used .adr-dir if not found.
        if (existsSync(directory + '/doc/adr/')) {
          this.recordRoot = directory;
          this.recordPath = 'doc/adr';
          this.templatePath = this.recordPath + '/.templates';
        }
        // .adr-dir is the historic way of finding ADR records.
        // It should not take priority over .decisionrecords-config
        if (existsSync(directory + '/.adr-dir')) {
          var _file = readFileSync(directory + '/.adr-dir', 'utf8');
          var _recordPath = _file.split(/\r?\n/);
          if (_recordPath !== null && _recordPath.length > 0 && _recordPath[0] !== '') {
            if (existsSync(directory + '/' + _recordPath[0])) {
              this.recordRoot = directory;
              this.recordPath = _recordPath[0];
              this.templatePath = this.recordPath + '/.templates';
            }
          }
        }
        // If you don't want a .decisionrecords-config file, then this, I guess, starts you in the
        // right direction!
        if (existsSync(directory + '/doc/decision_records/')) {
          this.recordRoot = directory;
          this.recordPath = 'doc/decision_records';
          this.templatePath = this.recordPath + '/.templates';
        }
        // This is the new way of finding Decision Records.
        // It MUST take priority over .adr-dir
        if (existsSync(directory + '/.decisionrecords-config')) {
          var _recordPath = "doc/decision_records";
          var _templateDirPath = '';
          var _configFile = directory + '/.decisionrecords-config';
          var _file = readFileSync(_configFile, 'utf8');

          var _lines = _file.split(/\r?\n/);
          for (var _line = 0; _line < _lines.length; _line++) {
            var _parse = _lines[_line].match(/^records=(.*)$/)
            if (_parse !== null) {
              _recordPath = _parse[1];
            }
            var _parse = _lines[_line].match(/^language=(.*)$/)
            if (_parse !== null) {
              this.systemLanguage = _parse[1];
            }
            var _parse = _lines[_line].match(/^dateOnStatus=(.*)$/)
            if (_parse !== null) {
              if (_parse[1].toLowerCase().match(/yes|1|on|true/)) {
                this.dateOnStatus = true;
              } else {
                this.dateOnStatus = false;
              }
            }
            var _parse = _lines[_line].match(/^templateDir=(.*)$/)
            if (_parse !== null) {
              _templateDirPath = _parse[1];
            }
            var _parse = _lines[_line].match(/^template=(.*)$/)
            if (_parse !== null) {
              this.templateFile = _parse[1];
            }
            var _parse = _lines[_line].match(/^fileType=(.*)$/)
            if (_parse !== null) {
              this.templateType = _parse[1];
            }
          };

          if (existsSync(directory + '/' + _recordPath)) {
            this.recordRoot = directory;
            this.recordPath = _recordPath;
            this.templatePath = this.recordPath + '/.templates'
            this.recordRoot = directory;
          }

          if (_templateDirPath != '') {
            this.templatePath = _templateDirPath;
          }
        }
        directory = resolve(directory + '/../');
      };
      if (this.recordRoot !== '.' && existsSync(this.recordRoot)) {
        if (!existsSync(this.recordRoot + '/' + this.templatePath)) {
          throw "Your template directory was not found. Have you run `decision-record init`, or put your templates in " + this.recordRoot + '/' + this.templatePath + "?";
        } else {
          if (existsSync(this.recordRoot + '/' + this.templatePath + '/' + this.templateFile + '.' + this.systemLanguage + '.' + this.templateType)) {
            this.fullTemplatePath = this.recordRoot + '/' + this.templatePath + '/' + this.templateFile + '.' + this.systemLanguage + '.' + this.templateType;
            this.templateLanguage = this.systemLanguage;
          } else if (existsSync(this.recordRoot + '/' + this.templatePath + '/' + this.templateFile + '.' + this.systemLanguage.replace(/(_|-).*/, '') + '.' + this.templateType)) {
            this.fullTemplatePath = this.recordRoot + '/' + this.templatePath + '/' + this.templateFile + '.' + this.systemLanguage.replace(/(_|-).*/, '') + '.' + this.templateType;
            this.templateLanguage = this.systemLanguage.replace(/(_|-).*/, '');
          } else if (existsSync(this.recordRoot + '/' + this.templatePath + '/' + this.templateFile + '.' + this.templateType)) {
            this.fullTemplatePath = this.recordRoot + '/' + this.templatePath + '/' + this.templateFile + '.' + this.templateType;
            this.templateLanguage = '';
          } else {
            throw "No variation of your desired language with your template file paths were found. Have you run `decision-record init`?";
          }
        }
      } else {
        throw "The decision record root was not discovered. Have you run `decision-record init`?";
      }
    }
  };
}