const os = require('os');
const http = require('http');

const port = 8080;
const ip = getIp();

startSimpleServer({
    port,
    handler: createRequestHandler({ ip }),
});

function createRequestHandler({ ip }) {
    let requestCounter = 0;
    return (request, response) => {
	console.log(request.url)
	response.end(`Simple Server (1.0.1)! Total requests: ${requestCounter++}; IP: ${ip}`);
    };
}

function startSimpleServer({ port, handler }) {
    const server = http.createServer(handler);

    server.listen(port, (err) => {
	if (err) {
	    return console.error('server failed to start', err);
	}
	console.log(`server is listening on ${port}`);
    });
}

function getIp() {
    const ifaces = os.networkInterfaces();
    return Object.keys(ifaces).reduce((acc, ifname) => {
	if(acc) return acc;
	
	const iface = ifaces[ifname]
            .filter(iface => ('IPv4' === iface.family && iface.internal === false))
            .find(iface => iface);
	
	return iface ? iface.address : null;
    }, null);
}
