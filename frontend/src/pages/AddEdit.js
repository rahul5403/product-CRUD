import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddEdit.css';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';


const initialState = {
    name: "",
    description: "",
    price: "",
};

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const { name, description, price } = state; 

    const { id } = useParams();

    useEffect(() => {
        getSingleProduct(id);
    }, [id]);

    const getSingleProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/product/${id}`);
            if (response.status === 200) {
                setState(response.data|| initialState); 
            } else {
                console.error('Failed to fetch product data:', response);
                toast.error('Failed to fetch product data');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Failed to fetch product data');
        }
    };

    const addProduct = async (data) => {
        const response = await axios.post("http://localhost:5000/product", data);
        if (response.status === 200) {
            toast.success(response.data);
        }
    };

    const updateProduct = async (data, id) => {
        const response = await axios.put(`http://localhost:5000/product/${id}`, data);
        if (response.status === 200) {
            toast.success(response.data);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !description || !price) {
            toast.error("Please fill all the fields");
        } else {
            if(!id){
                addProduct(state);
            }
            else{
                updateProduct(state, id)
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{ margin: "auto", padding: "15px", maxWidth: "400px", alignContent: "center" }} onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id='name' name='name' placeholder='Enter Name ...' onChange={handleInputChange} value={name} />

                <label htmlFor="description">Description</label>
                <input type="text" id='description' name='description' placeholder='Enter Description ...' onChange={handleInputChange} value={description} />

                <label htmlFor="price">Price</label>
                <input type="number" id='price' name='price' placeholder='Enter Price ...' onChange={handleInputChange} value={price} />

                <input type="submit" value={id ? "Update" : "Add"} />
            </form>

        </div>
    );
};

export default AddEdit;
