import {useState} from 'react'
import './List.css'
import {fr} from 'date-fns/locale'
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
// const bookedDays = [new Date(2023, 6, 10), new Date(2023, 6, 11)];
// const bookedStyle = { border: '2px solid currentColor' };

const List = () =>{
  const [selected, setSelected] = useState();

  let footer = <p>Please pick a day.</p>;
  if (selected) {
    footer = <p>You picked {format(selected, 'PP')}.</p>;
  }
  return (
    <div className="container">
        <div className="listContainer">
        <div className="listWrapper">
            <div className="listSearch">
                <h1 className="lisTitel">Search</h1>
                <div className="lsItem">
                    <label>Date</label>
                    <input type="text" />
                      <DayPicker
                        mode="single"
                        selected={selected}
                        onSelect={setSelected}
                        footer={footer}
                      />
                      {console.log(selected)}
                </div>
            </div>
            <div className="listResult"></div>
        </div>
      </div>
    </div>
      
  )
}

export default List
