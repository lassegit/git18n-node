const { exec } = require('child_process');

export const getPRNumber = async (): Promise<{ number: number } | undefined> => {
  return new Promise((resolve, reject) => {
    exec(
      'gh pr view --json number',
      { cwd: process.cwd() },
      (error: { code: string; message: string }, stdout: string, stderr: string) => {
        if (error) {
          reject(new Error(error.message));
          return;
        }

        if (stderr) {
          reject(new Error(stderr));
          return;
        }

        return resolve(JSON.parse(stdout));
      },
    );
  });
};

// Perhaps create a general function to get run CLI
// const cmder = async cmd => {
//   return new Promise((resolve, reject) => {
//     exec(cmd, (err, stdout, stderr) => {
//       if(err) {
//         reject(err);
//         return;
//       }
//       resolve('success');
//     })
//   })
// }
