import React, { Component } from 'react';
export const DataContext = React.createContext();

export class DataProvider extends Component{
    constructor() {
        super();
        this.state = {
            user : {}
        }
    }
    addUserDetails = (obj)=>{
        console.log("context")
        this.setState({
            user : obj
        })
        console.log(this.state.user)
    }
    render() {
        const {user} = this.state;
        const {addUserDetails}= this;
        return (
            <DataContext.Provider 
            value={{user,addUserDetails}}>
                 {this.props.children}
            </DataContext.Provider>
             )
        
            }
        }
