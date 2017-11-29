var input = document.getElementById('input');

input.addEventListener('keyup', function() {
  var name = input.value;
  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
  if(xhr.readyState == 4 && xhr.status == 200) {
    var response = JSON.stringify(xhr.responseText);
    console.log('response',response);
  }
 }
    xhr.open("POST", "/alchemy");
    xhr.send(name);
});
