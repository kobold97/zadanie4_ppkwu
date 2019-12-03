function get(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
		

        req.open('GET', url);
		req.setRequestHeader('Access-Control-Allow-Origin', '*');
		req.setRequestHeader("Content-type","application/x-www-form-urlencoded");

        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response);
            } else {
				console.log(req);
                reject(Error(req.statusText));
            }
        };

        req.onerror = function() {
            reject(Error("Network Error"));
        };
        req.send();
    });
}

var url = "https://adm.edu.p.lodz.pl/user/users.php?search=";

var search_button = document.querySelectorAll('.search');
search_button[0].addEventListener("click", getEmployees, false);

function getEmployees() {
    name = document.querySelectorAll('.name')[0].value;
    surname = document.querySelectorAll('.surname')[0].value;

    request = url + name + "+" + surname;
  	console.log("url ", request);

    get(request).then(function(response) {
		console.log("hejka: " + response);
        var list = document.createElement('ul');
        for (var i = 0; i < response.length; i++) {
            var item = document.createElement('li');
            item.appendChild(document.createTextNode(response[i].text));
            list.appendChild(item);
        }
        document.querySelector('body').appendChild(list);
      
    }, function(error) {
        console.error("Failed!", error);
    })
}
