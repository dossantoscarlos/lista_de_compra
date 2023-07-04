'use strict';
'use client';

import React, { ReactElement, useEffect, useState } from 'react';

interface DataItem {
  item: string;
  status: boolean
}

const Home = (): ReactElement => {
    
  const [item, setItem] = useState<DataItem[]>([]);

  function database() { 
    let data = localStorage.getItem('lista_de_compra');
    return JSON.parse((data === null) ? '' : data);
  }


  useEffect(() => {
    database();
    setItem(database());
  },[setItem] );


  const addItem  = (data:DataItem ) => {

    var arrayData:Array<Object> = []; 
    
    if ( typeof data.item === 'string') {
      
      if ( database() === null ) {
        arrayData.push(data)
        localStorage.setItem('lista_de_compra', JSON.stringify(arrayData));
      } else {  
        arrayData = database();
        arrayData.push(data)
        localStorage.setItem('lista_de_compra', JSON.stringify(arrayData));
      }
      setItem(database());

    }

  }

  const adicionarItem = (event:any): void => {
    event.preventDefault();    
    const data : DataItem =  {
      item: event.target.item.value.trim(),
      status: false,
    };
    addItem(data);
    event.target.item.value = "";    
  } 

  const updateStatus  = (event:any) =>  {
    const checked = event.target.checked;
    const nome = event.target.name;
    let updateStatusInArray = item;
    
    if(updateStatusInArray[nome].status === false) {
      updateStatusInArray[nome].status = true;
    } else if(updateStatusInArray[nome].status === true){ 
      updateStatusInArray[nome].status = false;
    }
    localStorage.setItem('lista_de_compra',JSON.stringify(updateStatusInArray));
    setItem(database());
    console.log(updateStatusInArray[nome].status, nome)
  }

  const removeItem = (event:any) => {
    const removeItem = item;
    removeItem.splice(event.target.name, 1);
    localStorage.setItem('lista_de_compra',JSON.stringify(removeItem));
    setItem(database());
    console.log(item)
  }

  return (
    <main className='flex justify-center w-full gap-4 p-4'>
      <div className='flex flex-col'>
        <form  onSubmit={adicionarItem}>
            <div className='my-2'>
              <label className='hidden' htmlFor='item'>Item</label>
              <input type='text' className="rounded" id='item' required min='3' name='item' title='adicionar item' placeholder='item' />
          </div>
          <div>
              <button 
                type='submit' 
                className='px-4 py-2 text-white bg-green-900'  >
                Adicionar item a lista
              </button>
            </div>
          </form>

          <table className='my-8'>
        
      { item && item.map((data,index) => 
        <tr key={index} className='my-2'>  
          <td>
            {data.status===false && 
              <input type='checkbox' name={index.toString()} id={index.toString()}
              onClick={updateStatus} />
             || <input type='checkbox' name={index.toString()} id={index.toString()} onClick={updateStatus}  checked/>
            }
           
          </td>
          <td>
            {index+1}: {data.item}
          </td> 
          <td>
            <button type="button" name={index.toString()}
              className='px-4 py-1 text-sm text-white bg-red-900 rounded' onClick={removeItem}>remove</button>
          </td>
        </tr>
      )}
    </table>
       
      </div>
    </main>
  );
}

export default Home; 

