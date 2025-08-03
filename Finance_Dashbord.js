google.charts.load("current", { packages: ["corechart"] }).then(loadUser);


async function loadUser() {
    try{
        const request = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd")
        const request1 = await fetch("https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=90")
        const request2 = await fetch("https://open.er-api.com/v6/latest/USD")
        const request3 = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=rub")
        const request4 = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=kaspa&vs_currencies=usd")

        const btcUsd = await request.json()
        const graf = await request1.json()
        const usdRub = await request2.json()
        const btcRub = await request3.json()
        const kasUsd = await request4.json()

        const chartData = graf.prices.map(p => [new Date(p[0]),p[1]]);
        const formatForGoogle = [["Time","Price"],...chartData]
        makeChart(formatForGoogle)


        console.log(btcUsd)
        console.log(usdRub)
        console.log(btcRub)
        console.log(kasUsd)
        
        document.getElementById("btcUsd").innerText=(btcUsd.bitcoin.usd)
        document.getElementById("usdRub").innerText=(usdRub.rates.RUB)
        document.getElementById("btcRub").innerText=(btcRub.bitcoin.rub)
        document.getElementById("kasUsd").innerText=(kasUsd.kaspa.usd)
        
    }catch(error){
            alert("Ooops!!");}
    
}

function makeChart(formatForGoogle){
    const data = google.visualization.arrayToDataTable(formatForGoogle)
    const options = {
        title: "BTC Prices Chart",
            titleTextStyle: {
            color: "rgb(224, 203, 174)",    
            fontSize: 18,                   
            fontName: "Arial"},       
            
        curveType: "function",
        legend: {position: "bottom"},
        colors: ["rgb(101, 105, 78)"],
        format: "currency",
        backgroundColor: "transparent",
        chartArea: { width: "90%", height: "70%" },
        vAxis: {
            viewWindow: {
                min: 100000,
                max: 130000},
            gridlines: {
                color: "transparent"},
            textStyle: {
                color: "rgb(154, 151, 116)",
                fontSize: 14}},
        hAxis:{
            gridlines: {
                color: "transparent"},
            textStyle: {
                color: "rgb(154, 151, 116)",
                fontSize: 14}
            }
        }
        
        const displayFinishChart = new google.visualization.LineChart(document.getElementById("graf"));

        displayFinishChart.draw(data,options);
}
