import { useMemo, useState } from 'react';
import {
  type SelectChangeEvent,
  Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, Box, Typography,
} from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';

import logo from './assets/logo.svg';
import { useDevDialog } from './hooks/useDevDialog';
import { useTerminalExec } from './contexts/TerminalContext';
import styles from './styles.module.scss';

function App() {
  const [duration, setDuration] = useState(1);
  const [isRunning, setRunning] = useState(false);

  const { exec } = useTerminalExec();

  const { devButtonView, dialogView } = useDevDialog();

  const handleChange = (event: SelectChangeEvent) => {
    setDuration(parseInt(event.target.value));
  };

  const selectItems = useMemo(() => {
    return [1, 2, 3, 4, 5, 6, 7].map(value =>
      <MenuItem key={value} value={value}>
        {value} 分鐘
      </MenuItem>)
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <Typography variant="h5" p={3}>
          Autoteamaker GUI
        </Typography>
        <img src={logo} height="200px" />
      </div>

      <Box p={3}>
        <ButtonGroup variant="contained" aria-label="outlined primary button group">
          <Button
            disabled={isRunning}
            endIcon={<ArrowUpwardIcon />}
            onClick={() => {
              setRunning(true);
              exec("/home/pi/autoteamaker/bin/stepper", ['1']).then(() => {
              }).finally(() => {
                setRunning(false);
              })
            }}>
            UP 往上
          </Button>
          <Button
            disabled={isRunning}
            endIcon={<ArrowDownwardIcon />}
            onClick={() => {
              setRunning(true);
              exec("/home/pi/autoteamaker/bin/stepper", ['-1']).then(() => {
              }).finally(() => {
                setRunning(false);
              })
            }}>
            DOWN 往下
          </Button>
        </ButtonGroup>
      </Box>

      <div className={styles.select} >
        <FormControl fullWidth disabled={isRunning}>
          <InputLabel>泡茶時間</InputLabel>
          <Select
            value={duration.toString()}
            label="泡茶時間"
            onChange={handleChange}
          >
            {selectItems}
          </Select>
        </FormControl>
      </div>
      <Button
        disabled={isRunning}
        variant="outlined"
        endIcon={<EmojiFoodBeverageIcon />}
        onClick={() => {
          setRunning(true);
          exec("./bin/tea ", [duration.toString(), "9"]).finally(() => {
            setRunning(false);
          });
        }}>
        開始泡茶
      </Button>
      {devButtonView}
      {dialogView}
    </div>
  )
}

export default App
