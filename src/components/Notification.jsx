import PropTypes from "prop-types";

const Notification = ({ message }) => {
  // Si 'message' no existe o es una cadena vacía, no renderizamos nada
  if (!message) {
    return null;
  }

  return <div>{message}</div>;
};

Notification.propTypes = {
  message: PropTypes.string, // No es necesario que sea requerido si lo vas a manejar como opcional
};

Notification.defaultProps = {
  message: "", // Valor por defecto si no se pasa el prop 'message'
};

export default Notification;
