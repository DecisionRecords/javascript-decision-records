import path from 'path';
import { readdirSync, createReadStream, writeFileSync } from 'fs';
import readline from 'readline';
import { EOL } from 'os';

export function findRecordFile(record, decisionRecordConfig) {
  let decisionRecordDir = decisionRecordConfig.get_recordPath();
  let decisionRecordDirListing = readdirSync(decisionRecordDir);
  for (var i in decisionRecordDirListing) {
    let filename = decisionRecordDirListing[i];
    if (filename.match(/^[\d]{4}-.*\.(md|rst)/)) {
      let thisRecordNumber = parseInt(filename.replace(/^0*([\d]+)-.*\.(md|rst)/, "$1"));
      if (parseInt(record) === thisRecordNumber) {
        return path.join(decisionRecordDir, filename);
      }
    }
  }
  throw "Decision Record not found.";
}

export function findRecordFileName(record, decisionRecordConfig) {
  let decisionRecordDir = decisionRecordConfig.get_recordPath();
  let decisionRecordDirListing = readdirSync(decisionRecordDir);
  for (var i in decisionRecordDirListing) {
    let filename = decisionRecordDirListing[i];
    if (filename.match(/^[\d]{4}-.*\.(md|rst)/)) {
      let thisRecordNumber = parseInt(filename.replace(/^0*([\d]+)-.*\.(md|rst)/, "$1"));
      if (parseInt(record) === thisRecordNumber) {
        return filename;
      }
    }
  }
  throw "Decision Record not found.";
}

export async function addStringToBlock(filename, decisionRecordConfig, heading, newString, addBefore = true, historicPrefix = '') {
  let searchHeading = decisionRecordConfig.get_template_string(heading);
  let regexSearchHeading = new RegExp('^#+\\s+' + searchHeading + '\\s*$');
  let regexSearchAnyHeadingMD = new RegExp('[#]+\\s+.*');
  let regexSearchAnyHeadingRST = new RegExp('[#*]{3}[#*]*');
  let lineReader = readline.createInterface({ input: createReadStream(filename) });
  let isBefore = true;
  let inHeading = false;
  let isAfter = false;
  let returnString = "";
  let isMarkdown = true;
  if (decisionRecordConfig.templateType == 'rst') {
    isMarkdown = false;
  }
  for await (let line of lineReader) {
    line = line + EOL;
    if (!isMarkdown) {
      if (line.match(regexSearchAnyHeadingRST)) {
        inHeading = !inHeading;
      }
    }
    if (isAfter) {                // Injection has occurred
      returnString += line;
    } else if (isBefore) {        // Header has not been found yet
      returnString += line;
      if ((isMarkdown && line.match(regexSearchHeading)) || (!isMarkdown && inHeading && line.match(searchHeading))) {
        isBefore = false;
      }
    } else {                      // Header found, looking for where to inject the text
      if (line.match(/^\s*$/)) {  // Empty line
        returnString += line;
      } else if (addBefore) {
        returnString += newString + EOL + EOL + historicPrefix + line;
        isAfter = true;
      } else if ((isMarkdown && line.match(regexSearchAnyHeadingMD)) || (!isMarkdown && inHeading)) {
        returnString += newString + EOL + EOL + line;
        isAfter = true;
      } else {
        returnString += line;
      }
    }
  };
  writeFileSync(filename, returnString);
  return returnString;
}