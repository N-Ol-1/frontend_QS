/*
const numbers=[1,2,3,4,5];
const triple=numbers.map((number)=>{return number*3});
console.log(triple);

const num=[,6,7,8,9];
const list=num.map((numbers)=>
<li>{numbers}</li>);
*/

import { useEffect, useState } from "react";

const [numb,setnumb]=useState(1);


useEffect(()=>{fetch("http://api")
    .then(res=>res.json())
    .then(data=>setnumb(data))
},[]);