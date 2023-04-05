import React, { createContext, useCallback, useContext, useEffect } from 'react';
import PubSub from 'pubsub-js';

const defaultValue = {
    exec: async (_: string, __?: string[]): Promise<Uint8Array> => {
        throw new Error("This shouldn't been call.")
    },
    silenceExec: async (_: string, __?: string[]): Promise<Uint8Array> => {
        throw new Error("This shouldn't been call.")
    }
};

const TerminalContext = createContext(defaultValue);

type IProviderProps = {
    children: React.ReactNode;
};

export const TerminalContextProvider: React.FC<IProviderProps> = ({ children }) => {
    const exec = useCallback(async (command: string, args?: string[]) => {
        const buffer = await window.api.execSpawn(command, args);
        PubSub.publish('Terminal.Print', buffer);
        return buffer;
    }, []);

    const silenceExec = useCallback(async (command: string, args?: string[]) => {
        const buffer = await window.api.execSpawn(command, args);

        return buffer;
    }, []);

    return (
        <TerminalContext.Provider value={{ exec, silenceExec }}>
            {children}
        </TerminalContext.Provider>
    );
}

export const useTerminalPrint = (callback: (value: string) => void) => {
    useEffect(() => {
        const token = PubSub.subscribe('Terminal.Print', (_, data) => callback(data));

        return () => {
            PubSub.unsubscribe(token);
        }
    });
}

export const useTerminalExec = () => {
    const { exec, silenceExec } = useContext(TerminalContext);

    return { exec, silenceExec };
};
