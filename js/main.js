loadJSON();

function loadJSON(){
    
const totalBulan = 12;

    fetch("./data/orders.json")
    .then((response) => response.json())
    .then((data) => {

        // total qty
        const totalQty = data.reduce(
            (a, b) => a + b.quantity, 0);

        // Avarage
        const averageQty = data.reduce(
                (a, b) => a + b.quantity, 0)/totalBulan;
        
                console.log("averageQty => ",averageQty)
        

        // Result Data
        document.getElementById("total-qty").innerHTML = totalQty;
        document.getElementById("average-qty").innerHTML = averageQty;

    }).catch(error => {
        console.log(error);
    });
}