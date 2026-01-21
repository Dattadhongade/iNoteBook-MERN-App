import { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";

const Alert = (props) => {
  const context = useContext(AlertContext);
  const { alert } = context;

  if (!alert) {
    return null;
  }

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return "bi-check-circle-fill";
      case "danger":
        return "bi-x-circle-fill";
      case "warning":
        return "bi-exclamation-triangle-fill";
      case "info":
        return "bi-info-circle-fill";
      default:
        return "bi-info-circle-fill";
    }
  };

  return (
    <div>
      <div
        className={`alert alert-${alert.type} d-flex align-items-center`}
        role="alert"
      >
        <i className={`bi ${getIcon(alert.type)} me-2`}></i>
        <div>{alert.message}</div>
      </div>
    </div>
  );
};

export default Alert;
