
//**
//  * Display an error.
//  *
//  * @param {String} message
//**

export const error = (message) => {
    console.error()
    message.split('\n').forEach(function (line) {
      console.error('  error: %s', line)
    })
    console.error()
  }