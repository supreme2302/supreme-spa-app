import bus from '../bus';
import route from '../conf';
export default class Ws {
  constructor () {
    if (Ws.__instance) {
      return Ws.__instance;
    }
    const address = 'ws://' + route.address + '/chat';
    this.ws = new WebSocket(address);
    this.ws.onopen = (event) => {
      console.log(`WebSocket on address ${address} opened`);
      bus.emit('connected', {});
      this.ws.onmessage = this.handleMessage.bind(this);

      this.ws.onclose = (e) => {
        console.log(e);
        console.log('WebSocket closed');
      };
    };
    Ws.__instance = this;
  }

  handleMessage (event) {
    console.log('handleMessage');
    const messageText = event.data;
    // console.log('Websocket GET ', messageText);
    try {
      const message = JSON.parse(messageText);
      console.log('class: ', message.class);
      bus.emit(message.class, message);
    } catch (err) {
      console.error('Websocket error in handle message: ', err);
    }
  }

  send (payload) {
    this.ws.send(JSON.stringify(payload));
    console.log('Websocket SEND ', payload);
  }

  close () {
    this.ws.close();
    console.log('websocket closing');
  }
}
