function history(num,item) {
  console.log("print start"+item);
  var c=0;
  var database = firebase.database();
  var ref = new Firebase("https://kuji-1dd40.firebaseio.com/"+num+"/"+item+"/10/");//master消す
  for(let i=0;i<9;i++){
    ref.on("value", function(snapshot){
      if(i==0){
        var dataNum = snapshot.child("09").numChildren();
        var datas = snapshot.child("09").val();
      }else {
        var dataNum = snapshot.child(i+9).numChildren();
        var datas = snapshot.child(i+9).val();
      }
      console.log(datas);
      //console.log(snapshot.child(i+9).child("key").val());
      if(datas != null){
        if(datas["key"]!=null){
          console.log("keeeey2 "+(i+9));
          console.log(dataNum-1);
          for(let j = 0;j < dataNum-1;j++){
            if(datas[j]!=null){
              var time = document.createElement('p');
              time.id = ("time"+item+"_"+String(c));
              document.getElementById('wrapper'+item).appendChild(time);
              var count = document.createElement('p');
              count.id = ("count"+item+"_"+String(c));
              document.getElementById('wrapper'+item).appendChild(count);
              document.getElementById("time"+item+"_"+ String(c)).innerHTML = datas[j].time;
              document.getElementById("count"+item+"_"+ String(c)).innerHTML = datas[j].count;
              c++;
            }
          }
        }else {
          for(let j = 0;j < dataNum;j++){
            var time = document.createElement('p');
            time.id = ("time"+String(item)+"_"+String(c));
            document.getElementById('wrapper'+item).appendChild(time);
            var count = document.createElement('p');
            count.id = "count"+String(item)+"_"+String(c);
            document.getElementById('wrapper'+item).appendChild(count);
            document.getElementById("time"+item+"_" + String(c)).innerHTML = datas[j].time;
            document.getElementById("count"+item+"_" + String(c)).innerHTML = datas[j].count;
            c++;
          }
        }
      }

    });
  }
  console.log("print end");
}
