import React, { Component } from 'react'

export const MyContext = React.createContext();

export default class MyProvider extends Component {
    constructor(){
        super();
        this.state = {
            token: '',
            isLoading: true,
            auth: false
        }
    }
    render() {
        return (
            <MyContext.Provider value={{
                state: this.state,
                setToken: (data) => {
                  this.setState({
                    token: data,
                    auth: true
                  })
                },
                removeToken: () => {
                  this.setState({
                    token: '',
                    auth: false
                  })
                }
              }}>
                {this.props.children}
            </MyContext.Provider>
        )
    }
}
