import chalk from 'chalk';
import program from 'gitlike-cli';
import do_init from './lib/do_init.js';

program
  .version('0.0.1')
  .description('Making ' + chalk.underline('Decision Records') + ' ' + chalk.bold('easier'));

program.command('init [directory]')
  .description('Initializes the directory structures for new decision records.')
  .action(do_init)
  .option('--adr', 'Use the old ADR format for finding the directory structure. Off by default.')
  .option('-t --template <name>', 'Set the filename prefix for the Decision Record template to use.')
  .option('-f --format <format>', 'Set the Decision Record template format to use.')
  .option('-l --language <language>', 'The two or four letter code defining the language to prefer. Default is `en-GB`.')
  .option('-d --templatedirectory <string>', 'The template directory to use.')
  .option('-s --source <path>', 'Source for externally stored templates to load into this ADR.')
  .option('--force', 'Force overwriting of an existing config.')
  .on('help', function (cmd) {
    cmd.outputIndented('Examples', [
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
    ]);
  }).parent;

try {
  program.parse(process.argv);  
} catch (error) {
  console.log(chalk.redBright(error));
}
