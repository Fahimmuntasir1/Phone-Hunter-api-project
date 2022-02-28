const searchButton = () => {
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => getPhonesData(data.data));

  inputField.value = "";
};
const getPhonesData = (allPhones) => {
  allPhones.forEach((phone) => {
    // console.log(phone);
    const displayPhones = document.getElementById("founded-results");
    const div = document.createElement("div");
    div.className = "col";
    div.innerHTML = `
      <div class="card">
          <img src="${phone.image}" class="card-img-top" alt="phone">
          <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="fw-bold fs-5">Brand: ${phone.brand}</p>
              <button onclick="detailsBtn('${phone.slug}')" class="btn btn-info" type="button">Details</button>
          </div>
      </div>
    `;
    displayPhones.appendChild(div);
  });
};

const detailsBtn = (detailsCode) => {
  const url = `https://openapi.programming-hero.com/api/phone/${detailsCode}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetailsInfo(data.data));
};

const showDetailsInfo = (information) => {
    console.log(information);
  const displayInfo = document.getElementById("details-info");
  const div = document.createElement("div");
  div.className = "row g-0";
  div.innerHTML = `
    
  `;
  displayInfo.appendChild(div);
};
