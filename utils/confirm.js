import readline from "readline"

//**
//  * Prompt for confirmation on STDOUT/STDIN
//**
export const confirm = (msg, callback) => {
	var rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})
	rl.question(msg, function (input) {
		rl.close()
		callback(/^y|yes|ok|true$/i.test(input))
	})
}
