'use strict'

// const apiKey = 'mdVlbBoirNgEjIJsEq97YWrChfqXTHrXEyzs2pnE'; 
const baseURL = 'https://developer.nps.gov/api/v1/parks?api_key=mdVlbBoirNgEjIJsEq97YWrChfqXTHrXEyzs2pnE&'

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function formatStateInput(stateCodes) {
  stateCodesArray = stateCodes.split(", ");
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    // for each park object in the data 
    //array, add a list item to the results 
    //list with the park name, description, directions
    //and url
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      <a href='${responseJson.data[i].url}' target='_blank'>${responseJson.data[i].url}</a/>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(stateCodesArray, maxResults=10) {
  const params = {
    // api_key: apiKey,
    stateCode: stateCodesArray,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = baseURL + queryString;

  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const stateCodes = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getParks(stateCodes, maxResults);
  });
}

$(watchForm);