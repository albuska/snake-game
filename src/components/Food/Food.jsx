import PropTypes from 'prop-types';

//food is just a 15x15px box.
//position is an object with x & y property
export const Food = ({ position }) => {
    console.log("position", position);
  return (
    <div
      style={{
        width: "15px",
        height: "15px",
        backgroundColor: "#3dd1e7",
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
    }).isRequired,
  };


