import React, { Component } from 'react'
import Splash from './src/screens/splash/Splash'
import MainNavigation from './src/publics/navigations/MainNavigations'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      view: <Splash />
    }
  }

  componentWillMount() {
    setTimeout(() => {
      this.setState({
        view: <MainNavigation />
      })
    }, 1500)
  }

  render() {
    return (
      <>
        {this.state.view}
      </>
    )
  }
}
