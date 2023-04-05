import { useEffect, useMemo, useState } from "react"
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

import { useTerminalPrint } from "@renderer/contexts/TerminalContext";

import styles from './styles.module.scss';

export const useTerminalPanel = () => {
    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const [term] = useState(() => new Terminal());

    useTerminalPrint((data) => {
        term.write(data);
    });

    useEffect(() => {
        if (!ref) {
            return;
        }

        term.open(ref);
        return () => {
            term.dispose();
        }
    }, [ref]);

    const terminalView = useMemo(() =>
        <div className={styles.root} ref={ref => setRef(ref)} />, []);

    return { terminalView };
};
