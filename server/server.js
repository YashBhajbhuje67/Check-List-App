
const express = require('express');
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());
const mongoose = require("mongoose");
require('dotenv').config();

mongoose.connect(process.env.MONGO,{
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=>{
  console.log("DB Connection Successful");
}).catch((err)=>{
  console.log(err.message);
})

const schema = new mongoose.Schema({
  title: String,
  link: String,
  status: Boolean,
  note: String,
  date: Date,
},{ collection: "todo"});

const dataModel = mongoose.model("todo", schema, "todo");

app.post(`/addtodo`,(req,res)=>{
  const value = req.body;
  dataModel.create(value)
    .then(()=> {
        res.send("Added Successfully");
    })
    .catch((er)=>{
        console.log(er);
    });
})

app.get(`/getalltodo`,(req,res)=>{
  dataModel.find({})
    .then((docs)=> {
      docs.sort(function(a,b){
        if (a.date.getFullYear()==b.date.getFullYear()){
          if (a.date.getMonth()==b.date.getMonth()){
            return a.date.getDate()-b.date.getDate();
          }
          return a.date.getMonth()-b.date.getMonth();
        }
        return a.date.getFullYear() - b.date.getFullYear();
      })
      res.send(docs);
    })
    .catch((er)=>{
        console.log(er);
    });
})

app.delete(`/deletetodo`,(req,res)=>{
  
  dataModel.deleteOne({_id: req.query.id}, function(err,doc){
    if (err){
        console.log(err);
    }
    else{
        res.send('Deleted');
    }
  })
})

app.get(`/changestatus`,async (req, res)=>{
  req.query.status = (req.query.status === 'false');
  let doc = await dataModel.findOneAndUpdate({_id: req.query.id}, {status: req.query.status}, {new: true})
  console.log(doc.status)
  res.send('ok');
})

app.get(`/graphparam`,(req,res)=>{
  // for data in date: count
  if(req.query.type == 'Date'){
    dataModel.aggregate([
      { $group : {_id:"$date", count:{$sum: 1}}}
    ],
    (err, data)=>{
      if (err){ 
        console.log(err);
        res.send("err");
      }
      else{
        const sendDate = (data) => {
          //sorting according to date
          data.sort(function(a,b){
            if (a._id.getFullYear()==b._id.getFullYear()){
              if (a._id.getMonth()==b._id.getMonth()){
                return a._id.getDate()-b._id.getDate();
              }
              return a._id.getMonth()-b._id.getMonth();
            }
            return a._id.getFullYear() - b._id.getFullYear();
          })
          const x_axis=[],y_axis=[];
          data.forEach((dat)=>{
            x_axis.push(dat._id.toISOString().slice(0, 10))
            y_axis.push(dat.count)
          })
          res.send({x_axis, y_axis});
        }
        sendDate(data);
      }
    })
  }
  // for data in year-month: count
  else if (req.query.type == 'Month'){
    dataModel.aggregate([
      { $group : {_id:{ year: { $year: "$date" }, month: { $month: "$date" } }, count:{$sum: 1}}}
    ],
    (err, data)=>{
      if(err){
        console.log(err);
        res.send("err");
      }
      else{
        const sendMonth = (data)=>{
          const calendar = {1:"Jan", 2:"Feb", 3:"Mar", 4:"Apr", 5:"May", 6:"Jun", 7:"Jul", 8:"Aug", 9:"Sep", 10:"Oct", 11:"Nov", 12: "Dec"}
          //sort according to month and year
          data.sort(function(a,b){
            if (a._id.year == b._id.year){
              return a._id.month - b._id.month;
            }
            return a._id.year - b._id.year;
          })
          const x_axis=[],y_axis=[];
          data.forEach((dat)=>{
            x_axis.push(dat._id.year+'-'+calendar[dat._id.month])
            y_axis.push(dat.count)
          })
          res.send({x_axis, y_axis})
        }
        sendMonth(data);
      }

    })
  }

  // for data in year: count
  else{
    dataModel.aggregate([
      { $group : {_id:{ $year: "$date"  }, count:{$sum: 1}}}
    ],
    (err, data)=>{
      if(err){
        console.log(err);
        res.send("err");
      }
      else{
        //sort according to year
        data.sort(function(a,b){return a._id - b._id});
        const x_axis=[],y_axis=[];
        data.forEach((dat)=>{
          x_axis.push(dat._id);
          y_axis.push(dat.count);
        })
        res.send({x_axis, y_axis});
      }
    }
  )
  }
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
