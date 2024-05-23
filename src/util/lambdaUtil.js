export const getTickers = () => {
  return new Promise((resolve, reject) => {
    fetch(
      "https://idjfsvzkoy5qm2ccbnmayahrtu0zjqsw.lambda-url.us-west-2.on.aws/",
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
      "https://fpaukwkk33cqrzt3ljoep34tpm0avjlr.lambda-url.us-west-2.on.aws/",
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