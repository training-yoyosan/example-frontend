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

function makeTableData(jsonResponse) {
  const length = jsonResponse.length;
  const data = new Object();
  for (let index = 0; index < length; index++) {
    data[index] = jsonResponse[index];
  }
  return data;
}

export { showErrorNotification, showSuccessNotification, makeTableData };
