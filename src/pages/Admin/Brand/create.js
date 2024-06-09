import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const CreateBrand = () => {
    const [brand, setBrand] = useState({
        tenTH: '',
        xuatxu: '',
        mota: '',
        hinhanh: null,
    });

    const [previewImages, setPreviewImages] = useState({
        hinhanh: null,
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Cleanup URLs when component unmounts or previews change
        return () => {
            Object.values(previewImages).forEach((url) => {
                if (url) {
                    URL.revokeObjectURL(url);
                }
            });
        };
    }, [previewImages]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            const file = files[0];
            const previewUrl = URL.createObjectURL(file);

            // Revoke previous URL if it exists
            if (previewImages[name]) {
                URL.revokeObjectURL(previewImages[name]);
            }

            setBrand({
                ...brand,
                [name]: file,
            });
            setPreviewImages({
                ...previewImages,
                [name]: previewUrl,
            });
        } else {
            setBrand({
                ...brand,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!brand.hinhanh) {
            alert('Please select an hinhanh image.');
            return;
        }

        const formData = new FormData();
        Object.keys(brand).forEach((key) => {
            formData.append(key, brand[key]);
        });

        request
            .post('/brand/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                alert(response.data.message);
                setBrand({
                    tenTH: '',
                    xuatxu: '',
                    mota: '',
                    hinhanh: null,
                });
                setPreviewImages({
                    hinhanh: null,
                });
                navigate('/admin/qlth'); // Navigate to customer list page after successful creation
            })
            .catch((error) => {
                console.error('There was an error adding the brand!', error);
            });
    };

    return (
        <div className={cx('container', 'form-create')}>
            <h2>Thêm Thương Hiệu Mới</h2>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Tên thương hiệu:</label>
                        <input
                            type="text"
                            className={cx('form-control')}
                            name="tenTH"
                            value={brand.tenTH}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Xuất xứ:</label>
                        <input
                            type="text"
                            className={cx('form-control')}
                            name="xuatxu"
                            value={brand.xuatxu}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className={cx('form-label')}>Mô tả:</label>
                    <input
                        type="text"
                        className={cx('form-control')}
                        name="mota"
                        value={brand.mota}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row mt-3">
                    <div className="mb-3 col-md-3">
                        <label htmlFor="file-input" className={cx('upload-button')}>
                            Chọn ảnh
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            className={cx('file-input')}
                            name="hinhanh"
                            onChange={handleChange}
                            required
                        />
                        {previewImages.hinhanh && (
                            <img src={previewImages.hinhanh} alt="Preview" className={cx('img-preview')} />
                        )}
                    </div>
                </div>

                <Link to={'/admin/qlth'} className={cx('btn', 'btn-warning', 'btn-add')}>
                    Quay lại
                </Link>
                <button type="submit" className={cx('btn', 'btn-primary', 'btn-add', 'ml-3')}>
                    Thêm thương hiệu
                </button>
            </form>
        </div>
    );
};

export default CreateBrand;
