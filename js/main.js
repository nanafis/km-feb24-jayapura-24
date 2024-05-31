loadJSON();

function loadJSON(){
    
const totalBulan = 12;
const persen = 10/100;

    fetch("./data/orders.json")
    .then((response) => response.json())
    .then((data) => {

        const filterTime = document.getElementById("filter-time").value;
        const filterBulan = document.getElementById("filter-bulan").value;
     
        let resultData = data;

        if(filterTime !="" && filterBulan !=""){
            resultData = data.filter((item) => item.cluster_time == filterTime && item.bulan == filterBulan);
                  
        }else if (filterTime == "" && filterBulan !=""){
            resultData = data.filter((item) => item.bulan == filterBulan);

        }else if (filterTime !="" && filterBulan ==""){
            resultData = data.filter((item) => item.cluster_time == filterTime);

        }

        // total qty
        const totalQty = resultData.reduce(
            (a, b) => a + b.quantity, 0);

        // Avarage
        const averageQty = totalQty/totalBulan;
                
        // Stackholder
        const Stackholder = averageQty*persen;

        // ClusterPriceChart
        clusterPriceChart = (resultData);
        

        // Result Data
        document.getElementById("total-qty").innerHTML = totalQty;
        document.getElementById("average-qty").innerHTML = averageQty.toFixed(2);
        document.getElementById("stackholder").innerHTML = Stackholder.toFixed(2);

    }).catch(error => {
        console.log(error);
    });
}

document.getElementById("btn-filter").addEventListener("click",function(){
    loadJSON();
})

function clusterPriceChart(resultData) {

    const ctx = document.getElementById('clusterPriceChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

}