import data from './data.json'

  export function getUserData()  {
    return new Promise((resolve) => resolve(data))    
   }