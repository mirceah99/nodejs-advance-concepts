// fake code

// node myfile.js

const pendingTimers = [];
const pendingOsTasks = []; // tasks that comes form OS, like a https request
const pendingOperations = []; // also things that are coming from the thread pool like heavy crypto functions

//new timers, operations and tasks are recording from myFile running
myFile.runContent();

function shouldContinue() {
	//check one any pending setTimeout, setInterval or setImmediate?
	//check two if are any pending operating system(OS) tasks (eg: server listening on one port)
	//check three: any pending long running operations like fs module
	return (
		pendingTimers.length || pendingOsTasks.length || pendingOperations.length
	);
}

//entire boy executes in one tick
while (shouldContinue()) {
	// new tick
	//1)node looks at pending timers and sees if any functions are ready to be called, setTimeout setInterval
	//
	//2)node looks at pending OS tasks and pending operations and call relevant callbacks
	//
	//3)Pause execution. Continue when...
	// - a new pendingOStask is done
	// - a new pendingOperation is done
	// - a timer is about to complete
	//
	// 4) looks at pending timers. Call any setImmediate
	//
	// 5) handle any 'close' events
	// eg: readStream.on("close", () => /* cleanup code*/ null);
}

//exit back to terminal
