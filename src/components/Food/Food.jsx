import PropTypes from 'prop-types';

export const Food = ({ position, isStarted }) => {
  return (
    <img
    width={25}
    height={30}
    src={position.image}
    alt="Food"
    style={{
      display: isStarted ? "block" : "none",
      margin: "3px",
      position: "absolute",
      left: `${position.x}%`,
      top: `${position.y}%`,
      zIndex: 0,
    }}
  />
  );
}

Food.propTypes = {
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      image: PropTypes.string.isRequired
    }).isRequired,
    isStarted: PropTypes.bool.isRequired
  };
