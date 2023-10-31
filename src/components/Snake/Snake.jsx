import PropTypes from 'prop-types';

export const Snake = ({ snake }) => {

  return (
    <div>
      {snake.map((box, i) => (
        <div key={i}
          style={{
            width: "15px",
            height: "15px",
            backgroundColor: "#e7da3d",
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
  snake: PropTypes.any.isRequired,
};
