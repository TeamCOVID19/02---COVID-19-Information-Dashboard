// /* globals Chart:false, feather:false */

var myChart;

(async function () {
  'use strict'
  feather.replace()

  let covidData = await getAPIData();

  drawChart(covidData, 1);
  document.getElementById("Vaccinations").onclick = function(){drawChart(covidData, 1);};
  document.getElementById("Deaths").onclick = function(){drawChart(covidData, 2);};
  document.getElementById("Cases").onclick = function(){drawChart(covidData, 3);};
})()

async function getAPIData() {
  let url = "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22newCasesByPublishDate%22:%22newCasesByPublishDate%22,%22newDeathsByDeathDate%22:%22newDeathsByDeathDate%22,%22newPeopleVaccinatedFirstDoseByPublishDate%22:%22newPeopleVaccinatedFirstDoseByPublishDate%22,%22newPeopleVaccinatedSecondDoseByPublishDate%22:%22newPeopleVaccinatedSecondDoseByPublishDate%22}";
  let response = await fetch(url);
  return await response.json();
}

function getChartLabels(covidData){
  let covidDatesArrayFull = covidData.data.map(covidDatesArrayFull => covidDatesArrayFull.date);
  return covidDatesArrayFull.slice(1, 31).reverse();
}

function getChartData(covidData, buttonSelected){
  // Vaccinations
  if(buttonSelected == 1){
    let covidVaccinationsArrayFull = covidData.data.map(covidVaccinationsArrayFull => covidVaccinationsArrayFull.newPeopleVaccinatedFirstDoseByPublishDate);
    return covidVaccinationsArrayFull.slice(1, 31).reverse();
  }
  // Deaths
  if(buttonSelected == 2){
    let covidDeathsArrayFull = covidData.data.map(covidDeathsArrayFull => covidDeathsArrayFull.newDeathsByDeathDate);
    return covidDeathsArrayFull.slice(1, 31).reverse();
  }
  // Cases
  if(buttonSelected == 3){
    let covidCasesArrayFull = covidData.data.map(covidCasesArrayFull => covidCasesArrayFull.newCasesByPublishDate);
    return covidCasesArrayFull.slice(1, 31).reverse();
  }
}

function drawChart(covidData, buttonSelected){
  var ctx = document.getElementById('myChart')

  if(window.myChart != undefined){
    window.myChart.destroy();
  }
  // eslint-disable-next-line no-unused-vars
  window.myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: getChartLabels(covidData),
      datasets: [{
        label: buttonSelected, //'New Deaths (Daily)',
        data: getChartData(covidData, buttonSelected),
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'blue',
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
}