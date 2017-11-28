var input = getElementById('input');
input.addEventListener('keyup', function() {
  var name = input.value;
  var xhr = new XMLHttpRequest();
    xhr.SetRequestHeade("Conect-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
  if(xhr.readyState == 4 && xhr.status == 200) {
    var response = xhr.responseText;
  }
}
    xhr.open("POST", "/alchemy");
    xhr.send(name);
});
