import React, { Component } from 'react';
import SockJS from 'sockjs-client';
import { setInStorage, getFromStorage, removeInStorage } from '../utils/storage'

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      socketId:'',
      messages: []
    }

      //create a new socket connection
      //see documentation https://github.com/sockjs/sockjs-client#getting-started
    this.sock = new SockJS('http://localhost:9999/chat');

    this.sock.onopen = () => {
      console.log('connection open');
    };

    this.sock.onmessage = e => {
      console.log('message received:', e.data);
      const message = JSON.parse(e.data)
      if(message.connectionID){
        this.setState({
          socketId: message.connectionID
        }, () => {
          const token = getFromStorage('chatAuth:token');
          if(token){
            // verify token
            fetch('http://localhost:3017/api/account/newconnection',{
              method: 'POST',
              mode: 'cors',
              headers: {
                'Access-Control-Request-Origin': '*',
                'Access-Control-Allow-Origin': '*',
                "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-origin,content-type",
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                token: token,
                socketId: this.state.socketId
              })
            })
            .then(res => res.json())
            .then(json => {
              if(json.success){
                fetch('http://localhost:3017/api/account/status',{
                  method: 'POST',
                  mode: 'cors',
                  headers: {
                    'Access-Control-Request-Origin': '*',
                    'Access-Control-Allow-Origin': '*',
                    "Access-Control-Allow-Headers": "access-control-allow-headers,access-control-allow-origin,content-type",
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    socketId: this.state.socketId,
                    status: 'online'
                  })
                })
                .then(res => res.json())
                .then(json => {
                  if(json.success){

                  }else{
                    alert('Status Error: Refresh Page')
                  }
                });
              }
            });
          }else{
            alert('Error: Refresh Page')
          }
        })
      }

        //incoming message from server, store in state
        this.setState( { messages: [...this.state.messages, e.data] });

    };

    this.sock.onclose = () => {
      console.log('close');
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);

  }

  componentDidMount(){
  }

  handleFormSubmit(e) {
    e.preventDefault();
    let text = this.refs.messageText.value;
    this.sock.send(text);
  }



  render() {
    let i = 0;

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
         <div className="container">
          <form onSubmit={this.handleFormSubmit}>
            <div className="form-group">
              <div className="input-group">
                <input type="text" ref="messageText" className="form-control" placeholder="Type here to chat..." />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-primary">Send!</button>
                </span>
              </div>
            </div>
          </form>
        </div>
        <ul className="list-group">{
          this.state.messages.map(message => {
            return <li className="list-group-item" key={i++}>{message}</li>
          })}
        </ul>
      </div>
    );
  }
}

export default Main;
