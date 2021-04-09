let chart;
let covidData;

(async function () {
  'use strict'
  feather.replace()

  covidData = await getAPIData();

  drawChart();
  addVaccineData();

  document.getElementById("Vaccinations").onclick = function(){addVaccineData()};
  document.getElementById("Deaths").onclick = function(){addDeathData();};
  document.getElementById("Cases").onclick = function(){addCaseData();};
})()

async function getAPIData() {
  //let url = "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=overview&structure={%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22newCasesByPublishDate%22:%22newCasesByPublishDate%22,%22newDeathsByDeathDate%22:%22newDeathsByDeathDate%22,%22newPeopleVaccinatedFirstDoseByPublishDate%22:%22newPeopleVaccinatedFirstDoseByPublishDate%22,%22newPeopleVaccinatedSecondDoseByPublishDate%22:%22newPeopleVaccinatedSecondDoseByPublishDate%22}";
  let url = "https://api.coronavirus.data.gov.uk/v1/data?filters=areaType=nation;areaName=england&structure={%22date%22:%22date%22,%22areaName%22:%22areaName%22,%22areaCode%22:%22areaCode%22,%22newCasesByPublishDate%22:%22newCasesByPublishDate%22,%22newDeathsByDeathDate%22:%22newDeathsByDeathDate%22,%22newPeopleVaccinatedFirstDoseByPublishDate%22:%22newPeopleVaccinatedFirstDoseByPublishDate%22,%22newPeopleVaccinatedSecondDoseByPublishDate%22:%22newPeopleVaccinatedSecondDoseByPublishDate%22}";
  let response = await fetch(url);
  return await response.json();
}

function addVaccineData(){
  chart.destroy();
  drawChart();
  chart.data.datasets.push({
    label: null,
    data: null,
    lineTension: 0,
    backgroundColor: 'transparent',
    borderColor: 'red',
    borderWidth: 1,
    pointBackgroundColor: 'red'
  });
  chart.update();

  chart.data.datasets[0].label = "New People Vaccinated By Publish Date (First Dose)"; //Legend Label
  chart.data.datasets[1].label = "New People Vaccinated By Publish Date (Second Dose)"; //Legend Label
  getChartLabels().forEach(label => chart.data.labels.push(label)); //Chart Labels
  getChartData("First Dose Vaccines").forEach(item => chart.data.datasets[0].data.push(item)); //Chart Data
  getChartData("Second Dose Vaccines").forEach(item => chart.data.datasets[1].data.push(item)); //Chart Data
  chart.update();
}

function addDeathData(){
  chart.destroy();
  drawChart();
  chart.data.datasets[0].label = "New Deaths By Death Date"; //Legend Label
  getChartLabels().forEach(label => chart.data.labels.push(label)); //Chart Labels
  getChartData("Deaths").forEach(item => chart.data.datasets[0].data.push(item)); //Chart Data
  chart.update();
}

function addCaseData(){
  chart.destroy();
  drawChart();
  chart.data.datasets[0].label = "New Cases By Publish Date"; //Legend Label
  getChartLabels().forEach(label => chart.data.labels.push(label)); //Chart Labels
  getChartData("Cases").forEach(item => chart.data.datasets[0].data.push(item)); //Chart Data
  chart.update();
}

function getChartLabels(){
  let covidDatesArrayFull = covidData.data.map(covidDatesArrayFull => covidDatesArrayFull.date);
  return covidDatesArrayFull.slice(0, 31).reverse();
}

function getChartData(dataset){
  // Vaccinations
  if(dataset == "First Dose Vaccines"){
    let covidVaccinationsArrayFull = covidData.data.map(covidVaccinationsArrayFull => covidVaccinationsArrayFull.newPeopleVaccinatedFirstDoseByPublishDate);
    return covidVaccinationsArrayFull.slice(0, 31).reverse();
  }
  if(dataset == "Second Dose Vaccines"){
    let covidVaccinationsArrayFull = covidData.data.map(covidVaccinationsArrayFull => covidVaccinationsArrayFull.newPeopleVaccinatedSecondDoseByPublishDate);
    return covidVaccinationsArrayFull.slice(0, 31).reverse();
  }
  // Deaths
  if(dataset == "Deaths"){
    let covidDeathsArrayFull = covidData.data.map(covidDeathsArrayFull => covidDeathsArrayFull.newDeathsByDeathDate);
    return covidDeathsArrayFull.slice(0, 31).reverse();
  }
  // Cases
  if(dataset == "Cases"){
    let covidCasesArrayFull = covidData.data.map(covidCasesArrayFull => covidCasesArrayFull.newCasesByPublishDate);
    return covidCasesArrayFull.slice(0, 31).reverse();
  }
}

function drawChart(){
  chart = new Chart(document.getElementById('canvas'), {
    type: 'line',
    data: {
      labels: null,
      datasets: [{
        label: null,
        data: null,
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'blue',
        borderWidth: 1,
        pointBackgroundColor: 'blue'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          ticks: {
            maxTicksLimit: 10
          }
        }],
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      },
      legend: {
        display: true
      }
    }
  });
}