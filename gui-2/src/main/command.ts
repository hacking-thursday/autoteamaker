import { promisify } from 'util';
import { exec, spawn } from 'child_process';
import pty from 'node-pty';

export const execAsync = promisify(exec);

export const spawnPromise = (command: string, args?: string[]) => {
    let result = Buffer.from("");

    return new Promise((resolve, reject) => {
        const _process = spawn(command, args);
        _process.stdout.on('data', (data) => {
            result = Buffer.concat([result, data]);
        });

        _process.on('close', () => {
            resolve(result);
        });

        _process.on('error', (err) => {
            reject(err);
        });
    });
}

/**
 * @deprecated
 */
export const spawnPtyPromise = (command: string) => {
    let result = "";

    return new Promise((resolve) => {
        const ptyProcess = pty.spawn("bash", [], {
            name: "xterm-color",
            cols: 80,
            rows: 36,
            // cwd: path.resolve(app.getAppPath(), "../"),
            env: process.env as any
        });

        ptyProcess.write(command + "\r");

        ptyProcess.onData((data) => {
            result += data;
        });

        /**
         * Hack interruption
         */
        setTimeout(() => {
            ptyProcess.kill();
        }, 1000);

        ptyProcess.onExit(() => {
            resolve(result);
        })
    });
};
