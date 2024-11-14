import React from 'react'

export const NewGrid = () => {
  return (
        <>



    <div className=' grid grid-cols-25 grid-rows-6 gap-1 w-full mt-24 text-center '>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center'></div>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center'>1º elemento avaliação</div>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center'>2º elemento avaliação</div>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center'>3º elemento avaliação</div>
        <div className='h-16 rounded-sm w-full bg-slate-300 col-span-5 flex items-center justify-center'>4º elemento avaliação</div>

            
    
        <div className='h-18 text-center  w-full bg-slate-400 col-span-1 flex items-center justify-center '></div>
        <div className='h-18 text-center w-full bg-slate-400 col-span-3 flex items-center justify-center'>Unidade Curricular</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>tipo avaliação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Elemento</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Ponderação</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Data</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Hora</div>
        <div className='h-18 text-center w-full bg-slate-400 flex items-center justify-center text-xs'>Sala</div>

        <div className=' rounded-sm w-full bg-slate-400 row-span-5 text-center flex items-center justify-center'>1º ano</div>

        <div className='grid grid-cols-1 grid-rows-5 row-span-5 col-span-3 gap-1 text-center'>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            
        </div>
        <div className='grid grid-cols-1 grid-rows-5 row-span-5 col-span-1 gap-1 text-center'>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center  '>7</div>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
            
        </div>
        {Array.from({ length: 5 * 20}).map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 flex items-center justify-center w-16 h-16"
            >
              {index + 1}
            </div>
          ))}  






<div className=' rounded-sm w-full bg-slate-400 row-span-5 text-center flex items-center justify-center'>2º ano</div>

<div className='grid grid-cols-1 grid-rows-5 row-span-5 col-span-3 gap-1 text-center bg-slate-100'>
    <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
    <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
    <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
    <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
    <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
    
</div>
<div className='grid grid-cols-1 grid-rows-5 row-span-5 col-span-1 gap-1 text-center bg-slate-100'>
    <div className='col-span-4  border border-gray-300 flex items-center justify-center  '>7</div>
    <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
    <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
    <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
    <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
    
</div>
{Array.from({ length: 5 * 20}).map((_, index) => (
    <div
      key={index}
      className="bg-slate-100 border border-gray-300 flex items-center justify-center w-16 h-16"
    >
      {index + 1}
    </div>
  ))} 




  <div className=' rounded-sm w-full bg-slate-400 row-span-5 text-center flex items-center justify-center'>3º ano</div>

        <div className='grid grid-cols-1 grid-rows-5 row-span-5 col-span-3 gap-1 text-center'>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            <div className='col-span-4 border border-gray-300 flex items-center justify-center'>6</div>
            
        </div>
        <div className='grid grid-cols-1 grid-rows-5 row-span-5 col-span-1 gap-1 text-center'>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center  '>7</div>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
            <div className='col-span-4  border border-gray-300 flex items-center justify-center '>7</div>
            
        </div>
        {Array.from({ length: 5 * 20}).map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 flex items-center justify-center w-16 h-16"
            >
              {index + 1}
            </div>
          ))}   
        
        
          
       


    </div>
    
    
        {/* {Array.from({ length: 5 * 22 }).map((_, index) => (
            <div
              key={index}
              className="bg-white border border-gray-300 flex items-center justify-center w-16 h-16"
            >
              {index + 1}
            </div>
          ))}*/}
        
        </>

    
  )
}
