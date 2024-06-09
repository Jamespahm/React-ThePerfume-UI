import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function UpdateUser() {
    const { id } = useParams();
    const navigate = useNavigate();

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

    useEffect(() => {
        const fetchPerfume = async () => {
            try {
                const res = await request.get(`/user/get-once/${id}`);
                setUser(res.data);
                setPreviewImages({
                    avatar: res.data.avatar ? `http://localhost:8080/img/user-avt/${res.data.avatar}` : null,
                });
            } catch (error) {
                console.log('Error fetching user:', error);
            }
        };
        fetchPerfume();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setUser((prev) => ({ ...prev, [name]: files[0] }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setUser((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(user).forEach((key) => {
                // Nếu key là hình ảnh và không có ảnh mới được chọn, gửi lại giá trị cũ
                if (['avatar'].includes(key) && user[key] instanceof File) {
                    formData.append(key, user[key]);
                } else if (['avatar'].includes(key) && !user[key]) {
                    formData.append(key, previewImages[key]); // Gửi lại giá trị của ảnh hiện có
                } else {
                    formData.append(key, user[key]);
                }
            });

            await request.put(`/user/${id}/update`, formData);
            navigate('/admin/qlkh');
        } catch (error) {
            console.log('Error updating user:', error);
        }
    };

    return (
        <div className={cx('container', 'form-create')}>
            <h2>Cập nhật khách hàng</h2>

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
                            type="tel"
                            className={cx('form-control')}
                            name="sdt"
                            value={user.sdt}
                            onChange={handleChange}
                            pattern="^0[0-9]{9}$"
                            maxLength="10"
                            title="Số điện thoại không đúng !"
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
                    {['avatar'].map((imageField, index) => (
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

                <Link to={'/admin/qlkh'} className={cx('btn', 'btn-warning', 'btn-add')}>
                    Quay lại
                </Link>
                <button type="submit" className={cx('btn', 'btn-primary', 'btn-add', 'ml-3')}>
                    Cập nhật
                </button>
            </form>
        </div>
    );
}

export default UpdateUser;
