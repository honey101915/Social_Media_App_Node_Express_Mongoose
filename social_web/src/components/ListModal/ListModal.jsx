import React, { useEffect, useState } from 'react';
import './ListModal.css'; // Import CSS file for styling
import { FaSearch, FaTimes } from 'react-icons/fa'; // Import search and close icons
import { getAllSchoolsApi } from '../../redux/reduxActions/homeActions';
import { notifyError } from '../../utils/ToastConfig';
import { ApiError } from '../../utils/helperFunctions';

const ListModal = ({ payload, handleContinue, handleClose }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [allItems, setAllItems] = useState([]);
    const [loading, setLoading] = useState(true); // New state for loading

    useEffect(() => {
        _getAllSchools();
    }, [currentPage]);

    useEffect(() => {
        if (currentPage === 1) {
            _getAllSchools();
        } else {
            setCurrentPage(1);
        }
    }, [searchTerm]);

    const _getAllSchools = () => {
        setLoading(true); // Show loader
        let _query = `?page=${currentPage}&search=${searchTerm}`;
        getAllSchoolsApi(_query)
            .then((res) => {
                setAllItems(res?.data?.data || []);
                setTotalPages(res?.data?.totalPages);
            })
            .catch((error) => {
                notifyError(ApiError(error));
            })
            .finally(() => {
                setLoading(false); // Hide loader
            });
    };

    const handleNext = () => {
        if (currentPage === totalPages) return;
        setCurrentPage(currentPage + 1);
    };

    const handlePrev = () => {
        if (currentPage === 1) return;
        setCurrentPage(currentPage - 1);
    };

    const handleSelect = (item) => {
        setSelectedItem(item);
    };

    const onContinue = () => {
        if (selectedItem) {
            handleContinue(selectedItem);
        } else {
            alert('Please select an item before continuing.');
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-heading">{payload?.heading}</h2>
                    <FaTimes className="close-icon" onClick={handleClose} /> {/* Close icon */}
                </div>
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <FaSearch className="search-icon" />
                </div>
                <div className="list-header">
                    <h3 className="list-title">{payload?.subHeading || ""}</h3>
                </div>
                <div className="modal-body">
                    {loading ? (
                        <div className="modal-loading">
                            <h3>Loading...</h3>
                        </div>
                    ) : (
                        <ul className="modal-list">
                            {allItems.length > 0 ? (
                                allItems.map((item, index) => (
                                    <li
                                        key={item}
                                        className={`modal-list-item ${selectedItem === item ? 'selected' : ''}`}
                                        onClick={() => handleSelect(item)}
                                    >
                                        {(currentPage === 1 ? (index + 1) : String(10 * (currentPage - 1) + index + 1)) + ". " + item?.name}
                                    </li>
                                ))
                            ) : (
                                <li className="modal-list-item">No items found</li>
                            )}
                        </ul>
                    )}
                </div>
                <div className="pagination-controls">
                    <button
                        className="pagination-button"
                        onClick={handlePrev}
                        disabled={currentPage === 1 || loading}
                    >
                        Prev
                    </button>
                    <span className="pagination-info">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="pagination-button"
                        onClick={handleNext}
                        disabled={currentPage === totalPages || loading}
                    >
                        Next
                    </button>
                </div>
                <div className="action-controls">
                    <button
                        className="continue-button"
                        onClick={onContinue}
                        disabled={loading}
                    >
                        Continue
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListModal;
