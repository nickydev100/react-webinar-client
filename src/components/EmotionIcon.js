import React, {Component} from "react";
import PropTypes from 'prop-types'
import { getEmotionIcon } from '../helpers/emotions'

class EmotionIcon extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    const { emotion, size } = this.props
    return (
      <i className={`fas fa-${getEmotionIcon(emotion)} fa-${size}`}></i>
    )
  }
}

EmotionIcon.propTypes = {
  emotion: PropTypes.string.isRequired,
  size: PropTypes.string
}

EmotionIcon.defaultProps = {
  emotion: 'confused',
  size: '2x'
}

export default EmotionIcon
