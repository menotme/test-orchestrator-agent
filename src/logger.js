const PREFIX = "[app]";
const SEPARATOR = ": ";
const LEVEL_INFO = "info";
const LEVEL_WARN = "warn";
const LEVEL_ERROR = "error";

function format(level, message) {
  return `${PREFIX} ${level}${SEPARATOR}${message}`;
}

/**
 * Log an informational message to stdout.
 * @param {string} message - The message to log.
 * @returns {void}
 */
function info(message) {
  console.log(format(LEVEL_INFO, message));
}

/**
 * Log a warning message to stderr.
 * @param {string} message - The message to log.
 * @returns {void}
 */
function warn(message) {
  console.warn(format(LEVEL_WARN, message));
}

/**
 * Log an error message to stderr.
 * @param {string} message - The message to log.
 * @returns {void}
 */
function error(message) {
  console.error(format(LEVEL_ERROR, message));
}

/**
 * Dispatch a log message at the given level. Unknown levels fall through
 * to stdout with the level label preserved in the prefix.
 * @param {string} level - One of "info", "warn", "error", or a custom label.
 * @param {string} message - The message to log.
 * @returns {void}
 */
function log(level, message) {
  if (level === LEVEL_INFO) info(message);
  else if (level === LEVEL_WARN) warn(message);
  else if (level === LEVEL_ERROR) error(message);
  else console.log(format(level, message));
}

module.exports = { info, warn, error, log };
