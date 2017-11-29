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
      let anchor = document.createElement('a');
      for (var i in response) {
        anchor.innerHTML = response[i].name + ", " + response[i].atomic_mass;
        anchor.setAttribute('href', response[i].source);
        anchor.setAttribute('target', '_blank');
        div.appendChild(anchor);
      }
      anchor.addEventListener('mouseover', function() {
        let elmentObject = response[i];
        console.log('Hover');
        var div = document.createElement('div');
        div.setAttribute('class', 'comment-box');
        var p = document.createElement('p');
        p.innerHTML = 'Elment name: ' + elmentObject.name + '<br>' +
        'Appearance: ' + elmentObject.appearance + '<br>' +
        'Atomic Mass: ' + elmentObject.atomic_mass + '<br>' +
        'Boil Temprature: ' + elmentObject.boil + '<br>' +
        'Catagory: ' + elmentObject.Catagory + '<br>' +
        'Color: ' + elmentObject.color + '<br>';
        div.appendChild(p);
        document.getElementsByTagName('body')[0].appendChild(div);
      });
      anchor.addEventListener('mouseout', function() {
        document.getElementsByClassName('comment-box').innerHTML = '';
      });
      div.style.visibility = 'visible';
      if (input.value == '') {
        div.innerHTML = '';
        div.style.visibility = 'hidden';
      }

    }
  }
  xhr.open("POST", "/chemics");
  xhr.send(name);
});
