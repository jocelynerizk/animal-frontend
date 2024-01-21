import axios from 'axios';

function DeleteProduct({ fetchProducts, closeDeleteProductModal, productID }) {
    const token = localStorage.getItem('token');

    const deleteProduct = async () => {
        console.log('Product ID to be deleted:', productID);
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/product/delete/${productID}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            console.log('Response after delete request:', response);
            console.log('Product deleted successfully');
            await fetchProducts();
            closeDeleteProductModal();
        } catch (error) {
            console.error('Error deleting product data: ', error);
            console.log('Error response:', error.response);
            if (error.response) {
                console.log('Error status:', error.response.status);
                console.log('Error data:', error.response.data);
            }
        }
    };


    return (
        <div className="flex items-center justify-center">
            <div className="text-center">
                <p className="text-2xl m-12 w-2/3 mx-auto">
                    Are you sure you want to delete this product?
                </p>
                <div className="flex justify-end bg-gray-100 p-6 items-center">
                    <button className="bg-white text-red-700 font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block  mr-4"
                        onClick={closeDeleteProductModal}>
                        CANCEL
                    </button>
                    <button
                        onClick={deleteProduct}
                        className="bg-red-700 text-white font-bold py-1 px-2 border border-red-700 w-32 text-lg inline-block"
                    >
                        CONFIRM
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeleteProduct;