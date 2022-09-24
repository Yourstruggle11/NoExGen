//**
//  * Display a warning.
//  *
//  * @param {String} message
//**

export const warning = (message) => {
    console.error()
    message.split('\n').forEach(function (line) {
      console.error('  warning: %s', line)
    })
    console.error()
  }