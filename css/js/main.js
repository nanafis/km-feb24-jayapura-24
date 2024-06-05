document.addEventListener("DOMContentLoaded", function () {
  let labels = ["P1", "P2", "P3"];
  let clusterData = [0, 0, 0];
  let labelSize = ["S", "M", "L", "XL", "XXL"];
  let sizeData = [0, 0, 0];
  let labelTop10 = [];
  let dataTop10 = [];
  let labelLow10 = [];
  let dataLow10 = [];
  let labelCategory = [];
  let dataCategory = [];
  let labelPenjualanPerBulan = [];
  let quantityData = [];
  let hargaPizzaData = [];

  const ctx = document.getElementById('clusterChart');
  const chartCluster = new Chart(ctx, {
      type: 'bar',
      data: {
          labels: labels,
          datasets: [{
              label: 'Cluster Price',
              data: clusterData,
              borderWidth: 1,
              backgroundColor: "purple"
          }],
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
              },
          },
      },
  });

  const ctxSize = document.getElementById('totalSizes');
  const chartSize = new Chart(ctxSize, {
      type: 'bar',
      data: {
          labels: labelSize,
          datasets: [{
              label: 'Total Size',
              data: sizeData,
              borderWidth: 1,
              backgroundColor: "Blue"
          }],
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true,
              },
          },
      },
  });

  const ctxtop10 = document.getElementById('top10pizza');
  const charttop10 = new Chart(ctxtop10, {
      type: 'bar',
      data: {
          labels: labelTop10,
          datasets: [{
              label: 'Top 10 Pizza',
              data: dataTop10,
              borderWidth: 1,
              backgroundColor: "Green"
          }],
      },
      options: {
          indexAxis: 'y', // Mengatur sumbu x menjadi sumbu y
          scales: {
              x: { // Mengatur konfigurasi untuk sumbu y
                  beginAtZero: true,
              },
          },
      },
  });

  const ctxLow10 = document.getElementById('low10pizza');
  const chartLow10 = new Chart(ctxLow10, {
      type: 'bar',
      data: {
          labels: labelLow10,
          datasets: [{
              label: 'Lowest 10 Pizza',
              data: dataLow10,
              borderWidth: 1,
              backgroundColor: "Red"
          }],
      },
      options: {
          indexAxis: 'y', // Mengatur sumbu x menjadi sumbu y
          scales: {
              x: { // Mengatur konfigurasi untuk sumbu y
                  beginAtZero: true,
              },
          },
      },
  });

  const ctxCategory = document.getElementById('totalcategory');
  const chartCategory = new Chart(ctxCategory, {
      type: 'pie',
      data: {
          labels: labelCategory,
          datasets: [{
              label: 'Category Distribution',
              data: dataCategory,
              backgroundColor: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"]
          }],
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
          },
      },
  });

  const ctxPenjualanPerBulan = document.getElementById('penjualanperbulan');
  const chartPenjualanPerBulan = new Chart(ctxPenjualanPerBulan, {
      type: 'bar',
      data: {
          labels: labelPenjualanPerBulan,
          datasets: [
              {
                  label: 'Quantity',
                  data: quantityData,
                  borderWidth: 1,
                  backgroundColor: "Orange"
              },
              {
                  label: 'Harga Pizza',
                  data: hargaPizzaData,
                  borderWidth: 1,
                  backgroundColor: "Blue"
              }
          ],
      },
      options: {
          indexAxis: 'y', // Mengatur sumbu x menjadi sumbu y
          scales: {
              x: { // Mengatur konfigurasi untuk sumbu y
                  beginAtZero: true,
              },
          },
      },
  });

  


  loadJSON();

  function loadJSON() {
      const totalBulan = 12;
      const persen = 10 / 100;

      fetch("./data/orders.json")
          .then((response) => response.json())
          .then((data) => {
              const filterTime = document.getElementById("filter-time").value;
              const filterBulan = document.getElementById("filter-bulan").value;

              let resultData = data;

              if (filterTime != "" && filterBulan != "") {
                  resultData = data.filter((item) => item.cluster_time == filterTime && item.bulan == filterBulan);
              } else if (filterTime == "" && filterBulan != "") {
                  resultData = data.filter((item) => item.bulan == filterBulan);
              } else if (filterTime != "" && filterBulan == "") {
                  resultData = data.filter((item) => item.cluster_time == filterTime);
              }

              const totalQty = resultData.reduce((a, b) => a + b.quantity, 0);
              const averageQty = totalQty / totalBulan;
              const Stackholder = averageQty * persen;

              clusterChart(resultData);
              totalChartSize(resultData);
              top10Chart(resultData);
              low10Chart(resultData);
              categoryChart(resultData);
              penjualanPerBulanChart(resultData);

              document.getElementById("total-qty").innerHTML = totalQty;
              document.getElementById("average-qty").innerHTML = averageQty.toFixed(2);
              document.getElementById("stackholder").innerHTML = Stackholder.toFixed(2);
          })
          .catch(error => {
              console.log(error);
          });
  }

  document.getElementById("btn-filter").addEventListener("click", function () {
      loadJSON();
  });

  function clusterChart(resultData) {
      let newData = [0, 0, 0];

      labels.map((item, index) => {
          const filterData = resultData
              .filter((itemCluster) => itemCluster.cluster_price == item)
              .reduce((acc, curr) => acc + curr.quantity, 0);

          newData[index] = filterData;
      });

      chartCluster.data.datasets[0].data = newData;
      chartCluster.update();
  }

  function totalChartSize(resultData) {
      let newData = [0, 0, 0];

      labelSize.map((item, index) => {
          const filterData = resultData
              .filter((itemSize) => itemSize.size == item)
              .reduce((acc, curr) => acc + curr.quantity, 0);

          newData[index] = filterData;
      });

      chartSize.data.datasets[0].data = newData;
      chartSize.update();
  }

  function top10Chart(resultData) {
      const sortedData = resultData.slice().sort((a, b) => b.quantity - a.quantity);
      labelTop10 = sortedData.slice(0, 10).map(item => item.pizza_type_id);
      dataTop10 = sortedData.slice(0, 10).map(item => item.quantity);

      charttop10.data.labels = labelTop10;
      charttop10.data.datasets[0].data = dataTop10;
      charttop10.update();
  }

  function low10Chart(resultData) {
      const sortedData = resultData.slice().sort((a, b) => a.quantity - b.quantity);
      labelLow10 = sortedData.slice(0, 10).map(item => item.pizza_type_id);
      dataLow10 = sortedData.slice(0, 10).map(item => item.quantity);

      chartLow10.data.labels = labelLow10;
      chartLow10.data.datasets[0].data = dataLow10;
      chartLow10.update();
  }

  function categoryChart(resultData) {
      const categoryData = resultData.reduce((acc, item) => {
          if (!acc[item.category]) {
              acc[item.category] = 0;
          }
          acc[item.category] += item.quantity;
          return acc;
      }, {});

      labelCategory = Object.keys(categoryData);
      dataCategory = Object.values(categoryData);

      chartCategory.data.labels = labelCategory;
      chartCategory.data.datasets[0].data = dataCategory;
      chartCategory.update();
  }

  function penjualanPerBulanChart(resultData) {
      const monthlyData = resultData.reduce((acc, item) => {
          if (!acc[item.bulan]) {
              acc[item.bulan] = { quantity: 0, harga_pizza: 0 };
          }
          acc[item.bulan].quantity += item.quantity;
          acc[item.bulan].harga_pizza += item.harga_pizza;
          return acc;
      }, {});

      labelPenjualanPerBulan = Object.keys(monthlyData);
      quantityData = Object.values(monthlyData).map(item => item.quantity);
      hargaPizzaData = Object.values(monthlyData).map(item => item.harga_pizza);

      chartPenjualanPerBulan.data.labels = labelPenjualanPerBulan;
      chartPenjualanPerBulan.data.datasets[0].data = quantityData;
      chartPenjualanPerBulan.data.datasets[1].data = hargaPizzaData;
      chartPenjualanPerBulan.update();
  }
});
