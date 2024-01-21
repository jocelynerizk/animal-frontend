import { useState, useEffect } from 'react';
import axios from 'axios';


function AddProduct({ fetchProducts , closeAddProductModal}) {
  const [name, setName] = useState('');
  const [images, setImages] = useState([]);
  const [description, setDescription] = useState('');
  const [reference, setReference] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [status, setStatus] = useState('available');
  const [discountPercentage, setDiscountPercentage] = useState('0');
  const [errorMessage, setErrorMessage] = useState('');
  const token = localStorage.getItem('token');

  const handleAddImageInput = () => {
    if (images.length + 1 > 6) {
      setErrorMessage('Maximum 6 images allowed per product');
      return;
    }
    setImages((prevImages) => [...prevImages, null]);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (name.trim() === '' || !category || description.trim() === '' || price.trim() === '' || reference.trim() === '' || !images) {
      setErrorMessage('All fields are required');
      return;
    }
  
    const newProduct = new FormData();
    newProduct.append('name', name);
    newProduct.append('categoryID', category); 
    newProduct.append('status', status);
    newProduct.append('description', description);
    newProduct.append('price', price);
    newProduct.append('reference', reference);
    newProduct.append('discountPercentage', discountPercentage);
  
    for (let i = 0; i < images.length; i++) {
      newProduct.append('images', images[i]);
    }
  
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/product/add`, newProduct, {
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${token}`
        },
      });
      console.log('Product added:', response.data);
      closeAddProductModal();
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const handleImageChange = (e, index) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImages((prevImages) => {
        const newImages = [...prevImages];
        newImages[index] = selectedImage;
        return newImages;
      });
    }
    setErrorMessage('');
  };

  const renderImageInputs = () => {
    const inputs = [];

  
    for (let i = 0; i < images.length; i++) {
      inputs.push(
        <input
          key={i}
          type="file"
          accept="image/*"
          onChange={(e) => handleImageChange(e, i)}
          className="flex-1 px-4 py-1 focus:outline-none text-black"
        />
      );
    }

    inputs.push(
      <button key={inputs.length} onClick={handleAddImageInput} className="flex-1 px-4 py-1 focus:outline-none text-black hover:underline">
        Add image
      </button>
    );

    return inputs;
  };

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
      .then((response) => {
        setAllCategories(response.data.data);
      })
      .catch((error) => {
        console.error(`Error fetching categories' data: `, error);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setCategory(selectedCategoryId);
  };

  // console.log(category)
  // console.log(reference)

  return (
    <div>
      <p className="text-red-700 text-3xl text-center underline my-5">ADD PRODUCT</p>
      <div className="text-center">
        <form className="py-4" onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <input
              type="text"
              placeholder="Product name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
            <span className="mx-4"></span>
            <div className="flex mb-4">
              <select
                value={category}
                onChange={handleCategoryChange}
                className=" px-4 py-2 mr-4 bg-gray-100 focus:outline-none text-lg text-black"
              >
                <option value="">Select category</option>
                {allCategories.map((category) => (
                  <option key={category._id} value={category._id} className="capitalize" >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex mb-4 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black">
              available
            </div>
          </div>
          <div className="flex mb-4">
            <textarea
              rows={5}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black resize-none"
            />
            <span className="mx-4"></span>
            <div className='flex flex-col'>
              {renderImageInputs()}
            </div>
          </div>
          <div className="flex mb-4">
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
            <span className="mx-4"></span>
            <input
              type="text"
              placeholder="Reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
          </div>
      
          {errorMessage !== '' && <p className="text-red-700 text-sm">{errorMessage}</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="text-red-700 border border-red-700 px-4 py-2 hover:bg-red-100">
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
