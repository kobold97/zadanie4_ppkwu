function get(url) {
    return new Promise(function(resolve, reject) {
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            if (req.status == 200) {
                resolve(req.response);
            } else {
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

document.querySelectorAll('.search').addEventListener("click", getEmployees, false);

function getEmployees() {
    name = document.querySelectorAll('.name').text;
    surname = document.querySelectorAll('.surname').text;
    request = url + name + "+" + surname;
  
    get(request).then(function(response) {
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