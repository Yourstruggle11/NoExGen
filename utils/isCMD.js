//**
//  * Determine if launched from cmd.exe
//**

export const isCmd = () => {
    return process.platform === 'win32' &&
      process.env._ === undefined
  }