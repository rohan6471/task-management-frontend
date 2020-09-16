import React, { Component } from "react"

class CreateProject extends Component {
    constructor(props){
        super(props);
        this.state = {
          projects: []
        }
      }
      render() {
        return (
          <div>
          create project
          </div>
        )
      }

}
export default CreateProject;