import PropTypes from "prop-types";

const Notification = ({ message }) => {
  if (!message) {
    return null;
  }

  return <div>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string,
};

Notification.defaultProps = {
  message: "",
};

export default Notification;
