// Parse local enviromental variables

// Extract new.json file using https://github.com/formatjs/formatjs/tree/main/packages/cli

// Download current.json used and compare with new.json to see if there are any changes

// If translations are required, upload new default.json to server

// Compile translations file in wished language defined in enviromental variable

export const sum = (a: number, b: number) => {
  if ('development' === process.env.NODE_ENV) {
    console.log('boop');
  }
  return a + b;
};

export const subtract = (a: number, b: number) => {
  return a - b;
};
