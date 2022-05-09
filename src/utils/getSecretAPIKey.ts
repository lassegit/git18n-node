const fs = require('fs');
const path = require('path');

// .env parse function from dotenv code: https://github.com/motdotla/dotenv/blob/0318510821c578c5fa29697891ae922ee6d27a41/lib/main.js

const LINE = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/gm;

function parse(src: Buffer) {
  const obj: Record<string, string> = {};

  // Convert buffer to string
  let lines = src.toString();

  // Convert line breaks to same format
  lines = lines.replace(/\r\n?/gm, '\n');

  let match;
  while ((match = LINE.exec(lines)) != null) {
    const key = match[1];

    // Default undefined or null to empty string
    let value = match[2] || '';

    // Remove whitespace
    value = value.trim();

    // Check if double quoted
    const maybeQuote = value[0];

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/gm, '$2');

    // Expand newlines if double quoted
    if (maybeQuote === '"') {
      value = value.replace(/\\n/g, '\n');
      value = value.replace(/\\r/g, '\r');
    }

    // Add to object
    obj[key] = value;
  }

  return obj;
}

/**
 * Reads the project specific access token from either the process.env or .env file
 */
export const getSecretAPIKey = (): string | undefined => {
  if (process.env.GIT18N_SECRET_PROJECT_KEY) {
    return process.env.GIT18N_SECRET_PROJECT_KEY;
  }

  const filePath = path.resolve(process.cwd(), '.env');

  try {
    const parsed = parse(fs.readFileSync(filePath, 'utf8'));

    if (!parsed.GIT18N_SECRET_PROJECT_KEY) {
      throw new Error(`GIT18N_SECRET_PROJECT_KEY is not defined in .env file in ${filePath}`);
    }

    return parsed.GIT18N_SECRET_PROJECT_KEY;
  } catch (error) {
    const message =
      error instanceof Error ? error.message : typeof error === 'string' ? error : 'Unknown error';
    throw new Error(message);
  }
};
