var input = document.getElementById('input');
var button = document.getElementById('search');
var div = document.getElementById('search-menu');
var response = {};
input.addEventListener('keyup', function() {
  var name = input.value;
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      response = JSON.parse(xhr.responseText);
      console.log('response: ', response);
      div.innerHTML = '';
      for (var i in response) {
        let anchor = document.createElement('a');
        anchor.innerHTML = response[i].name + ", " + response[i].atomic_mass;
        anchor.setAttribute('href',response[i].source);
        anchor.setAttribute('target','_blank');
        // anchor.setAttribute('ac')
        div.appendChild(anchor);
      }
      div.style.visibility = 'visible';
      if(input.value=='') {
        div.innerHTML = '';
        div.style.visibility = 'hidden';
      }
      console.log(input.value=='');
    }
  }
  xhr.open("POST", "/chemics");
  xhr.send(name);
});
