// Parse local enviromental variables

// Extract new.json file using https://github.com/formatjs/formatjs/tree/main/packages/cli

// Download current.json used and compare with new.json to see if there are any changes

// If translations are required, upload new default.json to server

// Compile translations file in wished language defined in enviromental variable

// yarn git18n // (locally) pulls trnaslations from server and compiles them
// yarn git18n // (PR) pull translations from server and compares to local to see if translations are needed. Add github comment with link to web translation page
// yarn git18n // (merge to master) pull translations from server and compiles them. Updates translations on server to this.

export function getMessages(): { [key: string]: string } {
  return {};
}

// const env = process.env;

// console.log({ env });
