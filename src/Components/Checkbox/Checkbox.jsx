import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Checkbox = () => {
  const [check, setCheck] = useState([]);
  useEffect(() => {
    const api = async () =>{
      const {data} = await axios.get('https://api-coccoc.herokuapp.com/animal')
      setCheck(data)
    };
    api();
  }, [])
  const onHandledOncheck = async (event, item, optionIndex) =>{
    const {id} = item;
    setCheck(check => check.map(item => {
      if (item.id === id) {
        item.options[optionIndex] = event.target.checked;
        axios.put(`https://api-coccoc.herokuapp.com/animal/${id}`, 
           {
            name: item.name,
            options: [...item.options] 
           }
        )
				toast('🦄 Wow, tốt lắm!', {
					position: "top-center",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					});
      }
      return item;
    }));
  }
  return (
    <div className="sticky-table">
      <table>
        <thead>
          <tr>
            <div className="list">List</div>
            {check.map((item) => (
              	<th>{item.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
          <td className="often">{check[0]?.options?.map((item, index ) => (
            <div key={index} className="oftenChildren">Option {index + 1}</div>
            ))}
          </td>
            {check.map((item, index) => (
              <>
                <td>
                  {item.options.map((option, index) => (
                    <>
                    <div className={`option ${option ? 'highlight' : null}`} >
                    <input checked={option}  type="checkbox"
                      onChange={(e) => onHandledOncheck(e, item, index)}/>
                    </div>
                    </>
                  ))}
                </td>
              </>
						))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Checkbox;