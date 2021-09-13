import { existsSync, writeFileSync, readFileSync, readdirSync } from 'fs';
import slug from 'limax';
import log from './__log.js';
import { logOptions } from './__log.js';
import path from 'path';
import DecisionRecordConfig from './decisionRecordConfig.js';

export default function decisionRecordNew(args, opts, testing = {}) {
  var recordNumber = 0;
  var recordTitle = args.title.join(" ");
  var recordDate;
  var recordStatus = "Approved";
  var linkRecords = [];
  var amendRecords = [];
  var deprecateRecords = [];
  var isVerbose = logOptions(args, opts);

  // Test data injection!
  if ('date' in testing) {
    recordDate = String(testing['date']);
  } else {
    recordDate = String(new Date().getFullYear() + "-" + new Date().getMonth() + "-" + new Date().getDate()); // TODO: Untested Line
  }

  if ('config' in testing) {
    var decisionRecordConfig = testing['config'];
  } else {
    var decisionRecordConfig = new DecisionRecordConfig('.'); // TODO: Untested Line
  }

  var decisionRecordDir = decisionRecordConfig.get_recordPath();
  var decisionRecordDirListing = readdirSync(decisionRecordDir);
  for (var i in decisionRecordDirListing) {
    var filename = decisionRecordDirListing[i];
    if (filename.match(/^[\d]{4}-.*\.(md|rst)/)) {
      var thisRecordNumber = parseInt(filename.replace(/^0*([\d]+)-.*\.(md|rst)/, "$1")); // TODO: Untested Line
      if (thisRecordNumber > recordNumber) {
        recordNumber = thisRecordNumber; // TODO: Untested Line
      }
    }
  }

  recordNumber = recordNumber + 1;

  if (opts.proposed === true && opts.approved === true) {
    throw "Error - --proposed and --approved are mutually exclusive"; // TODO: Untested Line
  };

  if (opts.proposed === true) {
    recordStatus = "Proposed";
  }

  if ('link' in opts) {
    for (var record in opts.link) {
      linkRecords.push(opts.link[record]); // TODO: Untested Line
    }
  }

  if ('amend' in opts) {
    for (var record in opts.amend) {
      amendRecords.push(opts.amend[record]); // TODO: Untested Line
    }
  }

  if ('deprecate' in opts) {
    for (var record in opts.deprecate) {
      deprecateRecords.push(opts.deprecate[record]); // TODO: Untested Line
    }
  }

  log('======== Variable parsing done', isVerbose);
  log("", isVerbose);

  log("Record Number: " + recordNumber, isVerbose);
  log("Record title: " + recordTitle, isVerbose);
  log("Record date: " + recordDate, isVerbose);
  log("Status: " + recordStatus, isVerbose);
  log("Linked: " + linkRecords, isVerbose);
  log("Amend: " + amendRecords, isVerbose);
  log("Deprecate: " + deprecateRecords, isVerbose);

  var filetitle = slug(
    String(recordNumber).padStart(4, "0") + " " + recordTitle, { separateApostrophes: true }
  ) + "." + decisionRecordConfig.templateType;

  log("Based on variables passed in, the file title will be: " + filetitle, isVerbose);

  if (!existsSync(path.join(decisionRecordConfig.get_recordPath(), filetitle))) {
    var template = readFileSync(decisionRecordConfig.fullTemplatePath, 'utf8').toString();
    template = template.replace('NUMBER', String(recordNumber).toString())
      .replace('TITLE', recordTitle)
      .replace('DATE', recordDate)
      .replace('STATUS', recordStatus);
    writeFileSync(path.join(decisionRecordConfig.get_recordPath(), filetitle), template);
    log("Created Decision Record: " + path.join(decisionRecordConfig.get_recordPath(), filetitle), isVerbose);
    // TODO: Link, Amend, Deprecate links

    return template;
  } else {
    throw "Decision record already exists!"; // TODO: Untested Line
  }
};
