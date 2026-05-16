function info(message) {
  console.log("[app]" + " " + "info" + ": " + message);
}

function warn(message) {
  console.warn("[app]" + " " + "warn" + ": " + message);
}

function error(message) {
  console.error("[app]" + " " + "error" + ": " + message);
}

function log(level, message) {
  if (level === "info") info(message);
  else if (level === "warn") warn(message);
  else if (level === "error") error(message);
  else console.log("[app]" + " " + level + ": " + message);
}

module.exports = { info, warn, error, log };
