import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function UpdateCategory() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [category, setCategory] = useState({
        tenL: '',
        mota: '',
        hinhanh: null,
    });

    const [previewImages, setPreviewImages] = useState({
        hinhanh: null,
    });

    useEffect(() => {
        const fetchPerfume = async () => {
            try {
                const res = await request.get(`/category/get-once/${id}`);
                setCategory(res.data);
                setPreviewImages({
                    hinhanh: res.data.hinhanh ? `http://localhost:8080/img/category/${res.data.hinhanh}` : null,
                });
            } catch (error) {
                console.log('Error fetching category:', error);
            }
        };
        fetchPerfume();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setCategory((prev) => ({ ...prev, [name]: files[0] }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setCategory((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(category).forEach((key) => {
                // Nếu key là hình ảnh và không có ảnh mới được chọn, gửi lại giá trị cũ
                if (['hinhanh'].includes(key) && category[key] instanceof File) {
                    formData.append(key, category[key]);
                } else if (['hinhanh'].includes(key) && !category[key]) {
                    formData.append(key, previewImages[key]); // Gửi lại giá trị của ảnh hiện có
                } else {
                    formData.append(key, category[key]);
                }
            });

            await request.put(`/category/${id}/update`, formData);
            navigate('/admin/qll');
        } catch (error) {
            console.log('Error updating category:', error);
        }
    };

    return (
        <div className={cx('container', 'form-create')}>
            <h2>Cập nhật loại nước hoa</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3 ">
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
                    <input
                        type="text"
                        className={cx('form-control')}
                        name="mota"
                        value={category.mota}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="row mt-3">
                    {['hinhanh'].map((imageField, index) => (
                        <div key={index} className="mb-3 col-md-3">
                            <label htmlFor="file-input" className={cx('upload-button')}>
                                Chọn ảnh
                            </label>
                            <input
                                type="file"
                                id="file-input"
                                className={cx('file-input')}
                                name={imageField}
                                onChange={handleChange}
                            />
                            {previewImages[imageField] && (
                                <img src={previewImages[imageField]} alt="Preview" className={cx('img-preview')} />
                            )}
                        </div>
                    ))}
                </div>

                <Link to={'/admin/qlth'} className={cx('btn', 'btn-warning', 'btn-add')}>
                    Quay lại
                </Link>
                <button type="submit" className={cx('btn', 'btn-primary', 'btn-add', 'ml-3')}>
                    Cập nhật
                </button>
            </form>
        </div>
    );
}

export default UpdateCategory;
