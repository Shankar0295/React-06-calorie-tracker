import React from 'react'
// import Select from 'react-select'
import { FaEdit, FaTrash } from "react-icons/fa";
import './List.css';

const List = ({ props, edit, remove, setOption, option }) => {

    console.log(props, "props")

    //for total calorie count
    const total = props.map((meal) => parseInt(meal.cal))
        .reduce((acc, value) => {
            let totalVal = acc + value
            return totalVal
        }, 0)
    console.log(total)

    //jsx
    return (
        <div className="list-container">
            <div className="list-sort">
                {/* <label htmlFor="select" >Sort By</label> */}
                <select name="select" defaultValue={option} onChange={(e) => setOption(e.target.value)}>
                    <option value="" disabled hidden>Sort By</option>
                    <option value="Ascending">Ascending</option>
                    <option value="Descending">Descending</option>
                </select>
            </div>
            {props.map((item) => {
                return (
                    <div key={item.id} className="list-item-container">
                        <div>
                            <h4>{item.food}</h4>
                        </div>
                        <div>
                            <h4>{item.cal} Kcal</h4>
                        </div>
                        <div className="icon-container">
                            <FaEdit className="edit" onClick={() => edit(item.id)} />
                            <FaTrash className="delete" onClick={() => remove(item.id)} />
                        </div>
                    </div>
                )
            })}
            <div className="total-container">
                <div className="total-calories">
                    <h2>TOTAL</h2>
                </div>
                <div className="total-calories">
                    <h2>{total} Kcal</h2>
                </div>
            </div>
        </div>
    )
}

export default List