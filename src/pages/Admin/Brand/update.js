import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function UpdateBrand() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [brand, setBrand] = useState({
        tenTH: '',
        xuatxu: '',
        mota: '',
        hinhanh: null,
    });

    const [previewImages, setPreviewImages] = useState({
        hinhanh: null,
    });

    useEffect(() => {
        const fetchPerfume = async () => {
            try {
                const res = await request.get(`/brand/get-once/${id}`);
                setBrand(res.data);
                setPreviewImages({
                    hinhanh: res.data.hinhanh ? `http://localhost:8080/img/banner/${res.data.hinhanh}` : null,
                });
            } catch (error) {
                console.log('Error fetching brand:', error);
            }
        };
        fetchPerfume();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setBrand((prev) => ({ ...prev, [name]: files[0] }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setBrand((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(brand).forEach((key) => {
                // Nếu key là hình ảnh và không có ảnh mới được chọn, gửi lại giá trị cũ
                if (['hinhanh'].includes(key) && brand[key] instanceof File) {
                    formData.append(key, brand[key]);
                } else if (['hinhanh'].includes(key) && !brand[key]) {
                    formData.append(key, previewImages[key]); // Gửi lại giá trị của ảnh hiện có
                } else {
                    formData.append(key, brand[key]);
                }
            });

            await request.put(`/brand/${id}/update`, formData);
            navigate('/admin/qlth');
        } catch (error) {
            console.log('Error updating brand:', error);
        }
    };

    return (
        <div className={cx('container', 'form-create')}>
            <h2>Cập nhật thương hiệu</h2>

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

export default UpdateBrand;
