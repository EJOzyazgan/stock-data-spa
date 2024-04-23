#!/bin/bash

npm run build
aws s3 rm s3://stock-tickers-website --recursive
aws s3 cp build s3://stock-tickers-website --recursive
$SHELL