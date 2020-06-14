let expireDate = new Date(2020, 05, 30)
let todayDate = new Date()
    // console.log('totaldaysLeft:', expireDate.getDate() - todayDate.getDate())

if (((expireDate.getDate() - todayDate.getDate()) > 0) && (expireDate.getMonth() - todayDate.getMonth() > -1)) {
    if ((expireDate.getDate() - todayDate.getDate()) >= 1) {
        var days = expireDate.getDate() - todayDate.getDate() - 1
    } else {
        var days = expireDate.getDate() - todayDate.getDate()
    }
    var hours = 24 - todayDate.getHours()
    var min = 60 - todayDate.getMinutes()
    var sec = 60 - todayDate.getSeconds()

    function timecal() {

        var D = document.getElementById("days") //dhms_info_give_itHere
        var H = document.getElementById("hours") //dhms_info_give_itHere
        var M = document.getElementById("min") //dhms_info_give_itHere
        var S = document.getElementById("sec") //dhms_info_give_itHere

        function update() {
            if (days == 0 && hours == 0 && min == 0 && sec == 0) {
                console.log("asdfgbn")
                alert('Times Up\nThis site will continue for more 1 Day \nDo share and Win')
                clearInterval(clock)
                return false

            }
            if (hours == 0 && min == 0 && sec == 0) {
                if (days != 0) {
                    days--
                }
                hours = hours + 24

            }
            if (min == 0 && sec == 0) {
                hours--
                min = min + 60

            }
            if (sec == 0) {
                min--
                sec = sec + 60

            }
            sec--

            D.innerText = days, 2
            H.innerText = hours
            M.innerText = min
            S.innerText = sec
        }

        clock = setInterval(update, 1000);
    }

    timecal()
} else {
    alert('Times Up\nThis site will continue for more 1 Day \nDo share and Win')
}