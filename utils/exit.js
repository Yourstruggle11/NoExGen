//**
//  * Refined exit for async STDIO
//**

export const exit = (code) => {
    function done () {
      if (!(draining--)) process.exit(code)
    }
  
    var draining = 0
    var streams = [process.stdout, process.stderr]
  
    exit.exited = true
  
    streams.forEach(function (stream) {
      // submit empty write request and wait for completion
      draining += 1
      stream.write('', done)
    })
  
    done()
  }