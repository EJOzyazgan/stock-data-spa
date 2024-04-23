export const getTickers = () => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://5a43ci7xnmcsktba3c34eiktwi0kvfjj.lambda-url.us-west-2.on.aws/",
      {
        method: 'GET'
      })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => {
        console.log(`Get Tickers ERROR:\t${e}`);
        reject(e);
      })
  });
}

export const updateTickers = (tickers) => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://poz6zvzmcvbroiy4q56isfp3xa0wlosg.lambda-url.us-west-2.on.aws/",
      {
        method: 'POST',
        body: JSON.stringify({tickers})
      })
      .then(res => res.json())
      .then(data => resolve(data))
      .catch(e => {
        console.log(`Update Tickers ERROR:\t${e}`);
        reject(e);
      })
  });
}