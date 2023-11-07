import PropTypes from 'prop-types';

export const Snake = ({ snake, isStarted }) => {

  return (
    <div>
      {snake.map((box, i) => (
        <div key={i}
          style={{
            display: isStarted ? "block" : "none",
            width: "15px",
            height: "15px",
            backgroundColor: "#FFFFFF",
            margin: "5px",
            position: "absolute",
            left: `${box.x}%`,
            top: `${box.y}%`,
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
}

Snake.propTypes = {
  snake: PropTypes.array.isRequired,
  isStarted: PropTypes.bool.isRequired
};
