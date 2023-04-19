// Write your code here

import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStarted: false,
      timerLimit: 25,
      min: 25,
      sec: 0,
      minusorPlus: true,
    }
    this.IntervalId = null
  }

  timerStarted = () => {
    const {sec, min} = this.state

    if (sec === 0 && min !== 0) {
      this.setState({sec: 59})
      this.setState(prevState => ({min: prevState.min - 1}))
    }

    if (sec !== 0) {
      this.setState(prevState => ({sec: prevState.sec - 1}))
    }
    if (sec === 0 && min === 0) {
      clearInterval(this.IntervalId)
      this.setState({
        isStarted: false,
        timerLimit: 25,
        min: 25,
        sec: 0,
        minusorPlus: true,
      })
    }
  }

  startOrPauseBnClicked = () => {
    const {isStarted} = this.state
    this.setState({minusorPlus: false})
    if (isStarted === false) {
      if (this.IntervalId !== null) {
        clearInterval(this.IntervalId)
      }
      this.setState(prevState => ({isStarted: !prevState.isStarted}))

      this.IntervalId = setInterval(this.timerStarted, 1000)
    } else {
      this.setState(prevState => ({isStarted: !prevState.isStarted}))
      clearInterval(this.IntervalId)
    }
  }

  limitIncrement = () => {
    const {minusorPlus} = this.state
    if (minusorPlus === true) {
      this.setState(prrevState => ({min: prrevState.min + 1}))
      this.setState(prrevState => ({timerLimit: prrevState.timerLimit + 1}))
    }
  }

  limitDecrement = () => {
    const {minusorPlus} = this.state
    if (minusorPlus === true) {
      this.setState(prrevState => ({min: prrevState.min - 1}))
      this.setState(prrevState => ({timerLimit: prrevState.timerLimit - 1}))
    }
  }

  reseteBn = () => {
    if (this.IntervalId !== null) {
      clearInterval(this.IntervalId)
    }

    this.setState({
      isStarted: false,
      timerLimit: 25,
      min: 25,
      sec: 0,
      minusorPlus: true,
    })
  }

  render() {
    const {min, sec, isStarted, timerLimit} = this.state
    const minString = min < 10 ? `0${min}` : min
    const secString = sec < 10 ? `0${sec}` : sec
    const startorpausebnIcon = isStarted
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png '
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startorpausebnText = isStarted ? 'Pause' : 'Start'
    const startorpausebniconAlt = isStarted ? 'pause icon' : 'play icon'
    const dieText = isStarted ? 'Runing' : 'Paused'

    const timerLimitText = timerLimit < 10 ? `0${timerLimit}` : timerLimit
    return (
      <div className="mainContainer">
        <h1 className="heading">Digital Timer</h1>

        <div className="container">
          <div className="timerDiContainer">
            <div className="die">
              <h1 className="timer">
                {minString}:{secString}
              </h1>
              <p className="timerStatus">{dieText}</p>
            </div>
          </div>

          <div className="switchesContainer">
            <div className="starorpausebnContainer">
              <button
                onClick={this.startOrPauseBnClicked}
                className="smallBn"
                type="button"
              >
                <img
                  className="playbn"
                  alt={startorpausebniconAlt}
                  src={startorpausebnIcon}
                />
              </button>
              <p className="re">{startorpausebnText}</p>
              <button
                onClick={this.reseteBn}
                className="smallBn rightbn"
                type="button"
              >
                <img
                  className="playbn"
                  alt="reset icon"
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                />
              </button>

              <p className="re">Reset</p>
            </div>
            <p className="pa">Set Timer limit</p>
            <div className="IncrementorDecrmentbnContainer">
              <button
                onClick={this.limitDecrement}
                className="smallBn"
                type="button"
              >
                -
              </button>

              <p className="incrementedtext">{timerLimitText}</p>

              <button
                onClick={this.limitIncrement}
                className="smallBn"
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
