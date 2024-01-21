import { useState, useEffect } from 'react';
import axios from 'axios';
import DeleteCarImage from '../DashModals/DeleteCarImage';

function EditProduct({ fetchProducts, closeEditProductModal, productID }) {

    const [productData, setProductData] = useState({
        name: '',
        images: [],
        description: '',
        reference: '',
        price: '',
        category: '',
        status: '',
        applyDiscount: false,
        discountPercentage: ''
    });
    const [allCategories, setAllCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [showDiscount, setShowDiscount] = useState(false);
    const [isEditingImage, setISEditingImage] = useState(false);
    const [showDeleteProductImageModal, setShowDeleteProductImageModal] = useState({
        isOpen: false,
        imageIndex: null,
        productId: null,
    });

    const handleAddImage = async () => {
        try {
            const formData = new FormData();
            formData.append('image', imageFile);
            formData.append('productID', productID);
    
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            };
    
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/product/addImage`,
                formData,
                config
            );

            setISEditingImage((prev)=>!prev);

            setProductData((prevProductData) => ({
                ...prevProductData,
                images: [...prevProductData.images, response.data.data.downloadURL],
            }));
    
            setImageFile(null);
           
        } catch (error) {
            console.error('Error adding image:', error.response.data.message);
            setErrorMessage('Failed to add image. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await axios.put(
                `${process.env.REACT_APP_API_URL}/product/update/${productID}`,
                productData,
                config
            );

            fetchProducts();
            closeEditProductModal();
        } catch (error) {
            console.error('Error updating product:', error.response.data);
            setErrorMessage('Failed to update product. Please try again.');
        }
    };

    useEffect(() => {
        console.log('hello')
        axios.get(`${process.env.REACT_APP_API_URL}/product/getByID/${productID}`)
            .then((response) => {
                const product = response.data.data;
                setProductData((prev)=>({...prev,  
                    name: product.name,
                    images: product.images,
                    description: product.description,
                    reference: product.reference,
                    price: product.price,
                    category: product.categoryID,
                    status: product.status,
                    discountPercentage: product.discountPercentage || 0}))
            })
            .catch((error) => {
                console.error(`Error fetching product data: `, error);
            });

        axios.get(`${process.env.REACT_APP_API_URL}/category/getAll`)
            .then((response) => {
                setAllCategories(response.data.data);
            })
            .catch((error) => {
                console.error(`Error fetching categories' data: `, error);
            });
    }, [productID,isEditingImage]);


    const handleDeleteImageModalClose = () => {
        setShowDeleteProductImageModal({ isOpen: false });
    };

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setProductData(prevProductData => ({
            ...prevProductData,
            categoryID: selectedCategoryId 
        }));
    };

    return (
        <div>
            <p className="text-red-700 text-3xl text-center underline my-5">EDIT PRODUCT</p>
            <div className="text-center">
                <form className="py-4" onSubmit={handleSubmit}>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Product name"
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
                            value={productData.name}
                            onChange={(e) => setProductData({ ...productData, name: e.target.value })}
                        />
                        <span className="mx-4"></span>
                        <div className="flex mb-4">
                            <select
                                value={productData.categoryID}
                                onChange={handleCategoryChange}
                                className="px-4 py-2 mr-4 bg-gray-100 focus:outline-none text-lg text-black"
                            >
                                <option value="">Select category</option>
                                {allCategories.map((category) => (
                                    <option
                                        key={category._id}
                                        value={category._id}
                                        className="capitalize"
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex mb-4">
                            <select
                                value={productData.status}
                                onChange={(e) => setProductData({ ...productData, status: e.target.value })}
                                className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
                            >
                                <option value={productData.name}>Status</option>
                                <option value="available">Available</option>
                                <option value="sold">Sold</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex mb-4">
                        <textarea
                            rows={5}
                            placeholder="Description"
                            value={productData.description}
                            onChange={(e) => setProductData({ ...productData, description: e.target.value })}
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black resize-none"
                        />
                        <span className="mx-4"></span>
                        <div className="flex flex-wrap justify-between w-96">
                            {productData.images.map((image, index) => (
                                <div key={index} className='relative w-fit'
                                    style={{ maxWidth: '100px', minWidth: '100px', maxHeight: '100px', minHeight: '100px' }}>
                                    <img
                                        src={image}
                                        alt="img"
                                        style={{ maxWidth: '100px', minWidth: '100px', maxHeight: '100px', minHeight: '100px', objectFit: 'cover' }}
                                        className="mx-2 mb-2"
                                    />
                                    <img src="../Images/dashboardIcons/delete.png" className="bg-white h-6 w-6 absolute bottom-2 right-0 z-10" alt="Delete Icon"
                                        onClick={() => {
                                            setShowDeleteProductImageModal({
                                                isOpen: true,
                                                imageIndex: index,
                                                productId: productID,
                                            });
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex mb-4">
                            <input
                                type="file"
                                onChange={(e) => setImageFile(e.target.files[0])}
                            />
                            <button
                                type='button'
                                onClick={handleAddImage}
                            >
                                Add
                            </button>
                        </div>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="Price"
                            value={productData.price}
                            onChange={(e) => setProductData({ ...productData, price: e.target.value })}
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
                        />
                        <span className="mx-4"></span>
                        <input
                            type="text"
                            placeholder="Reference"
                            value={productData.reference}
                            onChange={(e) => setProductData({ ...productData, reference: e.target.value })}
                            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
                        />
                    </div>
                    <div className="flex mb-4">
                        <div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    checked={showDiscount}
                                    onChange={() => setShowDiscount(!showDiscount)}
                                    className="mr-2"
                                />
                                <p className="text-black">Apply discount</p>
                            </div>

                            {showDiscount && (
                                <div className="flex flex-col">
                                <input
                                    type="number"
                                    placeholder="Discount percentage %"
                                    value={Math.max(0, productData.discountPercentage)} 
                                    className="px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
                                    onChange={(e) =>
                                    setProductData({
                                        ...productData,
                                        discountPercentage: Math.max(0, e.target.value), 
                                    })
                                    }
                                />
                                </div>
                            )}
                        </div>
                    </div>

                    {showDeleteProductImageModal.isOpen === true && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                            <div className="fixed inset-0 bg-black opacity-50"></div>
                            <div className="bg-white p-6 relative z-10">
                                <button
                                    onClick={handleDeleteImageModalClose}
                                    className="absolute top-0 right-0 m-4 px-2 py-1"
                                >
                                    X
                                </button>
                                <DeleteCarImage
                                    closeDeleteProductImageModal={handleDeleteImageModalClose}
                                    ImageIndex={showDeleteProductImageModal.imageIndex}
                                    ProductID={showDeleteProductImageModal.productId}
                                    setISEditingImage={setISEditingImage}

                                />
                            </div>
                        </div>
                    )}

                    {setErrorMessage !== '' && <p className="text-red-700 text-sm">{errorMessage}</p>}
                    <div className="flex justify-end">
                        <button
                            className="text-red-700 border border-red-700 px-4 py-2 hover:bg-red-100">
                            SUBMIT
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;