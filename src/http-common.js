import React, { useEffect, useState } from 'react';
import axios from "axios";
import { data } from 'autoprefixer';

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});

const[data,setdata]=useState(null);

useEffect(()=>{console.log('use efect ran'),[]})

useEffect(()=>{
    fetch("htttp://localhost:8080/api")
    .then(res=>{return res.json()})
    .then(data=>setdata(data))},[])