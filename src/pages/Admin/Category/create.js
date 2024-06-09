import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const CreateCategory = () => {
    const [category, setCategory] = useState({
        tenL: '',
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

            setCategory({
                ...category,
                [name]: file,
            });
            setPreviewImages({
                ...previewImages,
                [name]: previewUrl,
            });
        } else {
            setCategory({
                ...category,
                [name]: value,
            });
        }
    };
    const handleDescriptionChange = (data, field) => {
        setCategory((prev) => ({ ...prev, [field]: data }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!category.hinhanh) {
            alert('Please select an hinhanh image.');
            return;
        }

        const formData = new FormData();
        Object.keys(category).forEach((key) => {
            formData.append(key, category[key]);
        });

        request
            .post('/category/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                alert(response.data.message);
                setCategory({
                    tenL: '',
                    mota: '',
                    hinhanh: null,
                });
                setPreviewImages({
                    hinhanh: null,
                });
                navigate('/admin/qll'); // Navigate to customer list page after successful creation
            })
            .catch((error) => {
                console.error('There was an error adding the category!', error);
            });
    };

    return (
        <div className={cx('container', 'form-create')}>
            <h2>Thêm Thương Hiệu Mới</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className={cx('form-label')}>Tên loại nước hoa:</label>
                    <input
                        type="text"
                        className={cx('form-control')}
                        name="tenL"
                        value={category.tenL}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className={cx('form-label')}>Mô tả:</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={category.mota}
                        onChange={(event, editor) => handleDescriptionChange(editor.getData(), 'mota')}
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

                <Link to={'/admin/qll'} className={cx('btn', 'btn-warning', 'btn-add')}>
                    Quay lại
                </Link>
                <button type="submit" className={cx('btn', 'btn-primary', 'btn-add', 'ml-3')}>
                    Thêm loại nước hoa
                </button>
            </form>
        </div>
    );
};

export default CreateCategory;
