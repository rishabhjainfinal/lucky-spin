async function get_database_id() {
    let response = await fetch('/database')
    let resinjson = await response.json()
    let id = resinjson.id
    console.log("id get by data base ", id)
    Cookies.set('id', id, { expires: 30, path: '' })
}
if (Cookies.get('visited') == undefined) {
    get_database_id()
    console.log('new-visiter')
    Cookies.set('visited', true, { expires: 30, path: '' })
    Cookies.set('chances', 2, { expires: 30, path: '' })
    Cookies.set('share', 0, { expires: 30, path: '' })
    Cookies.set('win', 0, { expires: 30, path: '' })
    fetch('https://ipapi.co/json/')
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            postData({ id: Cookies.get('id'), position: data, device: userPlateform() });
        });
    setTimeout(discription, 5000);


} else {
    console.log('visited')
}


// discripption code
function discription() {
    let dis = document.getElementById('dis')
    dis.style.visibility = 'visible'
    setTimeout(() => {
        dis.getElementsByClassName('discription')[0].style.display = 'block'
        setTimeout(() => {
            dis.getElementsByClassName('discription')[0].style.display = 'none'
        }, 4000)
    }, 100)
    setTimeout(() => {
        dis.getElementsByClassName('discription')[1].style.display = 'block'
        setTimeout(() => {
            dis.getElementsByClassName('discription')[1].style.display = 'none'
        }, 4000)
    }, 4200)
    setTimeout(() => {
        dis.getElementsByClassName('discription')[2].style.display = 'block'
        setTimeout(() => {
            dis.getElementsByClassName('discription')[2].style.display = 'none'
        }, 4000)
    }, 8300)
    setTimeout(() => {
        dis.getElementsByClassName('discription')[3].style.display = 'block'
        setTimeout(() => {
            dis.getElementsByClassName('discription')[3].style.display = 'none'
        }, 4000)
    }, 12400)
    setTimeout(() => {
        dis.getElementsByClassName('discription')[4].style.display = 'flex'
    }, 16500)
};


// winners scripts
async function winners() {
    const response = await fetch('/static/others/winners.json')
    const data = await response.json()
    const he = new Array() //34
    const she = new Array() //24
    const lastname = new Array() //50
    data.male.forEach(element => {
        he.push(element)
    });
    data.female.forEach(element => {
        she.push(element)
    });
    data.surnames.forEach(element => {
        lastname.push(element)
    });

    const result = new Array()

    let winner = document.querySelectorAll('.winners#listwinner .person span')
    for (let i = 0; i < 9; i++) {
        const winnerName = (Math.floor(Math.random() * 2) == 0) ? he[Math.floor(Math.random() * 34)] : she[Math.floor(Math.random() * 24)]
        const winnerLastname = ' ' + lastname[Math.floor(Math.random() * 50)];
        const value = winnerName + winnerLastname
        winner[i].innerHTML = value
            // console.log(winsnerName + winnerLastname) //renderAsPreDefineWinners
    }
    // console.log(he) // console.log(she) // console.log(she[5]) // console.log(lastname)
}

//preDefineWinner
winners().catch(error => { console.error(error) })


//appendingWithTimeWinners
fetch('/static/others/winners.json')
    .then(res => res.json())
    .then(data => {
        const he = new Array() //34
        const she = new Array() //24
        const lastname = new Array() //50
        data.male.forEach(element => {
            he.push(element)
        });
        data.female.forEach(element => {
            she.push(element)
        });
        data.surnames.forEach(element => {
            lastname.push(element)
        });


        function person(index) {
            const winnerName = (Math.floor(Math.random() * 2) == 0) ? he[Math.floor(Math.random() * 34)] : she[Math.floor(Math.random() * 24)]
            const winnerLastname = ' ' + lastname[Math.floor(Math.random() * 50)];
            const value = winnerName + winnerLastname
            winner[index].innerHTML = value
        }


        let winner = document.querySelectorAll('.winners#listwinner .person span')

        function update() {
            let value0 = winner[0].innerHTML
            let value1 = winner[1].innerHTML
            let value2 = winner[2].innerHTML
            let value3 = winner[3].innerHTML
            let value4 = winner[4].innerHTML
            let value5 = winner[5].innerHTML
            let value6 = winner[6].innerHTML
            let value7 = winner[7].innerHTML

            person(0)
            winner[1].innerHTML = value0
            winner[2].innerHTML = value1
            winner[3].innerHTML = value2
            winner[4].innerHTML = value3
            winner[5].innerHTML = value4
            winner[6].innerHTML = value5
            winner[7].innerHTML = value6
            winner[8].innerHTML = value7

        }

        setTimeout(() => {
            setInterval(update, 1500);
        }, 6000)

    }).catch(error => { console.error(error) });




// code to know the device info of device used by user 
function userPlateform() {
    'use strict';
    var module = {
        options: [],
        header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
        dataos: [
            { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
            { name: 'Windows', value: 'Win', version: 'NT' },
            { name: 'iPhone', value: 'iPhone', version: 'OS' },
            { name: 'iPad', value: 'iPad', version: 'OS' },
            { name: 'Kindle', value: 'Silk', version: 'Silk' },
            { name: 'Android', value: 'Android', version: 'Android' },
            { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
            { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
            { name: 'Macintosh', value: 'Mac', version: 'OS X' },
            { name: 'Linux', value: 'Linux', version: 'rv' },
            { name: 'Palm', value: 'Palm', version: 'PalmOS' }
        ],
        databrowser: [
            { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
            { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
            { name: 'Safari', value: 'Safari', version: 'Version' },
            { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
            { name: 'Opera', value: 'Opera', version: 'Opera' },
            { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
            { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
        ],
        init: function() {
            var agent = this.header.join(' '),
                os = this.matchItem(agent, this.dataos),
                browser = this.matchItem(agent, this.databrowser);

            return { os: os, browser: browser };
        },
        matchItem: function(string, data) {
            var i = 0,
                j = 0,
                html = '',
                regex,
                regexv,
                match,
                matches,
                version;

            for (i = 0; i < data.length; i += 1) {
                regex = new RegExp(data[i].value, 'i');
                match = regex.test(string);
                if (match) {
                    regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                    matches = string.match(regexv);
                    version = '';
                    if (matches) { if (matches[1]) { matches = matches[1]; } }
                    if (matches) {
                        matches = matches.split(/[._]+/);
                        for (j = 0; j < matches.length; j += 1) {
                            if (j === 0) {
                                version += matches[j] + '.';
                            } else {
                                version += matches[j];
                            }
                        }
                    } else {
                        version = '0';
                    }
                    return {
                        name: data[i].name,
                        version: parseFloat(version)
                    };
                }
            }
            return { name: 'unknown', version: 0 };
        }
    };

    var e = module.init(),
        debug = '';

    const data = {
        'osName': e.os.name,
        'browser': e.browser.name,
        'browserVersion': e.browser.version
    }

    return data

};


// funtion to post data to given url and give data 
async function postData(foo = {}) {
    const response = await fetch('/database', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(foo) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}
// provide user possition and other info with fetch