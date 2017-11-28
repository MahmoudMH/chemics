var input = document.getElementById('input');
console.log('ibefef',input);
input.addEventListener('input', function() {
  var name = input.value;
  console.log('name',name);
  var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
  if(xhr.readyState == 4 && xhr.status == 200) {
    var response = xhr.responseText;
  }
}
    xhr.open("POST", "/alchemy");
    xhr.send(name);
});
