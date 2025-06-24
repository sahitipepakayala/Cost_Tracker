import React, { useEffect, useState } from 'react'
import { removeUser } from '../Store/UserSlice';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdDelete} from "react-icons/md";
import Swal from 'sweetalert2';

function Dashboard() {
const dispatch=useDispatch();
const user=useSelector((state)=>state.user);
const navigate=useNavigate();
const [products,setProducts]=useState([]);
const [item,setItem]=useState("");
const [price,setPrice]=useState(0);
const [description,setDescription]=useState("");
const [cost,setCost]=useState(0);
const [extra,setExtras]=useState([]);
const [total,setTotal]=useState(0);
const backendUrl = import.meta.env.VITE_BACKEND_URL;
  

const handleAddItem=async(item,price)=>{
    try{
        await axios.post(`https://cost-tracker-vmi7.onrender.com/product/newProduct`,{item,price},{withCredentials:true});
        fetchProducts();
        setItem("");
        setPrice(0);
        Swal.fire({
            position: "bottom",
            icon: "success",
            title: "Item Added Succesfully!",
            showConfirmButton: false,
            timer: 1000
          });

    }
    catch(error){
        console.log(error);
    }
}

const handleAddDes=async(description,cost)=>{
    try{
        await axios.post(`https://cost-tracker-vmi7.onrender.com/extra/newExtra`,{description,cost},{withCredentials:true});
        fetchExtras();
        setDescription("");
        setCost(0)
        Swal.fire({
            position: "bottom",
            icon: "success",
            title: "Other Cost Added Succesfully!",
            showConfirmButton: false,
            timer: 1000
          });

    }
    catch(error){
        console.log(error);
    }
}
const handleItem=async (Id)=>{
    try{
       await axios.delete(`https://cost-tracker-vmi7.onrender.com/product/delete/${Id}`,{withCredentials:true});
       fetchProducts();
       Swal.fire({
        position: "bottom",
        icon: "success",
        title: "Item Deleted Added Succesfully!",
        showConfirmButton: false,
        timer: 1000
      });
    }
    catch(error){
        console.log(error);
    }
}

const handleExtra=async(Id)=>{
    try{
        await axios.delete(`https://cost-tracker-vmi7.onrender.com/extra/delete/${Id}`,{withCredentials:true});
        fetchExtras();
        Swal.fire({
            position: "bottom",
            icon: "success",
            title: "Other cost deleted succesfully!",
            showConfirmButton: false,
            timer: 1000
          });
       
    }
    catch(error)
    {
        console.log(error);
    }
}

    const handleSignOut=async(e)=>{
        e.preventDefault();
        try{
            await axios.get(`https://cost-tracker-vmi7.onrender.com/user/logout`)
            dispatch(removeUser())
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Logged Out Succesfully!",
                showConfirmButton: false,
                timer: 1000
              });
    navigate("/login");}

        
        catch(error){
            console.log(error);
        }
    }
  
    async function fetchProducts() {
        try{
            const prod=await axios.get(`https://cost-tracker-vmi7.onrender.com/product/getProducts`,{withCredentials:true});
            setProducts(prod.data);
        }
        catch(error){
            console.log(error)
        }
        
    }
    async function fetchExtras() {
        try{
            const prod=await axios.get(`https://cost-tracker-vmi7.onrender.com/extra/getExtras`,{withCredentials:true});
            setExtras(prod.data);
        }
        catch(error){
            console.log(error)
        }
        
    }

    async function itemLH(){
        try{
            const items=await axios.get(`https://cost-tracker-vmi7.onrender.com/product/low_to_high`,{withCredentials:true});
            setProducts(items.data.products);
        }
        catch(error){
            console.log(error);
        }
    }
    async function itemHL(){
        try{
            const items=await axios.get(`https://cost-tracker-vmi7.onrender.com/product/high_to_low` ,{withCredentials:true});
            setProducts(items.data.products);
           
        }
        catch(error){
            console.log(error);
        }
    }


    async function descLH(){
        try{
            const items=await axios.get(`https://cost-tracker-vmi7.onrender.com/extra/low_to_high`,{withCredentials:true});
            setExtras(items.data.products);
         
        }
        catch(error){
            console.log(error);
        }
    }
    async function descHL(){
        try{
            const items=await axios.get(`https://cost-tracker-vmi7.onrender.com/extra/high_to_low`,{withCredentials:true});
            setExtras(items.data.products);
        }
        catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        
        if(!user)
            navigate("/login");
    },[])
    useEffect(()=>{
       
        fetchProducts();
        fetchExtras();
    },[]);


    useEffect(() => {
        const itemsTotal = products.reduce((sum, item) => sum + Number(item.price), 0);
        const extrasTotal = extra.reduce((sum, item) => sum + Number(item.cost), 0);
        setTotal(itemsTotal + extrasTotal);
      }, [products, extra]);
  return (
    <div className='mx-20 my-10'>
      <div className='flex justify-between text-xl font-bold '>
        <div className='flex items-center'>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcp9bXp8xHwv1pts8tUq9BqVtcsQaEXz8alQ&s"
            height="50"
            width="50"
            className="rounded"
          />
          <h1 className='mx-2 text-2xl font-bold'>Cost Tracker</h1>
        </div>
        <button className="bg-red-600 text-white px-6 py-1 rounded-lg shadow-md hover:bg-red-500 transition duration-300 font-semibold" onClick={handleSignOut}>
          Logout
        </button>
      </div>
      <div className="text-3xl font-bold flex justify-center text-gray-800">Project Cost Tracker</div>
      <div className='border-gray-200 border-2 my-10 shadow-lg shadow-gray-500/50'>
        <div className='border-gray-200 border-2 mt-10 mx-5 mb-5 p-5 text-lg font-medium'>Total Project Cost: ₹ {total}</div>
      </div>
<div className="flex flex-col lg:flex-row gap-7">

  {/* Add Item Section */}
  <div className="border-2 border-gray-200 shadow-lg shadow-gray-500/50 rounded-lg p-6 bg-white w-full lg:w-1/2">
    <h1 className="text-xl font-semibold text-gray-800 mb-4">Add Item</h1>

    <div className="space-y-2 border-2 border-gray-200 p-5">
      <div>
        <label className="block  text-gray-700 text-lg font-medium">Item Name</label>
        <input
          type="text" value={item}
          placeholder="Enter an item e.g. Chair"
          className="w-full mt-1 p-2 border placeholder-gray-400 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e)=>setItem(e.target.value)}
        />
      </div>

      <div className='mt-5'>
        <label className="block text-gray-700 text-lg font-medium">Price</label>
        <input
          type="number"
          value={price}
          placeholder="Enter cost e.g. 20"
          className="w-full mt-1 p-2 border border-gray-300  placeholder-gray-400 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" min={0}
          onChange={(e)=>setPrice(e.target.value)}
        />
      </div>
      <button className='bg-blue-700 px-20 py-2 rounded mt-5 text-white ' onClick={()=>handleAddItem(item,price)}>Add Item</button>
      
    </div>
  </div>

  {/* Add Other Cost Section */}
  <div className="border-2 border-gray-200 shadow-lg shadow-gray-500/50 rounded-lg p-6 bg-white w-full lg:w-1/2">
    <h1 className="text-xl font-semibold text-gray-800 mb-4">Add Other Cost</h1>

    <div className="space-y-4 border-2 border-gray-200 p-5">
      <div>
        <label className="block text-gray-700 text-lg font-medium">Description</label>
        <input
          type="text"
          value={description}
          placeholder="e.g. Delivery Fee"
          className="w-full  placeholder-gray-400 mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e)=>setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-gray-700 text-lg font-medium">Cost</label>
        <input
          type="number"
          placeholder="e.g. 100"
          value={cost}
          className="w-full mt-1 p-2 border placeholder-gray-700  border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none" min={0}
          onChange={(e)=>setCost(e.target.value)}
        />
      </div>
      <button className='bg-blue-700 px-20 py-2 rounded mt-3 text-white' onClick={()=>handleAddDes(description,cost)}>Add Cost</button>
    </div>
  </div>
</div>
<div className='my-15 flex gap-7 '>
<div className="border border-gray-200 shadow-lg rounded-lg shadow-gray-500/50 flex-1/2">
  <h1 className="text-xl font-semibold text-gray-800  p-5">Items List</h1>
  <select
    className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none mx-4 w-2xs font-semibold"  onChange={(e) => {
        const value = e.target.value;
        if (value === "low_to_high") {
          itemLH();
        }
    else{
        itemHL();
    }}}
    defaultValue="">
    <option value="" disabled>Sort by</option>
    <option value="low_to_high">Low to High</option>
    <option value="high_to_low">High to Low</option>
  </select>
{/* Header Row */}
<div className="grid grid-cols-3 gap-4 px-5 mt-4 font-semibold text-gray-600 mb-2">
  <h1>Name</h1>
  <h1>Cost</h1>
  <h1>Actions</h1>
