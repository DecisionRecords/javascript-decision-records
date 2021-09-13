import chalk from 'chalk';
import pkg from "@caporal/core";
import { EOL } from 'os';
const { program } = pkg;
import do_init from './lib/do_init.js';
import do_new from './lib/decisionRecordNew.js';
import { set_approved_records, set_proposed_records, link_records, deprecate_record, amend_record, supersede_record } from './lib/setStatus.js'

program
  .name("decision-record")
  .description('Making ' + chalk.underline('Decision Records') + ' ' + chalk.bold('easier'));

program
  .command(
    'init',
    'Initializes the directory structures for new decision records.'
  )
  .argument(
    '[directory]',
    'The directory to create your decision records in.'
  )
  .option(
    '--adr',
    'Use the old ADR format for finding the directory structure.',
    { default: false }
  )
  .option(
    '-t --template <name>',
    'Set the filename prefix for the Decision Record template to use.',
    { default: "template" }
  )
  .option(
    '-f --format <format>',
    'Set the Decision Record template format to use.',
    { default: "md" }
  )
  .option(
    '-l --language <language>',
    'The two or four letter code defining the language to prefer.',
    { default: "en-GB" }
  )
  .option(
    '-d --template-directory <string>',
    'The template directory to use. Default to `$directory/.templates/`',
  )
  .option(
    '-s --source <path>',
    'Source for externally stored templates to load into this ADR. Default is to use the bundled templates with this script.'
  )
  .option(
    '--force',
    'Force overwriting of an existing config.',
    { default: false }
  )
  .option(
    '-p --default-proposed',
    'Default new records as "proposed" rather than "accepted".',
    { default: false }
  )
  .help(
    [
      'Examples',
      chalk.green('$ ') + chalk.bold.red('decision-record init'),
      chalk.blue('Creates `doc/decision_records`.'),
      '',
      chalk.green('$ ') + chalk.bold.red('decision-record init my_decisions'),
      chalk.blue('Creates `my_decisions`.'),
      '',
      chalk.green('$ ') + chalk.bold.red('decision-record init -t "company template"'),
      chalk.blue('Creates `doc/decision_records` and `doc/decision_records/.templates/company template.md`.'),
      '',
      chalk.green('$ ') + chalk.bold.red('decision-record init -f rst'),
      chalk.blue('Creates `doc/decision_records` and `doc/decision_records/.templates/template.rst`.'),
      '',
      chalk.green('$ ') + chalk.bold.red('decision-record init -l de-DE'),
      chalk.blue('Creates `doc/decision_records` and the German template `doc/decision_records/.templates/template.md`.')
    ].join(EOL)
  )
  .action(({ args, options }) => { do_init(args, options) });

program
  .command(
    'new',
    "Creates a new decision record."
  )
  .argument(
    '<title...>',
    "The title of the new record"
  )
  .option(
    '-A --approved',
    'Set the fact this Decision Record has been approved (default).'
  )
  .option(
    '-P --proposed',
    'Set the fact this Decision Record is classed as "proposed". Mutually exclusive with --approved.'
  )
  .option(
    '-s --supersede <record...>',
    'Note that this record supersedes a previous Decision Record. Can be used several times.',
    {
      validator: program.ARRAY | program.NUMBER
    }
  )
  .option(
    '-d --deprecate <record...>',
    'Note that this record deprecates a previous Decision Record. Can be used several times.',
    {
      validator: program.ARRAY | program.NUMBER
    }
  )
  .option(
    '-a --amend <record...>',
    'Note that this record amends a previous Decision Record. Can be used several times.',
    {
      validator: program.ARRAY | program.NUMBER
    }
  )
  .option(
    '-l --link <record...>',
    'Note that this record is linked to another Decision Record. Can be used several times.',
    {
      validator: program.ARRAY | program.NUMBER
    }
  )
  .action(({ args, options }) => { do_new(args, options) });

program
  .command(
    'approve',
    "Change the status of a proposed Decision Record to approved."
  )
  .argument(
    '<record...>',
    "The record or records to change the status to approved",
    {
      validator: program.ARRAY | program.NUMBER
    }
  )
  .action(({ args, options }) => { set_approved_records(args, options) });

program
  .command(
    'proposed',
    "Change the status of a proposed Decision Record to proposed."
  )
  .argument(
    '<record...>',
    "The record or records to change the status to proposed",
    {
      validator: program.ARRAY | program.NUMBER
    }
  )
  .action(({ args, options }) => { set_proposed_records(args, options) });

program
  .command(
    'link',
    "Link two Decision Records."
  )
  .argument(
    '<from_record>',
    "Link from a record",
    {
      validator: program.NUMBER
    }
  )
  .argument(
    '<to_record>',
    "Link to a record",
    {
      validator: program.NUMBER
    }
  )
  .argument(
    '[reason...]',
    "The optional reason to link the two records."
  )
  .action(({ args, options }) => { link_records(args, options) });

program
  .command(
    'deprecate',
    "Change the status of a Decision Record to deprecated."
  )
  .argument(
    '<deprecate_record>',
    "Deprecate this record number",
    {
      validator: program.NUMBER
    }
  )
  .argument(
    '<replace_record>',
    "Identify this record as the record which deprecates the old record",
    {
      validator: program.NUMBER
    }
  )
  .action(({ args, options }) => { deprecate_record(args, options) });

program
  .command(
    'amend',
    "Amend a Decision Record with an additional Decision Record."
  )
  .argument(
    '<original_record>',
    "Amend this Decision Record.",
    {
      validator: program.NUMBER
    }
  )
  .argument(
    '<additional_record>',
    "Identify this record as the Decision Record which amends the previous one.",
    {
      validator: program.NUMBER
    }
  )
  .action(({ args, options }) => { amend_record(args, options) });

program
  .command(
    'supersede',
    "Change the status of a Decision Record to superseded."
  )
  .argument(
    '<supersede_record>',
    "Supersede this record number",
    {
      validator: program.NUMBER
    }
  )
  .argument(
    '<replace_record>',
    "Identify this record as the record which supersedes the old record",
    {
      validator: program.NUMBER
    }
  )
  .action(({ args, options }) => { supersede_record(args, options) });

try {
  program.run();
} catch (error) {
  console.log(chalk.redBright(error));
}
