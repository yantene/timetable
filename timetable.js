function getResource(){
  var httpObj = new XMLHttpRequest();
  httpObj.open("GET", "./resource.json", false);
  httpObj.send(null);

  return JSON.parse(httpObj.responseText);
}

function hsvtorgb(h, s, v){
  var c = v * s;
  var x = c * (1 - Math.abs((h * 6) % 2 - 1));
  var r = g = b = v - c;

  if(h * 6 < 1){
    r += c; g += x;
  }else if(h * 6 < 2){
    r += x; g += c;
  }else if(h * 6 < 3){
    g += c; b += x;
  }else if(h * 6 < 4){
    g += x; b += c;
  }else if(h * 6 < 5){
    r += x; b += c;
  }else{
    r += c; b += x;
  }

  return ['#', ('0' + Math.floor(r * 0xff).toString(16)).slice(-2),
               ('0' + Math.floor(g * 0xff).toString(16)).slice(-2),
               ('0' + Math.floor(b * 0xff).toString(16)).slice(-2)].join('');
}

var data = getResource();

var categories = {};
var categoriesSize = 0;

var table = document.getElementById('timetable');
for(var i = 0; i < data.length; ++i){
  if(categories[data[i].category] == null){
    categories[data[i].category] = "category" + ++categoriesSize;
  }
  for(var j = 0; j < data[i].period.length; ++j){
    var lecture = table.rows[data[i].period[j][1]].cells[data[i].period[j][0]].childNodes[1];
    var subject = lecture.childNodes[1];
    var teacher = lecture.childNodes[3];
    var room = lecture.childNodes[5];
    subject.textContent = data[i].subject;
    teacher.textContent = data[i].teacher;
    room.textContent = data[i].room;
    lecture.className += " " + categories[data[i].category];
  }
}
var style = document.getElementsByTagName('head')[0].appendChild(document.createElement('style'));
style.type = 'text/css';
for(var i = 0; i < categoriesSize; ++i){
  var color = hsvtorgb(i / categoriesSize, 0.2, 1.0);
  console.log(color);
  settings = 'div.category' + (i + 1) + '{background-color: ' + color + '}';
  style.sheet.insertRule(settings, style.sheet.cssRules.length);
}
