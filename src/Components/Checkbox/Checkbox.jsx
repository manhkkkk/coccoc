import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Checkbox = () => {
  const [check, setCheck] = useState([]);
  useEffect(() => {
    const api = async () =>{
      const {data} = await axios.get('http://localhost:4000/animal')
      setCheck(data)
    };
    api();
  }, [])
  const onHandledOncheck = async (event, item, optionIndex) =>{
    const {id} = item;
    setCheck(check => check.map(item => {
      if (item.id === id) {
        item.options[optionIndex] = event.target.checked;
        const currentCheck = item.options[optionIndex]
        const res = axios.put(`http://localhost:4000/animal/${id}`, 
           {
            name: item.name,
            options: [...item.options] 
           }
        )
      }
      return item;
    }));
  }
  return (
    <form>
      <div>
        {check?.map((item, index) => (
          <div key={index}>
            <div>{item.name}</div>
            <div style={{display: 'flex'}}>option {index + 1}</div>
            {item.options.map((option, index) =>(
              <>
              <input checked={option} className="form-check-input" type="checkbox"
              onChange={(e) => onHandledOncheck(e, item, index)}/>
              </>
            ))}
          </div>
        ))}
      </div>
      <div>
        {JSON.stringify(check, null, 2)}
      </div>
    </form>
  )
}

export default Checkbox;