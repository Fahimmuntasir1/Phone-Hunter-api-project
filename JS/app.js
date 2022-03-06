const searchButton = () => {
  // clear
  document.getElementById("founded-results").textContent = "";
  document.getElementById("details-info").innerHTML = "";
  //spinner
  document.getElementById("spinner").style.display = "block";
  //input field
  const inputField = document.getElementById("input-field");
  const inputValue = inputField.value;
  inputField.value = "";
  // fetch with error message
  if (inputValue == "") {
    document.getElementById("wrong-message").style.display = "block";
    document.getElementById("spinner").style.display = "none";
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${inputValue}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length == 0) {
          document.getElementById("spinner").style.display = "none";
          document.getElementById("wrong-message").style.display = "block";
          document.getElementById("details-info").innerHTML = "";
        } else {
          getPhonesData(data.data.slice(0, 20));
          document.getElementById("wrong-message").style.display = "none";
          document.getElementById("spinner").style.display = "none";
        }
      });
  }
};
// display phone results
const getPhonesData = (allPhones) => {
  // console.log(allPhones);
  allPhones.forEach((phone) => {
    // console.log(phone);
    const displayPhones = document.getElementById("founded-results");
    const div = document.createElement("div");
    div.className = "col";
    div.innerHTML = `
      <div class="card">
          <img src="${phone.image}" class="card-img-top m-auto w-50 p-2" alt="phone">
          <div class="card-body">
              <h5 class="card-title">${phone.phone_name}</h5>
              <p class="fw-bold fs-5">Brand: ${phone.brand}</p>
              <button onclick="detailsBtn('${phone.slug}')" class="btn btn-primary" type="button">Details</button>
          </div>
      </div>
    `;
    displayPhones.appendChild(div);
  });
};
// fetch details info
const detailsBtn = (detailsCode) => {
  const url = `https://openapi.programming-hero.com/api/phone/${detailsCode}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showDetailsInfo(data.data));
  document.getElementById("details-info").innerHTML = "";
};
// show details info
const showDetailsInfo = (info) => {
  console.log(info);
  const displayInfo = document.getElementById("details-info");
  const div = document.createElement("div");
  div.className = "row g-0 p-2";
  div.innerHTML = `
        <div class="col-md-4 col-sm-12 text-center">
        <img src="${
          info.image
        }" class="img-fluid rounded-start " width="75%" alt="...">
      </div>
      <div class="col-md-8 col-sm-12">
        <div class="card-body">
              <h5 class="card-title">${info.name}</h5>
              <p id="release-date" class="text-muted">${
                info.releaseDate ? info.releaseDate : "No release date found"
              }</p>
              <p> <span class="fs-5 fw-bold text-muted">Main Features:</span> </br> <b>Chipset :</b> ${
                info.mainFeatures.chipSet
                  ? info.mainFeatures.chipSet
                  : "Unknown Chipset"
              },</br> <b>Display-Size : </b> ${
    info.mainFeatures.displaySize
  },</br> <b>Memory :</b> ${
    info.mainFeatures.memory ? info.mainFeatures.memory : 'Not Found'
  },</br> <b id="sensors">Sensors :</b> ${info.mainFeatures.sensors} </p>
              <p> <b>Others Feature : </b> </br> Bluetooth : ${
                info?.others?.Bluetooth|| 'not found'
              }, GPS : ${info?.others?.GPS || 'not found'}, NFC : ${info?.others?.NFC||'not found'}, Radio : ${
    info?.others?.Radio||'not found'
  }, USB : ${info?.others?.USB||'not found'}, WLAN : ${info?.others?.WLAN||'not found'}</p>
        </div>
      </div>
        `;


  displayInfo.appendChild(div);
};
