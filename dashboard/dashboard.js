/* globals Chart:false, feather:false */

(function () {
  'use strict'

  feather.replace()

  // Graphs
  var ctx = document.getElementById('myChart')
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: [
        '08-Mar',
        '09-Mar',
        '10-Mar',
        '11-Mar',
        '12-Mar',
        '13-Mar',
        '14-Mar'
      ],
      datasets: [{
        label: 'First Doses',
        data: [
          215273,
          217301,
          243887,
          260809,
          369578,
          512108,
          257010
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'red',
        borderWidth: 5,
        pointBackgroundColor: 'red'
      },
      {
        label: 'Second Doses',
        data: [
          38788,
          72922,
          97162,
          93563,
          87676,
          52155,
          25371
        ],
        lineTension: 0,
        backgroundColor: 'transparent',
        borderColor: 'blue',
        borderWidth: 5,
        pointBackgroundColor: 'blue'
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
