import './App.css';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';
import { useState } from 'react';
import AddItem from './AddItem';
import SearchItem from './SearchItem';
import { useEffect } from 'react';
import apiRequest from './apiRequest';

function App() {
  const apiURL = "https://hostapi-a7dd.onrender.com/items";//"http://localhost:3500/items";
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('')
  const[search, setSearch] = useState('')
  const[fetchError, setFetchError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(()=>{
    const fetchItems = async () =>{
      try{
        const response = await fetch(apiURL)
        if(!response.ok) throw Error("data not found")
        const listItems = await response.json()
        console.log(listItems)
        setItems(listItems)
        setFetchError(null)
      }
      catch (err){
        setFetchError(err.message)
      } 
      finally{
        setIsLoading(false)
      }
    }
    setTimeout(()=>{ (async ()=> await fetchItems())()},2000)
  },[])

  const addItem = async (item)=>{
    const id = items.length ? items[items.length-1].id + 1 : 1;
    const addNewItem = {id, checked:false, item};
    const listItems = [...items, addNewItem]
    setItems(listItems)  

    const postOptions = {
      method:"POST",
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(addNewItem)
    }

    const result = await apiRequest(apiURL, postOptions)
    if(result) setFetchError(result)   
  }

  const handleChange = async (id)=>{//box enable disable
    const listItems = items.map((item)=>
    item.id === id ? {...item, checked :!item.checked} : item)
    setItems(listItems)  
    
    const myItem = listItems.filter((item) => item.id===id)
    const updateOptions = {
      method:"PATCH",
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify({checked : myItem[0].checked})
    }
    const reqURL = `${apiURL}/${id}`
    const result = await apiRequest(reqURL, updateOptions)
    if(result) setFetchError(result)   
  }

  const handleClick = async (id) =>{//delete
    const listItems = items.filter((item)=> item.id !== id )
    setItems(listItems)  
    
    const deleteOptions = {
      method:"DELETE",
    }
    const reqURL = `${apiURL}/${id}`
    const result = await apiRequest(reqURL, deleteOptions)
    if(result) setFetchError(result)   
  }

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!newItem) return;
    addItem(newItem)
    setNewItem('')  
  }

  return (
    <div className='App'>
      <Header/>
      <AddItem newItem = {newItem} setNewItem = {setNewItem} handleSubmit = {handleSubmit}/>
      <SearchItem search = {search} setSearch={setSearch}/>
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p>{`Error: ${fetchError}`}</p>}
        {!isLoading && !fetchError && <Content items = {items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
        handleChange = {handleChange} handleClick = {handleClick}/>}
      </main>
      <Footer length ={items.length}/>
    </div>
  );
}

//initially set array when no data in LocStrg important otherwise app crash or no code execute and display blank 

export default App;
