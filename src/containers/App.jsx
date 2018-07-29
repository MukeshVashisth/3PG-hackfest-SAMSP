import React, { Component } from 'react'
import Header from '../components/Header'
import AppContainer from './AppContainer'
import PatientDetails from '../components/PatientDetails'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sidebarStatus: ''
    }

    this.changeSidebarStatus = this.changeSidebarStatus.bind(this)
  }

  changeSidebarStatus() {
    this.setState({
      sidebarStatus: 'active'
    })
  }

  render() {
    return (
      <React.Fragment>
        <div className='bg-background' />
        <div className={`container ${this.state.sidebarStatus}`}>
          <div className='col-left'>
            <Header />
            <AppContainer handleSidebarStatus={this.changeSidebarStatus} />
          </div>
          <PatientDetails />
        </div>
      </React.Fragment>
    )
  }
}

export default App
