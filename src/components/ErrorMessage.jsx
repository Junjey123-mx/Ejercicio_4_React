import PropTypes from 'prop-types'

function ErrorMessage({ message }) {
  return <p className="error-msg">Error: {message}</p>
}

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ErrorMessage
