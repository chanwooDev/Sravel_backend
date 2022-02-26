const express = require('express');
expressLoader = require('./express')
sessionLoader = require('./session')

module.exports = ({expressApp}) => {
  sessionLoader({app:expressApp});
  console.log('Session Initialized');
  expressLoader({app:expressApp});
  console.log('Express Initialized');
  return expressApp;
}