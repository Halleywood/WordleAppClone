const PORT =process.env.PORT || 3000
const express = require("express")
const axios = require("axios").default
const app =express()
const cors = require('cors')
require('dotenv').config()
app.use(cors())

app.get('/word', (req, res)=>{
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
    params: {count: '5', wordLength: '5'},
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.json(response.data[0])
  }).catch(function (error) {
    console.error(error);
  });
})

app.get('/check', (req, res)=>{

const word =req.query.word 
const options = {
  method: 'GET',
  url: 'https://twinword-word-graph-dictionary.p.rapidapi.com/association/',
  params: {entry: word},
  headers: {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY,
    'X-RapidAPI-Host': 'twinword-word-graph-dictionary.p.rapidapi.com'
  }
};

axios.request(options).then(function (response) {
	console.log(response.data);
  res.json(response.data.result_msg)
}).catch(function (error) {
	console.error(error);
});
})
app.use(express.static('.'));
app.listen(PORT, ()=> console.log('SERVER RUNNING ON PORT' + PORT))


