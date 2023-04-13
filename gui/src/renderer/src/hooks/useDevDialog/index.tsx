import { forwardRef, useMemo, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import TerminalIcon from '@mui/icons-material/Terminal';

import { useTerminalPanel } from './useTerminalPanel';

import styles from './styles.module.scss';
import { Paper } from '@mui/material';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export const useDevDialog = () => {
    const { terminalView } = useTerminalPanel();
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const devButtonView = useMemo(() => {
        return (
            <Paper className={styles.startButton}>
                <IconButton
                    size="large"
                    onClick={() => setOpen(true)}>
                    <TerminalIcon fontSize="inherit" />
                </IconButton>
            </Paper>
        );
    }, []);

    const dialogView = useMemo(() => {
        return (
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            Development Terminal
                        </Typography>

                    </Toolbar>
                </AppBar>
                {terminalView}
            </Dialog>
        );
    }, [open]);

    return { dialogView, devButtonView };
};
