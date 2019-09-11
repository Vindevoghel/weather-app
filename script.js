let cityButton = document.getElementById("cityButton");


cityButton.addEventListener("click", function () {
    let cityInput = document.getElementById("textbox").value;

    axios.all([
        axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + cityInput + '&units=metric&appid=0921fb1cbfd95e028b3132ca5c1564da'),
        axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + cityInput + '&units=metric&appid=0921fb1cbfd95e028b3132ca5c1564da')
    ])
        .then(axios.spread((function (weatherinfo, weathertoday) {
            //console.log("Forecast", weatherinfo);
            //console.log("Current", weathertoday);

            function icon(icon) {
                return "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            }

            function roundNumber(number) {
                return (Math.round(number * 10) / 10).toFixed(1);
            }

            function mostOccurences(arr) {
                return arr.sort((a, b) =>
                    arr.filter(v => v === a).length
                    - arr.filter(v => v === b).length
                ).pop();
            }

            function clothingAdvice(daytemp, dayadvice, weatherreport) {
                const HOT = 40;
                const WARM = 25;
                const CHILLY = 15;
                const COLD = 0;
                switch (true) {
                    case(daytemp > HOT):
                        dayadvice.innerText = "Stay inside. You will melt.";
                        weatherreport.style.background = "Crimson";
                        weatherreport.style.color = "white";
                        break;
                    case(daytemp > WARM /*&& daytemp < HOT*/):
                        dayadvice.innerText = "Sun's out, gun's out!";
                        weatherreport.style.background = "OrangeRed";
                        weatherreport.style.color = "white";
                        break;
                    case(daytemp > CHILLY /*&& daytemp < WARM*/):
                        dayadvice.innerText = "Bring a jumper!";
                        weatherreport.style.background = "PaleGreen";
                        weatherreport.style.color = "black";
                        break;
                    case(daytemp > COLD):
                        dayadvice.innerText = "Bring a coat!";
                        weatherreport.style.background = "Steelblue";
                        break;
                    case(daytemp < COLD):
                        dayadvice.innerText = "FREEZING, bring your thermal underwear!";
                        weatherreport.style.background = "lightblue";
                        weatherreport.style.color = "black";
                }
            }

            let firstDayTemp = [], secondDayTemp = [], thirdDayTemp = [], fourthDayTemp = [], fifthDayTemp = [];
            let firstDayMin = [], secondDayMin = [], thirdDayMin = [], fourthDayMin = [], fifthDayMin = [];
            let firstDayMax = [], secondDayMax = [], thirdDayMax = [], fourthDayMax = [], fifthDayMax = [];
            let firstDayTypeArr = [], secondDayTypeArr = [], thirdDayTypeArr = [], fourthDayTypeArr = [], fifthDayTypeArr = [];
            let firstDayIconArr = [], secondDayIconArr = [], thirdDayIconArr = [], fourthDayIconArr = [],
                fifthDayIconArr = [];

            for (let i = 0; i < 40; i++) {
                console.log(weatherinfo.data.list[i].weather[0]);
                switch (true) {
                    case (i < 8):
                        firstDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        firstDayTemp.push(weatherinfo.data.list[i].main.temp);
                        firstDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        firstDayTypeArr.push(weatherinfo.data.list[i].weather[0].main);
                        firstDayIconArr.push(weatherinfo.data.list[i].weather[0].icon);
                        //console.log(firstDayMin, firstDayTemp, firstDayMax);
                        break;
                    case (i < 16):
                        secondDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        secondDayTemp.push(weatherinfo.data.list[i].main.temp);
                        secondDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        secondDayTypeArr.push(weatherinfo.data.list[i].weather[0].main);
                        secondDayIconArr.push(weatherinfo.data.list[i].weather[0].icon);
                        //console.log(secondDayMin, secondDayTemp, secondDayMax);
                        break;
                    case (i < 24):
                        thirdDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        thirdDayTemp.push(weatherinfo.data.list[i].main.temp);
                        thirdDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        thirdDayTypeArr.push(weatherinfo.data.list[i].weather[0].main);
                        thirdDayIconArr.push(weatherinfo.data.list[i].weather[0].icon);
                        //console.log(thirdDayMin, thirdDayTemp, thirdDayMax);
                        break;
                    case (i < 32):
                        fourthDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        fourthDayTemp.push(weatherinfo.data.list[i].main.temp);
                        fourthDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        fourthDayTypeArr.push(weatherinfo.data.list[i].weather[0].main);
                        fourthDayIconArr.push(weatherinfo.data.list[i].weather[0].icon);
                        //console.log(fourthDayMin, fourthDayTemp, fourthDayMax);
                        break;
                    case(i < 40):
                        fifthDayMin.push(weatherinfo.data.list[i].main.temp_min);
                        fifthDayTemp.push(weatherinfo.data.list[i].main.temp);
                        fifthDayMax.push(weatherinfo.data.list[i].main.temp_max);
                        fifthDayTypeArr.push(weatherinfo.data.list[i].weather[0].main);
                        fifthDayIconArr.push(weatherinfo.data.list[i].weather[0].icon);
                        //console.log(fifthDayMin, fifthDayTemp, fifthDayMax);
                }
            }

            currentTemp = roundNumber(weathertoday.data.main.temp);
            currentMax = roundNumber(weathertoday.data.main.temp_max);
            currentMin = roundNumber(weathertoday.data.main.temp_min);
            currentType = weathertoday.data.weather[0].main;

            //firstDayMin = roundNumber(Math.min(...firstDayMin));
            //firstDayTemp = roundNumber(firstDayTemp.reduce((a, b) => a + b, 0) / firstDayTemp.length);
            //firstDayMax = roundNumber(Math.max(...firstDayMax));
            //console.log("First day minimum temperature is: " + firstDayMin + ". Maximum: " + firstDayMax + ". Average: " + firstDayTemp);

            day2Min = roundNumber(Math.min(...secondDayMin));
            day2Avg = roundNumber(secondDayTemp.reduce((a, b) => a + b, 0) / secondDayTemp.length);
            day2Max = roundNumber(Math.max(...secondDayMax));
            console.log("second day minimum temperature is: " + secondDayMin + ". Maximum: " + secondDayMax + ". Average: " + secondDayTemp);

            day3Min = roundNumber(Math.min(...thirdDayMin));
            day3Avg = roundNumber(thirdDayTemp.reduce((a, b) => a + b, 0) / thirdDayTemp.length);
            day3Max = roundNumber(Math.max(...thirdDayMax));
            console.log("third day minimum temperature is: " + thirdDayMin + ". Maximum: " + thirdDayMax + ". Average: " + thirdDayTemp);

            day4Min = roundNumber(Math.min(...fourthDayMin));
            day4Avg = roundNumber(fourthDayTemp.reduce((a, b) => a + b, 0) / fourthDayTemp.length);
            day4Max = roundNumber(Math.max(...fourthDayMax));
            console.log("fourth day minimum temperature is: " + fourthDayMin + ". Maximum: " + fourthDayMax + ". Average: " + fourthDayTemp);

            day5Min = roundNumber(Math.min(...fifthDayMin));
            day5Avg = roundNumber(fifthDayTemp.reduce((a, b) => a + b, 0) / fifthDayTemp.length);
            day5Max = roundNumber(Math.max(...fifthDayMax));
            console.log("fifth day minimum temperature is: " + fifthDayMin + ". Maximum: " + fifthDayMax + ". Average: " + fifthDayTemp);


            let weekArray = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


            let date = new Date();
            let day = date.getDay();
            console.log(day);
            function weekArraylooper(day, num) {
                day += num;
                if (day >= 6){
                    day = 0;
                }
                return weekArray[day]
            }
            console.log(weekArraylooper(day, 1));
            console.log(weekArraylooper(day, 2));
            console.log(weekArraylooper(day, 3));
            console.log(weekArraylooper(day, 4));
            console.log(weekArraylooper(day, 5));



            document.getElementById("todaydate").innerText = weekArray[date.getDay()];
            document.getElementById("weatherType").innerText = currentType;
            document.getElementById("todayIcon").src = icon(weathertoday.data.weather[0].icon);
            document.getElementById("avgTemp1").innerText = "The current temperature is " + currentTemp + ".";
            document.getElementById("minTemp1").innerText = "Minimum temperature is " + currentMin + ".";
            document.getElementById("maxTemp1").innerText = "Maximum temperature is " + currentMax + ".";
            clothingAdvice(currentTemp, advice1, weatherReport1);

            document.getElementById("day2").innerText = "Forecast for " + weekArray[date.getDay()+1] + ".";
            document.getElementById("weatherType2").innerText = mostOccurences(secondDayTypeArr);
            document.getElementById("icon2").src = icon(mostOccurences(secondDayIconArr));
            document.getElementById("avgTemp2").innerText = "Average temperature will be " + day2Avg + ".";
            document.getElementById("minTemp2").innerText = "Minimum temperature will be " + day2Min + ".";
            document.getElementById("maxTemp2").innerText = "Maximum temperature will be " + day2Max + ".";
            clothingAdvice(day2Avg, advice2, weatherReport2);


            document.getElementById("day3").innerText = "Forecast for " + weekArray[date.getDay()+2] + ".";
            document.getElementById("weatherType3").innerText = mostOccurences(thirdDayTypeArr);
            document.getElementById("icon3").src = icon(mostOccurences(thirdDayIconArr));
            document.getElementById("avgTemp3").innerText = "Average temperature will be " + day3Avg + ".";
            document.getElementById("minTemp3").innerText = "Minimum temperature will be " + day3Min + ".";
            document.getElementById("maxTemp3").innerText = "Maximum temperature will be " + day3Max + ".";
            clothingAdvice(day3Avg, advice3, weatherReport3);

            document.getElementById("day4").innerText = "Forecast for " + weekArray[date.getDay()+3] + ".";
            document.getElementById("weatherType4").innerText = mostOccurences(fourthDayTypeArr);
            document.getElementById("icon4").src = icon(mostOccurences(fourthDayIconArr));
            document.getElementById("avgTemp4").innerText = "Average temperature will be " + day4Avg + ".";
            document.getElementById("minTemp4").innerText = "Minimum temperature will be " + day4Min + ".";
            document.getElementById("maxTemp4").innerText = "Maximum temperature will be " + day4Max + ".";
            clothingAdvice(day4Avg, advice4, weatherReport4);

            document.getElementById("day5").innerText = "Forecast for " + weekArray[date.getDay()+4] + ".";
            document.getElementById("weatherType5").innerText = mostOccurences(fifthDayTypeArr);
            document.getElementById("icon5").src = icon(mostOccurences(fifthDayIconArr));
            document.getElementById("avgTemp5").innerText = "Average temperature will be " + day5Avg + ".";
            document.getElementById("minTemp5").innerText = "Minimum temperature will be " + day5Min + ".";
            document.getElementById("maxTemp5").innerText = "Maximum temperature will be " + day5Max + ".";
            clothingAdvice(day5Avg, advice5, weatherReport5);

        })))
        .catch(function (error) {
            console.log(error);
        });
});


//document.getElementById("weatherReport2").innerText = "Second day minimum temperature is: " + roundNumber(secondDayMin) + ". Maximum: " + roundNumber(secondDayMax) + ". Average: " + roundNumber(secondDayTemp) + ".";
//document.getElementById("weatherReport3").innerText = "Third day minimum temperature is: " + roundNumber(thirdDayMin) + ". Maximum: " + roundNumber(thirdDayMax) + ". Average: " + roundNumber(thirdDayTemp) + ".";
//document.getElementById("weatherReport4").innerText = "Fourth day minimum temperature is: " + roundNumber(fourthDayMin) + ". Maximum: " + roundNumber(fourthDayMax) + ". Average: " + roundNumber(fourthDayTemp) + ".";
//document.getElementById("weatherReport5").innerText = "Fifth day minimum temperature is: " + roundNumber(fifthDayMin) + ". Maximum: " + roundNumber(fifthDayMax) + ". Average: " + roundNumber(fifthDayTemp) + ".";