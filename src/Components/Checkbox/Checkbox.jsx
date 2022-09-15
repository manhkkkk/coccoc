import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Checkbox = () => {
  const [check, setCheck] = useState([]);
  const [value, setValue] = useState([]);
  useEffect(() => {
    const api = async () =>{
      const {data} = await axios.get('http://localhost:4000/animal')
      setCheck(data)
    };
    api();
  }, [])
  const onHandledOncheck = async (event, itemId, optionIndex) =>{
    setCheck(check => check.map(item => {
      if (item.id === itemId) {
        item.options[optionIndex] = event.target.checked;
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
            {item.options.map((option, index) =>(
              <>
              <input checked={option} className="form-check-input" type="checkbox"
              onChange={(e) => onHandledOncheck(e, item.id, index)}/>
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