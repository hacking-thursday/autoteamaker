import { useEffect, useMemo, useState } from "react"
import { Terminal } from 'xterm';
import pty from 'node-pty';
import path from "path";
import { app } from "electron";
import 'xterm/css/xterm.css';

import styles from './styles.module.scss';

export const useTerminalPanel = () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    // const [ptyProcess] = useState(() =>
    //     pty.spawn("bash", [], {
    //         name: "xterm-color",
    //         cols: 80,
    //         rows: 36,
    //         cwd: path.resolve(app.getAppPath(), "../"),
    //         // env: process.env
    //     }));

    useEffect(() => {
        if (!ref) {
            return;
        }

        const term = new Terminal();
        term.open(ref);

        // ptyProcess.onData((data) => {
        //     term.write(data);
        // });

        return () => {
            term.dispose();
        }
    }, [ref]);

    const terminalView = useMemo(() =>
        <div className={styles.root} ref={ref => setRef(ref)} />, []);

    return { terminalView };
};
