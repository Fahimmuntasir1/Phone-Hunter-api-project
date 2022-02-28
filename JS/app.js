const searchButton = () => {
  document.getElementById("founded-results").textContent = "";
  document.getElementById("spinner").style.display = "block";
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  inputField.value = "";
  if (inputValue == "" || inputValue == "number") {
      alert('dfdkj')
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length == 0) {
          document.getElementById("spinner").style.display = "block";
          document.getElementById("wrong-message").style.display = "block";
        } else {
          getPhonesData(data.data);
          document.getElementById("wrong-message").style.display = "none";
          document.getElementById("spinner").style.display = "none";
        }
      });
  }
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
  const releaseDate = document.getElementById("release-date");
  div.className = "row g-0";
  div.innerHTML = `
  <div class="col-md-4">
  <img src="${information.image}" class="img-fluid rounded-start" alt="...">
</div>
<div class="col-md-8">
  <div class="card-body">
      <h5 class="card-title">${information.name}</h5>
      <p id="release-date" class="text-muted">${information.releaseDate}</p>
      <p>Main Features: <b>Chipset:</b> ${information.mainFeatures.chipSet}, <b>Display-Size:</b> ${information.mainFeatures.displaySize}, <b>Memory:</b> ${information.mainFeatures.memory}</p>
      
  </div>
</div>
  `;
  displayInfo.appendChild(div);
};
