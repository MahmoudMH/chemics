// Take the data and filter it wheather if the name key contains input text
function dropMenu(inputText, data) {
  const input = inputText;
  const elements = JSON.parse(JSON.stringify(data)).elements;
  var ret = [];
  for(var i=0; i<elements.length; i++) {
    if(elements[i].name.toLowerCase().indexOf(input.toLowerCase()) !== -1) {
      ret.push(elements[i]);
    }
  }
  return ret;
}
