var currentYear = new Date().getFullYear();
var yearStart = `Jan 1, ${currentYear} 00:00:00`;
var yearEnd = `Jan 1, ${currentYear + 1} 00:00:00`;

var x = setInterval(function () {
  // calculate distance between now and the end of the year
  var distance = new Date(yearEnd).getTime() - new Date().getTime();

  // calculate percentage of year completed
  var secondsOfYear = (new Date(yearEnd) - new Date(yearStart)) / 1000;
  var secondsElapsed = (new Date().getTime() - new Date(yearStart)) / 1000;
  var yearCompletion = (secondsElapsed / secondsOfYear) * 100;

  // calculate time remaining
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // display the result
  document.getElementById("countdown").innerHTML =
    `There are ${days} days, ${hours} hours, ${minutes} minutes, and ${seconds} seconds left in ${currentYear}.`;
  document.getElementById("progress").innerHTML = `${currentYear} is ${yearCompletion.toFixed(6)}% complete.`;

  // calculate next percentage
  function calculateNextPercentage(totalSecondsOfYear, secondsElapsed) {
    // calculate next percentage
    var currentPercentage = (secondsElapsed / totalSecondsOfYear) * 100;
    var nextPercentage = Math.ceil(currentPercentage);
    // calculate date of next percentage
    var secondsToNextPercentage = totalSecondsOfYear * (nextPercentage / 100);
    var futurePercentageDate = new Date(yearStart).getTime() + secondsToNextPercentage * 1000;
    futurePercentageDate = new Date(futurePercentageDate).toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    });
    return [nextPercentage, futurePercentageDate];
  }

  // display the result
  var nextPercentage = calculateNextPercentage(secondsOfYear, secondsElapsed);
  document.getElementById("next-percentage").innerHTML = `2024 will be ${`${nextPercentage[0]}%`} complete on ${
    nextPercentage[1]
  }.`;

  // update progress bar
  document.getElementById("progress-bar").style.width = yearCompletion + "%";

  if (distance < 0) {
    clearInterval(x);
    document.getElementsByTagName("BODY")[0].style.display = "none";
  }

  // update current time
  document.getElementById("current-time").innerHTML = `${new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
  })}`;
}, 100);

document.getElementById("footer").innerHTML =
  `a creation by <a class="underline hover:text-[#9DB2BF]" href="https://github.com/kennytrbl" target="_blank">Kenny Zhang</a>, © ${currentYear}`;
