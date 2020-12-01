const express = require('express')
const app = express()

app.use(express.json())

app.listen(3000)

function json_response(operation, array){
  if(array===null || array===undefined){
    array = [];
  }
  return JSON.stringify({ 
    operation: operation, 
    result: array
  });
}

const reducer = (accumulator, currentValue) => accumulator + currentValue;

app.get('/ncb_wdfs', (req, res) => {
  try{
    const body = req.body;
    const operation = body.operation;
    const values = body.values;
    const factor = body.factor;
    if(operation==='reduce'){
      console.log("reduce operation");
      values = [values.reduce(reducer)] - factor;
    }
    else if(operation==='map-array-add'){
      console.log("map-array-add operation");
      for(var i=0;i<values.length;i++){
        values[i] = values[i] + factor;
      }
    }
    else if(operation==='map-array-mul'){
      console.log("map-array-mul operation");
      for(var i=0;i<values.length;i++){
        values[i] = values[i]*factor;
      }
    }
    else{
      throw "Erro";
    }
    console.log("saída");
    console.log(values);
    res.writeHead(200);
    res.end(json_response(operation, values));
  }
  catch(e){
    res.writeHead(400);
    res.end(json_response("INVALID", []));
  }
})