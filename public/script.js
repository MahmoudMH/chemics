var input = document.getElementById('input');
var response = {};
var form = document.getElementById('search');
var div = document.getElementById('search-menu');
input.addEventListener('keyup', function() {
  var name = input.value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      response = JSON.parse(xhr.responseText);
    }
    for (var i in response) {
      let anchor = document.createElement('a');
      anchor.innerHTML = response[i].name +", "+ response[i].atomic_mass;
      div.appendChild(anchor);
    }

  }
  xhr.open("POST", "/alchemy");
  xhr.send(name);





});
