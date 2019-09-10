let cityButton = document.getElementById("cityButton");

cityButton.addEventListener("click", function() {
    let cityInput = document.getElementById("textbox").value;

    axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput +'&units=metric&appid=0921fb1cbfd95e028b3132ca5c1564da')
        .then(function (weatherinfo) {
            //console.log(weatherinfo.data.list.weather[0]);


            let firstDayTemp = [], secondDayTemp = [], thirdDayTemp = [], fourthDayTemp = [], fifthDayTemp = [];
            let firstDayMin = [], secondDayMin = [], thirdDayMin = [], fourthDayMin = [], fifthDayMin = [];
            let firstDayMax = [], secondDayMax = [], thirdDayMax = [], fourthDayMax = [], fifthDayMax = [];

            for(let i=0; i<40; i++){
                console.log(weatherinfo.data.list[i].weather[0]);
                switch (true) {
                    case (i<8):
                        firstDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        firstDayTemp.push(weatherinfo.data.list[i].main.temp);
                        firstDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        //console.log(firstDayMin, firstDayTemp, firstDayMax);
                        break;
                    case (i<16):
                        secondDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        secondDayTemp.push(weatherinfo.data.list[i].main.temp);
                        secondDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        //console.log(secondDayMin, secondDayTemp, secondDayMax);
                        break;
                    case (i<24):
                        thirdDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        thirdDayTemp.push(weatherinfo.data.list[i].main.temp);
                        thirdDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        //console.log(thirdDayMin, thirdDayTemp, thirdDayMax);
                        break;
                    case (i<32):
                        fourthDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        fourthDayTemp.push(weatherinfo.data.list[i].main.temp);
                        fourthDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        //console.log(fourthDayMin, fourthDayTemp, fourthDayMax);
                        break;
                    case(i<40):
                        fifthDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        fifthDayTemp.push(weatherinfo.data.list[i].main.temp);
                        fifthDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        //console.log(fifthDayMin, fifthDayTemp, fifthDayMax);
                }
            }



            firstDayMin = Math.min(...firstDayMin);
            firstDayTemp = firstDayTemp.reduce((a,b) => a + b, 0) / firstDayTemp.length;
            firstDayMax = Math.max(...firstDayMax);
            console.log("First day minimum temperature is: " + firstDayMin + ". Maximum: " + firstDayMax + ". Average: " + firstDayTemp);

            secondDayMin = Math.min(...secondDayMin);
            secondDayTemp = secondDayTemp.reduce((a,b) => a + b, 0) / secondDayTemp.length;
            secondDayMax = Math.max(...secondDayMax);
            console.log("second day minimum temperature is: " + secondDayMin + ". Maximum: " + secondDayMax + ". Average: " + secondDayTemp);

            thirdDayMin = Math.min(...thirdDayMin);
            thirdDayTemp = thirdDayTemp.reduce((a,b) => a + b, 0) / thirdDayTemp.length;
            thirdDayMax = Math.max(...thirdDayMax);
            console.log("third day minimum temperature is: " + thirdDayMin + ". Maximum: " + thirdDayMax + ". Average: " + thirdDayTemp);

            fourthDayMin = Math.min(...fourthDayMin);
            fourthDayTemp = fourthDayTemp.reduce((a,b) => a + b, 0) / fourthDayTemp.length;
            fourthDayMax = Math.max(...fourthDayMax);
            console.log("fourth day minimum temperature is: " + fourthDayMin + ". Maximum: " + fourthDayMax + ". Average: " + fourthDayTemp);

            fifthDayMin = Math.min(...fifthDayMin);
            fifthDayTemp = fifthDayTemp.reduce((a,b) => a + b, 0) / fifthDayTemp.length;
            fifthDayMax = Math.max(...fifthDayMax);
            console.log("fifth day minimum temperature is: " + fifthDayMin + ". Maximum: " + fifthDayMax + ". Average: " + fifthDayTemp);
            //weatherReport.innerText = "We have some " +  weatherinfo.data.weather[0].main + ". It's " + weatherinfo.data.main.temp + " degrees. The max temp is " + weatherinfo.data.main.temp_max + " degrees.";

            function roundNumber(number) {
                return (Math.round(number * 10) / 10).toFixed(1);
            }

            document.getElementById("weatherReport1").innerText = "First day minimum temperature is: " + roundNumber(firstDayMin) + ". Maximum: " + roundNumber(firstDayMax) + ". Average: " + roundNumber(firstDayTemp) + ".";
            document.getElementById("weatherReport2").innerText = "Second day minimum temperature is: " + roundNumber(secondDayMin) + ". Maximum: " + roundNumber(secondDayMax) + ". Average: " + roundNumber(secondDayTemp) + ".";
            document.getElementById("weatherReport3").innerText = "Third day minimum temperature is: " + roundNumber(thirdDayMin) + ". Maximum: " + roundNumber(thirdDayMax) + ". Average: " + roundNumber(thirdDayTemp) + ".";
            document.getElementById("weatherReport4").innerText = "Fourth day minimum temperature is: " + roundNumber(fourthDayMin) + ". Maximum: " + roundNumber(fourthDayMax) + ". Average: " + roundNumber(fourthDayTemp) + ".";
            document.getElementById("weatherReport5").innerText = "Fifth day minimum temperature is: " + roundNumber(fifthDayMin) + ". Maximum: " + roundNumber(fifthDayMax) + ". Average: " + roundNumber(fifthDayTemp) + ".";


        })
        .catch(function (error) {
            console.log(error);
        });
});