</div>
<hr className='text-gray-300 my-3' />

{/* Products List */}
{products.map((prod) => (
  <React.Fragment key={prod._id}>
    <div className="grid grid-cols-3 gap-4 px-5 mb-2 text-md font-medium items-center text-gray-700">
      <h1>{prod.item.toUpperCase()}</h1>
      <h1>₹ {prod.price}</h1>
      <MdDelete className="text-xl text-red-600 cursor-pointer hover:text-red-800 ml-5" onClick={()=>handleItem(prod._id)}/>
    </div>
    <hr className='text-gray-300 my-2' />
  </React.Fragment>
))}

</div>
<div className='border border-gray-200 shadow-lg rounded-lg shadow-gray-500/50 flex-1/2'>
<h1 className="text-xl font-semibold text-gray-800 p-5">Other Costs</h1>
<select
    className="border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:ring-2 focus:ring-blue-400 outline-none mx-4 w-2xs font-semibold"
    defaultValue=""  onChange={(e) => {
        const value = e.target.value;
        if (value === "low_to_high") {
          descLH();
        }
    else{
        descHL();
    }}}>
    <option value="" disabled>Sort by</option>
    <option value="low_to_high">Low to High</option>
    <option value="high_to_low">High to Low</option>
  </select>
  <div className="grid grid-cols-3 gap-4 px-5 mt-4 font-semibold text-gray-600 mb-2">
  <h1>Name</h1>
  <h1>Cost</h1>
  <h1>Actions</h1>
</div>
<hr className='text-gray-300 my-3' />

{/* Products List */}
{extra.map((prod) => (
  <React.Fragment key={prod._id}>
    <div className="grid grid-cols-3 gap-4 px-5 mb-2 text-md font-medium items-center text-gray-700">
      <h1>{prod.description.toUpperCase()}</h1>
      <h1>₹ {prod.cost}</h1>
      <MdDelete className="text-xl text-red-600 cursor-pointer hover:text-red-800 ml-5" onClick={()=>handleExtra(prod._id)} />
    </div>
    <hr className='text-gray-300 my-2' />
  </React.Fragment>
))}
</div>
</div>


      </div>
  )
}

export default Dashboard