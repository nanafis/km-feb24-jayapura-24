loadJSON();

function loadJSON(){
    
const totalBulan = 12;
const persen = 10/100;

    fetch("./data/orders.json")
    .then((response) => response.json())
    .then((data) => {

        const filterTime = document.getElementById("filter-time").value;
     
    
        
        let resultData = data;
        if(filterTime != ""){
            resultData = data.filter((item) => item.cluster_time == filterTime);
                  
        }

        // total qty
        const totalQty = resultData.reduce(
            (a, b) => a + b.quantity, 0);

        // Avarage
        const averageQty = totalQty/totalBulan;
                
 
        // Stackholder
        const Stackholder = averageQty*persen;
        

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