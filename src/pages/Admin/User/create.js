import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

const CreateUser = () => {
    const [user, setUser] = useState({
        tenKH: '',
        gioitinh: '',
        sdt: '',
        email: '',
        diachi: '',
        matkhau: '',
        avatar: null,
    });

    const [previewImages, setPreviewImages] = useState({
        avatar: null,
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

            setUser({
                ...user,
                [name]: file,
            });
            setPreviewImages({
                ...previewImages,
                [name]: previewUrl,
            });
        } else {
            setUser({
                ...user,
                [name]: value,
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(user).forEach((key) => {
            formData.append(key, user[key]);
        });

        request
            .post('/user/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                alert(response.data.message);
                setUser({
                    tenKH: '',
                    gioitinh: '',
                    sdt: '',
                    email: '',
                    diachi: '',
                    matkhau: '',
                    avatar: null,
                });
                setPreviewImages({
                    avatar: null,
                });
                navigate('/admin/qlkh'); // Điều hướng về trang danh sách nước hoa sau khi cập nhật thành công
            })
            .catch((error) => {
                console.error('There was an error adding the user!', error);
            });
    };

    return (
        <div className={cx('container', 'form-create')}>
            <h2>Thêm Khách Hàng Mới</h2>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Tên khách hàng:</label>
                        <input
                            type="text"
                            className={cx('form-control')}
                            name="tenKH"
                            value={user.tenKH}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Giới tính:</label>
                        <select
                            className={cx('form-control')}
                            name="gioitinh"
                            value={user.gioitinh}
                            onChange={handleChange}
                            required
                        >
                            <option value="nam">Nam</option>
                            <option value="nữ">Nữ</option>
                            <option value="khác">Khác</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>SDT:</label>
                        <input
                            type="number"
                            className={cx('form-control')}
                            name="sdt"
                            value={user.sdt}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Email:</label>
                        <input
                            type="text"
                            className={cx('form-control')}
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Địa chỉ:</label>
                        <input
                            type="text"
                            className={cx('form-control')}
                            name="diachi"
                            value={user.diachi}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Mật khẩu:</label>
                        <input
                            type="text"
                            className={cx('form-control')}
                            name="matkhau"
                            value={user.matkhau}
                            onChange={handleChange}
                            required
                        />
                    </div>
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
                            name="avatar"
                            onChange={handleChange}
                            required
                        />
                        {previewImages.avatar && (
                            <img src={previewImages.avatar} alt="Preview" className={cx('img-preview')} />
                        )}
                    </div>
                </div>

                <Link to={'/admin/qlkh'} className={cx('btn', 'btn-warning', 'btn-add')}>
                    Quay lại
                </Link>
                <button type="submit" className={cx('btn', 'btn-primary', 'btn-add', 'ml-3')}>
                    Thêm Khách Hàng
                </button>
            </form>
        </div>
    );
};

export default CreateUser;
