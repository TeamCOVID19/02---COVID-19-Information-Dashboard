// /* globals Chart:false, feather:false */
let covidData = "";

(async function () {
  'use strict'
  feather.replace()

  covidData = await getDeaths();
  let covidDatesArrayFull = covidData.data.map(covidDatesArrayFull => covidDatesArrayFull.date);
  let covidDatesArrayWeek = covidDatesArrayFull.slice(1, 8).reverse();
  let covidDeathsArrayFull = covidData.data.map(covidDeathsArrayFull => covidDeathsArrayFull.cumDeathsByDeathDate);
  let covidDeathsArrayWeek = covidDeathsArrayFull.slice(1, 8).reverse();
  
  let labels = covidDatesArrayWeek;
  let deaths = covidDeathsArrayWeek;

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Deaths',
        data: deaths,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'red',
        borderWidth: 5,
        pointBackgroundColor: 'red'
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: false
          }
        }]
      },
      legend: {
        display: true
      }
    }
  })
})()

async function getDeaths() {
  let url = "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22newCasesByPublishDate%22:%22newCasesByPublishDate%22,%22cumCasesByPublishDate%22:%22cumCasesByPublishDate%22,%22newDeathsByDeathDate%22:%22newDeathsByDeathDate%22,%22cumDeathsByDeathDate%22:%22cumDeathsByDeathDate%22}";
  let response = await fetch(url);
  return await response.json();
}