from autobahn.twisted.websocket import WebSocketServerProtocol, \
    WebSocketServerFactory
import numpy as np


class MyServerProtocol(WebSocketServerProtocol):

    def onConnect(self, request):
        print("Client connecting: {0}".format(request.peer))

    def onOpen(self):
        print("WebSocket connection open.")

        tmp_data = np.genfromtxt('motion.csv', delimiter=',', dtype=str, usecols=(0,1),skip_header=1)
        tmp_data.view(np.ndarray)
        col_time = tmp_data[:,0]
        col_y = tmp_data[:,1]
        y_vibration = np.array(col_y,dtype=float)
    
        for ts, y in zip(col_time, y_vibration):
            payload = "{0},{1}".format(ts, y)
            print("Payload {0}".format(payload))
            self.sendMessage(payload.encode('utf-8'))

        print("Completed")

    def onMessage(self, payload, isBinary):
        if isBinary:
            print("Binary message received: {0} bytes".format(len(payload)))
        else:
            print("Text message received: {0}".format(payload.decode('utf8')))

        # echo back message verbatim
        self.sendMessage(payload, isBinary)

    def onClose(self, wasClean, code, reason):
        print("WebSocket connection closed: {0}".format(reason))


if __name__ == '__main__':

    import sys

    from twisted.python import log
    from twisted.internet import reactor

    log.startLogging(sys.stdout)

    factory = WebSocketServerFactory(u"ws://127.0.0.1:9000")
    factory.protocol = MyServerProtocol
    # factory.setProtocolOptions(maxConnections=2)
    
    # note to self: if using putChild, the child must be bytes...
    reactor.listenTCP(9000, factory) #@UndefinedVariable
    reactor.run() #@UndefinedVariable
