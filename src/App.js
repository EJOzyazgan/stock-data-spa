import logo from './logo.svg';
import './App.css';
import { Chip, Grid, TextField, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { getTickers, updateTickers } from './util/lambdaUtil';
import { eventWrapper } from '@testing-library/user-event/dist/utils';



function App() {

  const [initialTickers, setInitialTickers] = useState([]);
  const [tickers, setTickers] = useState([]);
  const [ticker, setTicker] = useState("");
  const [updatingTickers, setUpdatingTickers] = useState(false);

  const removeTicker = (index) => event => {
    tickers.splice(index, 1);
    setTickers([...tickers]);
  }

  const addTicker = () => event => {
    setTickers([...tickers, ticker]);
    setTicker("");
  }

  const saveTickers = () => event => {
    setUpdatingTickers(true);
    updateTickers(tickers)
      .then(res => {
        setInitialTickers(tickers);
        setUpdatingTickers(false);
      })
      .catch(e => console.log(`Error:\t${e}`))
  }

  useEffect(() => {
    getTickers()
      .then(tickers => {
        setTickers([...tickers]);
        setInitialTickers([...tickers]);
      })
      .catch(e => console.log(`Error:\t${e}`))
  }, []);

  const saveTickersButton = () => {
    return haveSameContents(initialTickers, tickers) || updatingTickers
  }

  const haveSameContents = (a, b) =>
    a.length === b.length &&
    [...new Set([...a, ...b])].every(
      v => a.filter(e => e === v).length === b.filter(e => e === v).length
    );

  return (
    <div className="App">
      <Grid
        container
        spacing={2}
        direction="column"
        justifyContent="center"
        alignItems="center">

        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center">

          <Grid item>
            <TextField
              id='TickerSearchField'
              type='text'
              placeholder='Ticker Symbol'
              value={ticker}
              onChange={(event) => setTicker(event.target.value)}
            />
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={addTicker()}>Add Ticker</Button>
          </Grid>
        </Grid>

        <Grid item>
          <Typography>Current Tickers</Typography>
        </Grid>

        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="center">

          {
            tickers.map((ticker, index) => {
              return <Grid item key={ticker + index} >
                <Chip label={ticker} onDelete={removeTicker(index)} />
              </Grid>
            })
          }
        </Grid>

        <Grid item>
        <Button variant="contained" onClick={saveTickers()} disabled={saveTickersButton()}>Save Ticker</Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
