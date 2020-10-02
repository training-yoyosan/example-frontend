import { Loading, Notify } from "quasar";

function showErrorNotification(errorMessage) {
  Loading.hide();

  Notify.create({
    color: "negative",
    position: "top",
    message: errorMessage,
    icon: "report_problem"
  });
}

function showSuccessNotification(message) {
  Loading.hide();

  Notify.create({
    color: "green-5",
    textColor: "white",
    icon: "done",
    position: "top",
    message: message
  });
}

function showInfoNotification(infoMessage) {
  Loading.hide();

  Notify.create({
    color: "blue-5",
    textColor: "white",
    icon: "info",
    position: "top",
    message: infoMessage
  });
}

export { showErrorNotification, showSuccessNotification, showInfoNotification };
