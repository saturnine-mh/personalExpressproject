const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://swaggernine:Football899@cluster0.a7z8gpc.mongodb.net/?retryWrites=true&w=majority";
const dbName = "personal-express-workout";

app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  db.collection('messages').find().toArray((err, result) => {
    if (err) return console.log(err)
    // console.log(result)
    // let dateData = {}
    // result.array.forEach(workout => {
    //   let exerciseData = {
    //     'name': workout.name,
    //     'msg': workout.msg,
    //     'sets': workout.sets,
    //     'Reps': workout.Reps
    //   }
    //   if(dateData.hasOwnProperty(workout.date)){
    //     dateData[workout.date].push(exerciseData)
    //   }
    //   else {
    //     dateData[workout.date] = [exerciseData]
    //   }
      
    // });
    // console.log(dateData)
    ///lines 30-35 creates new array of dates from workout object then loops through to check if that date has been inputted before
    res.render('index.ejs', {dates: result})
  })
})

app.post('/dates', (req, res) => {
  
  db.collection('messages').insertOne({date:req.body.date.trim(), 
            name: req.body.name,
            msg: req.body.msg,
            sets: req.body.sets,
            Reps: req.body.Reps,
            backgroundColor: '',
            completed: false
  },
  (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/dates', (req, res) => {
  console.log("req.body.date", req.body.date)
  console.log("eq.body.backgroundColor", req.body.backgroundColor)
  db.collection('messages').findOneAndUpdate({
    date:req.body.date, 
    
    // name: req.body.name,
    // msg: req.body.msg,
    // sets: req.body.sets,
    // Reps: req.body.Reps,

}, {
    $set: {
      completed: true,
      backgroundColor: req.body.backgroundColor,
    }
  }, (err, result) => {
    if (err) return res.send(err)
    res.redirect('/')
  })
})

app.delete('/dates', (req, res) => {
  
  db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg,sets: req.body.sets, Reps: req.body.Reps}, (err, result) => {
    console.log(req.body.name, req.body.msg, req.body.sets, req.body.Reps)
    if (err) return res.send(500, err)
    console.log('deleted')
    res.send('Message deleted!')
  })
})
