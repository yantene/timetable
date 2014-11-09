data = [
{
  "period": [[1, 2]],
  "category": "選択必修",
  "subject": "オペレーティングシステム",
  "teacher": "大村",
  "room": "A2-101"
},
{
  "period": [[1, 4]],
  "category": "選択",
  "subject": "ソフトウェア設計論",
  "teacher": "河合",
  "room": "A-209"
},
{
  "period": [[2, 1]],
  "category": "選択",
  "subject": "多変量解析",
  "teacher": "岡田",
  "room": "IMC MM"
},
{
  "period": [[2, 2]],
  "category": "英語",
  "subject": "英語VIA",
  "teacher": "ブルート",
  "room": "A-311"
},
{
  "period": [[2, 3]],
  "category": "選択",
  "subject": "情報理論",
  "teacher": "中川",
  "room": "A2-101"
},
{
  "period": [[2, 4], [2, 5], [2, 6], [5, 6]],
  "category": "必修",
  "subject": "情報・知能工学実験",
  "teacher": "各教員",
  "room": "C1-201"
},
{
  "period": [[3, 2]],
  "category": "選択",
  "subject": "化学II",
  "teacher": "吉田",
  "room": "A2-301"
},
{
  "period": [[3, 3]],
  "category": "選択必修",
  "subject": "コンパイラ",
  "teacher": "秋葉",
  "room": "A2-101"
},
{
  "period": [[3, 4]],
  "category": "選択",
  "subject": "機械学習・パターン認識論",
  "teacher": "金澤",
  "room": "A-312"
},
{
  "period": [[5, 2]],
  "category": "英語",
  "subject": "英語VIB",
  "teacher": "レヴィン",
  "room": "A-312"
},
{
  "period": [[5, 3]],
  "category": "選択",
  "subject": "データベース",
  "teacher": "加藤",
  "room": "A2-101"
},
{
  "period": [[5, 4], [5, 5]],
  "category": "必修",
  "subject": "ソフトウェア演習III/IV",
  "teacher": "栗山/井佐原",
  "room": "F-101"
}
]

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
