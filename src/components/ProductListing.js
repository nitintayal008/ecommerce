import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './ProductListing.css';

const ProductListing = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 8;

    // Fetch products with pagination
    const fetchProducts = async (page) => {
        setLoading(true);
        setError(null);
        
        const skip = (page - 1) * productsPerPage;
        const limit = productsPerPage;
        
        try {
            const response = await axios.get(`https://dummyjson.com/products`, {
                params: { skip, limit }
            });
            setProducts(response.data.products);
        } catch (error) {
            setError('Failed to fetch products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    // Handle pagination
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="product-listing">
            <h1>Product Listing</h1>

            {loading && <p>Loading products...</p>}
            {error && <p className="error">{error}</p>}
            
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.thumbnail} alt={product.title} className="product-image" />
                        <h3 className="product-title">{product.title}</h3>
                        <p className="product-category">Category: {product.category}</p>
                        <p className="product-brand">Brand: {product.brand}</p>
                        <p className="product-rating">Rating: {product.rating}</p>
                        <p className="product-price">Price: ${product.price}</p>
                        <p className="product-discount">Discount: {product.discountPercentage}%</p>
                        <Link to={`/products/${product.id}`} className="view-details">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination Controls */}
            <div className="pagination">
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
                )}
                <span>Page {currentPage}</span>
                {products.length === productsPerPage && (
                    <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
                )}
            </div>
        </div>
    );
};

export default ProductListing;
