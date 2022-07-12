const mongoose = require('mongoose');
const express = require('express');

mongoose.connect("mongodb+srv://Pratik:Pratik123@atlascluster.2ce95.mongodb.net/User?retryWrites=true&w=majority").then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log(`${err}`);
})

