import { logOptions } from './__log.js';
import DecisionRecordConfig from './decisionRecordConfig.js';
import { findRecordFile, addStringToBlock } from './__recordUtilities.js';

export async function make_approved(record, decisionRecordConfig, isVerbose = false) {
  let filename = findRecordFile(record, decisionRecordConfig);
  return await addStringToBlock(filename, decisionRecordConfig, 'Status', 'Approved', true, 'Previously: ');
}

export async function set_approved_records(args, opts, testing = {}) {
  let isVerbose = logOptions(args, opts);

  if ('config' in testing) {
    let decisionRecordConfig = testing['config'];
  } else {
    let decisionRecordConfig = new DecisionRecordConfig('.'); // TODO: Untested Line
  }

  let result = [];
  for (var record in args['record']) {
    result.push(await make_approved(record, decisionRecordConfig, isVerbose));
  }
  return result;
}

export async function make_proposed(record, decisionRecordConfig, isVerbose = false) {
  let filename = findRecordFile(record, decisionRecordConfig);
  return await addStringToBlock(filename, decisionRecordConfig, 'Status', 'Proposed', true, 'Previously: ');
}

export async function set_proposed_records(args, opts, testing = {}) {
  let isVerbose = logOptions(args, opts);

  if ('config' in testing) {
    let decisionRecordConfig = testing['config'];
  } else {
    let decisionRecordConfig = new DecisionRecordConfig('.'); // TODO: Untested Line
  }

  let result = [];
  for (var record in args['record']) {
    result.push(await make_proposed(record, decisionRecordConfig, isVerbose));
  }
}

export async function link_records(args, opts, testing = {}) {
  let isVerbose = logOptions(args, opts);

  if ('config' in testing) {
    let decisionRecordConfig = testing['config'];
  } else {
    let decisionRecordConfig = new DecisionRecordConfig('.'); // TODO: Untested Line
  }

}

export async function deprecate_record(args, opts, testing = {}) {
  let isVerbose = logOptions(args, opts);

  if ('config' in testing) {
    let decisionRecordConfig = testing['config'];
  } else {
    let decisionRecordConfig = new DecisionRecordConfig('.'); // TODO: Untested Line
  }

}

export async function amend_record(args, opts, testing = {}) {
  let isVerbose = logOptions(args, opts);

  if ('config' in testing) {
    let decisionRecordConfig = testing['config'];
  } else {
    let decisionRecordConfig = new DecisionRecordConfig('.'); // TODO: Untested Line
  }

}

export async function supersede_record(args, opts, testing = {}) {
  let isVerbose = logOptions(args, opts);

  if ('config' in testing) {
    let decisionRecordConfig = testing['config'];
  } else {
    let decisionRecordConfig = new DecisionRecordConfig('.'); // TODO: Untested Line
  }

}