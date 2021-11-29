import React, { useState, useEffect } from 'react'
import List from '../List/List'
import './Home.css'
import useLocalStorage from '../../hooks/useLocalStorage'

const Home = () => {

    const [meal, setMeal] = useState('');
    const [calorie, setCalorie] = useState('')
    const [data, setData] = useLocalStorage("data", [])
    const [edit, setEdit] = useState(false)
    const [editId, setEditId] = useState(null)
    const [option, setOption] = useState('')

    //onsubmit
    const submit = (e) => {
        e.preventDefault();
        if (meal === '' || calorie === '') {
            alert("Please enter meal and calorie")
        } else if (meal && edit) {//if edited
            setData(
                data.map((item) => {
                    if (item.id === editId) {
                        console.log(item)
                        return { ...item, "food": meal, "cal": calorie }
                    }
                    return item
                })
            )
            setMeal('');
            setCalorie('');
            setEditId(null);
            setEdit(false);
        } else {//on load
            setData((data) => [...data, { "id": new Date().getTime().toString(), "food": meal, "cal": calorie }])
            console.log(data)
            setMeal('');
            setCalorie('');
        }

    }

    //edit button click
    const editItem = (id) => {
        console.log(id)
        let findItem = data.find((item) => item.id === id)
        console.log(findItem, "find")
        setMeal(findItem.food)
        setCalorie(findItem.cal)
        setEdit(true)
        setEditId(id)
    }

    //delete button click
    const deleteItem = (id) => {
        setData(data.filter((item) => item.id !== id))
        console.log(id)
    }

    //for sort
    useEffect(() => {
        const mealList = [...data];
        console.log(option)
        if (option === "Ascending") {
            const ascending = mealList.sort((a, b) => a.cal - b.cal)
            setData(ascending)
        } else if (option === "Descending") {
            const descending = mealList.sort((a, b) => b.cal - a.cal)
            setData(descending)
        }
        // eslint-disable-next-line
    }, [option])

    //for clear all button
    const clearList = () => {
        setData([]);
    }

    //jsx
    return (
        <div className="home-container">
            <form className="input-container" onSubmit={submit}>
                <div className="meal-container">
                    <label htmlFor="meal" style={{ fontWeight: "bold" }}>Enter Meal </label>
                    <input type="text" className="meal-input" name="meal" value={meal} placeholder="e.g: Carrot" onChange={(e) => setMeal(e.target.value)} />
                </div>
                <div className="calorie-container">
                    <label htmlFor="calorie" style={{ fontWeight: "bold" }}>Enter Calorie </label>
                    <input type="number" min="0" className="calorie-input" value={calorie} placeholder="e.g: 100" name="calorie" onChange={(e) => setCalorie(e.target.value)} />
                </div>
                <div className="button">
                    <button className="meal-btn" type="submit">{edit ? 'Edit Meal' : 'Add Meal'}</button>
                </div>
            </form>
            {data.length > 0 ?
                <div>
                    <List props={data} edit={editItem} remove={deleteItem} setOption={setOption} option={option} />
                    <div className="btn-center"><button className='clear-btn' onClick={clearList}>clear items</button></div>
                </div> : <h1 style={{ textAlign: "center" }}>No items to Show</h1>}
        </div>
    )
}

export default Home