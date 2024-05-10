import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom";
import "./Home.css"
import axios from "axios";
import { toast } from 'react-toastify';

const Home = () => {

    const [data, setData] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

    const getProducts = async () =>{
        const response = await axios.get("http://localhost:5000/products");
        if(response.status === 200){
            setData(response.data);
        }
    };


    const onDeleteProduct = async (id) =>{
        if(window.confirm("Are u sure, u want to delete the product record")){
            const response = await axios.delete(`http://localhost:5000/product/${id}`);
            if(response.status===200){
                toast.success(response.data);
                getProducts()
            }
        }
    }

    console.log("data",data)

  return (
    <div style={{marginTop:"150px"}}>
      <table className="styled-table">
        <thead>
            <tr>
                <th style={{textAlign:"center"}}>No.</th>
                <th style={{textAlign:"center"}}>Name</th>
                <th style={{textAlign:"center"}}>Description</th>
                <th style={{textAlign:"center"}}>Price</th>
                <th style={{textAlign:"center"}}>Action</th>
            </tr>
        </thead>
        <tbody>
            {data && data.map((item, index)=>{
                return(
                    <tr key={index}>
                        <th scope='row'>{index+1}</th>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>
                            <Link to={`/update/${item.id}`}>
                                <button className='btn btn-edit'>Edit</button>
                            </Link>
                            <button className='btn btn-delete' onClick={()=> onDeleteProduct(item.id)}>Delete</button>
                        </td>
                    </tr>
                )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default Home
