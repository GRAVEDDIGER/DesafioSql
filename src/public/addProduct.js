/* eslint-disable comma-dangle */
/* eslint-disable quotes */
/* eslint-disable semi */
/* eslint-disable no-undef */
// const button = document.getElementById('addProductButton')
const addProductForm = document.getElementById("addProductForm");
const inputs = document.querySelectorAll(".add");
const handleSubmit = async (e, form) => {
  e.preventDefault();
  const formData = {
    TITLE: inputs[0].value,
    URL: inputs[1].value,
    PRICE: inputs[2].value,
  };
  const headers = new Headers();
  headers.append("Accept", "application/x-www-form-urlencoded");
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  //   headers.append("Content-Type", "application/json");

  fetch("/", {
    method: "POST",
    headers,
    body: JSON.stringify(formData),
  })
    .then((res) => {
      location.reload();
    })
    .catch((e) => console.error(e));
};
addProductForm.addEventListener("submit", (e) => handleSubmit(e));
