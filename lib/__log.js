export default function (message, runMessage = true) {
  log(message, runMessage);
}

export function log(message, runMessage = false) {
  if (runMessage) {
    console.log(message);
  }
}

export function logOptions(args, opts) {
  let isVerbose = false;
  if ('verbose' in opts) {
    isVerbose = true; // TODO: Untested Line
    log('Verbose set to true (' + isVerbose + ')', isVerbose); // TODO: Untested Line
    for (var property in args) {
      log(`args[${property}]: ${args[property]}`, isVerbose); // TODO: Untested Line
    }
    for (var property in opts) {
      log(`options[${property}]: ${opts[property]}`, isVerbose); // TODO: Untested Line
    }
  }
  return isVerbose;
}