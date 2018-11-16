//その時間の売り上げ個数算出
function dataTimeTotal(callback,num,item) {
  var i = 0;
  var path;
  var total = [];
  var database = firebase.database();
  path = String(num+"/"+item+"/10/");//当日は"master/"が消える
  var dataRef = database.ref(path);
  dataRef.once("value").then(function(snapshot) {
    for(let i = 0;i < 9;i++){//9:00~17:00繰り返し
      if(i==0){
        var dataNum = snapshot.child("09").numChildren();
        var datas = snapshot.child("09").val();
      }else {
        var dataNum = snapshot.child(i+9).numChildren();
        var datas = snapshot.child(i+9).val();
      }
      //console.log(datas.length);
      if(datas != null){
        var getData = 0;
        if(datas["key"]!=null){
          console.log("keeeeey1 "+(i+9));
          for(let j=0;j < dataNum-1;j++){//date/time/*/count取得
            if(datas[j]!=null){
              getData += Number(datas[j].count);
            }
          }
        }else {
          for(let j=0;j < dataNum;j++){//date/time/*/count取得
            getData += Number(datas[j].count);
          }
        }
        console.log("total is "+getData);
        total.push(getData);
      }else {
        total.push(0);
      }
    }
    callback(total,item);
  });
}
//表示
function canvas(total,item) {
  //「時間別データ」
  var data = [
  { label: "09:00", y: total[0] },
  { label: "10:00", y: total[1] },
  { label: "11:00", y: total[2] },
  { label: "12:00", y: total[3] },
  { label: "13:00", y: total[4] },
  { label: "14:00", y: total[5] },
  { label: "15:00", y: total[6] },
  { label: "16:00", y: total[7] },
  { label: "17:00", y: total[8] }
  ];
  var stage = document.getElementById('stage'+item);
  var chart = new CanvasJS.Chart(stage, {
    title: {
      text: "売り上げ"  //グラフタイトル
    },
    theme: "theme4",  //テーマ設定
    data: [{
      type: 'column',  //グラフの種類
      dataPoints: data  //表示するデータ
    }]
  });
  chart.render();
}
