import PropTypes from 'prop-types'
import './FeatureCard.css'

function FeatureCard({ icon, title, description }) {
  return (
    <div className="feature-card">
      <span className="feature-card__icon">{icon}</span>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>
    </div>
  )
}

FeatureCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default FeatureCard
