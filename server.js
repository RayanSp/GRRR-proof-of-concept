// Importeert basis modules uit npm

import express from "express";
import dotenv from "dotenv";

// Defineer een URL
const url =
  "https://s3.eu-west-1.amazonaws.com/data.theoceancleanup.com/systems-dashboard/realtime-data-river.json";

// Maakt een nieuwe express app

const server = express();

// Stelt de public map in

server.use(express.static("public"));

// Stelt het poortnummer in waar express op gaat luisteren

server.set("port", process.env.PORT || 8000);

// Activeert het .env bestand

dotenv.config();

// Stel in hoe express gebruikt kan worden

server.set("view engine", "ejs");
server.set("views", "./views");
server.use(express.static("public"));

// Route voor de index

server.get("/", (request, response) => {
  let indexUrl = url + "/";

  fetchJson(indexUrl).then((data) => {
    response.render("index", data);
  });
});

server.get("/oceans", (request, response) => {
  let oceansUrl = url + "/oceans";

  fetchJson(oceansUrl).then((data) => {
    response.render("oceans", data);
  });
});

server.get("/rivers", (request, response) => {  
    fetchJson(url).then((data) => {
    console.log(data)
      response.render('rivers', data);
    });
  });
  
// Start express op, haal het ingestelde poortnummer op

server.set("port", process.env.PORT || 8000);
server.listen(server.get("port"), function () {
  console.log(`Application started on http://localhost:${server.get("port")}`);
});

/**

* fetchJson() is a wrapper for the experimental node fetch api. It fetches the url

* passed as a parameter and returns the response body parsed through json.

* @param {*} url the api endpoint to address

* @returns the json response from the api endpoint

*/

export async function fetchJson(url) {
  return await fetch(url)
    .then((response) => response.json())

    .catch((error) => error);
}

export default server;
