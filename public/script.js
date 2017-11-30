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

        }
        createAnchor(response);

  }
  xhr.open("POST", "/chemics");
  xhr.send(name);

});
      function createAnchor(response) {
        div.innerHTML = '';
       for (let i in response) {
        //  console.log(i,'.....');
        var anchor = document.createElement('a');
        anchor.innerHTML = response[i].name + ", " + response[i].atomic_mass;
        anchor.setAttribute('href', response[i].source);
        anchor.setAttribute('target', '_blank');
        div.appendChild(anchor);
        anchor.addEventListener('mouseover', function() {
          var div = document.createElement('div');
          div.setAttribute('id', 'comment-box');
          var p = document.createElement('p');
          p.innerHTML = 'Elment name: ' + response[i].name + '<br>' +
          'Appearance: ' + response[i].appearance + '<br>' +
          'Atomic Mass: ' + response[i].atomic_mass + '<br>' +
          'Boil Temprature: ' + response[i].boil + '<br>' +
          'Catagory: ' + response[i].Catagory + '<br>' +
          'Color: ' + response[i].color + '<br>';
          div.appendChild(p);
          document.getElementsByTagName('body')[0].appendChild(div);
        });
        anchor.addEventListener('mouseout', function() {
          const element = document.getElementById("comment-box");
          element.parentNode.removeChild(element);
        });
      }

      div.style.visibility = 'visible';
      if (input.value == '') {
        div.innerHTML = '';
        div.style.visibility = 'hidden';
      }

      }
