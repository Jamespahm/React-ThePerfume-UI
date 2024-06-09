import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CurrencyFormat from 'react-currency-format';
const cx = classNames.bind(styles);

const CreatePerfume = () => {
    const [perfume, setPerfume] = useState({
        tenNH: '',
        giaban: '',
        dungtich: '',
        hinhanh1: null,
        hinhanh2: null,
        hinhanh3: null,
        hinhanh4: null,
        soluong: '',
        mota: '',
        motact: '',
        idTH: '',
        idL: '',
    });

    const [previewImages, setPreviewImages] = useState({
        hinhanh1: null,
        hinhanh2: null,
        hinhanh3: null,
        hinhanh4: null,
    });
    const navigate = useNavigate();
    const [brands, setBrands] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch brands and categories when the component mounts
        request
            .get('/brand')
            .then((response) => setBrands(response.data.brands))
            .catch((error) => console.error('Error fetching brands:', error));

        request
            .get('/category')
            .then((response) => setCategories(response.data.categories))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

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

            setPerfume({
                ...perfume,
                [name]: file,
            });
            setPreviewImages({
                ...previewImages,
                [name]: previewUrl,
            });
        } else {
            setPerfume({
                ...perfume,
                [name]: value,
            });
        }
    };
    const handleDescriptionChange = (data, field) => {
        setPerfume((prev) => ({ ...prev, [field]: data }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(perfume).forEach((key) => {
            formData.append(key, perfume[key]);
        });

        request
            .post('/perfume/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                alert(response.data.message);
                setPerfume({
                    tenNH: '',
                    giaban: '',
                    dungtich: '',
                    hinhanh1: null,
                    hinhanh2: null,
                    hinhanh3: null,
                    hinhanh4: null,
                    soluong: '',
                    mota: '',
                    idTH: '',
                    idL: '',
                });
                setPreviewImages({
                    hinhanh1: null,
                    hinhanh2: null,
                    hinhanh3: null,
                    hinhanh4: null,
                });
                navigate('/admin/qlsp'); // Điều hướng về trang danh sách nước hoa sau khi cập nhật thành công
            })
            .catch((error) => {
                console.error('There was an error adding the perfume!', error);
            });
    };

    return (
        <div className={cx('container', 'form-create')}>
            <h2>Thêm Nước Hoa Mới</h2>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Tên nước hoa:</label>
                        <input
                            type="text"
                            className={cx('form-control')}
                            name="tenNH"
                            value={perfume.tenNH}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Giá bán:</label>
                        <CurrencyFormat
                            className={cx('form-control')}
                            thousandSeparator={true}
                            suffix={' VND'}
                            name="giaban"
                            value={perfume.giaban}
                            onValueChange={(values) => {
                                const { value } = values;
                                setPerfume((prev) => ({ ...prev, giaban: value }));
                            }}
                            required
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Dung tích:</label>
                        <select
                            className={cx('form-control')}
                            name="dungtich"
                            value={perfume.dungtich}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn dung tích</option>
                            <option value="10ml">10ml</option>
                            <option value="50ml">50ml</option>
                            <option value="100ml">100ml</option>
                            <option value="150ml">150ml</option>
                            <option value="200ml">200ml</option>
                        </select>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Số lượng:</label>
                        <input
                            type="number"
                            className={cx('form-control')}
                            name="soluong"
                            value={perfume.soluong}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Thương hiệu:</label>
                        <select
                            className={cx('form-control')}
                            name="idTH"
                            value={perfume.idTH}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn thương hiệu</option>
                            {brands.map((brand) => (
                                <option key={brand.idTH} value={brand.idTH}>
                                    {brand.tenTH}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Loại:</label>
                        <select
                            className={cx('form-control')}
                            name="idL"
                            value={perfume.idL}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Chọn loại</option>
                            {categories.map((category) => (
                                <option key={category.idL} value={category.idL}>
                                    {category.tenL}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="row mt-3">
                    <div className="mb-3 col-md-3">
                        <label htmlFor="file-input" className={cx('upload-button')}>
                            Hình ảnh 1 - Ảnh chính:
                        </label>
                        <input
                            type="file"
                            id="file-input"
                            className={cx('file-input')}
                            name="hinhanh1"
                            onChange={handleChange}
                            required
                        />
                        {previewImages.hinhanh1 && (
                            <img src={previewImages.hinhanh1} alt="Preview" className={cx('img-preview')} />
                        )}
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="file-input2" className={cx('upload-button')}>
                            Hình ảnh 2:
                        </label>
                        <input
                            type="file"
                            id="file-input2"
                            className={cx('file-input')}
                            name="hinhanh2"
                            onChange={handleChange}
                            required
                        />
                        {previewImages.hinhanh2 && (
                            <img src={previewImages.hinhanh2} alt="Preview" className={cx('img-preview')} />
                        )}
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="file-input3" className={cx('upload-button')}>
                            Hình ảnh 3:
                        </label>
                        <input
                            type="file"
                            id="file-input3"
                            className={cx('file-input')}
                            name="hinhanh3"
                            onChange={handleChange}
                            required
                        />
                        {previewImages.hinhanh3 && (
                            <img src={previewImages.hinhanh3} alt="Preview" className={cx('img-preview')} />
                        )}
                    </div>
                    <div className="mb-3 col-md-3">
                        <label htmlFor="file-input4" className={cx('upload-button')}>
                            Hình ảnh 4:
                        </label>
                        <input
                            type="file"
                            id="file-input4"
                            className={cx('file-input')}
                            name="hinhanh4"
                            onChange={handleChange}
                            required
                        />
                        {previewImages.hinhanh4 && (
                            <img src={previewImages.hinhanh4} alt="Preview" className={cx('img-preview')} />
                        )}
                    </div>
                </div>

                <div className="mb-3">
                    <label className={cx('form-label')}>Mô tả:</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={perfume.mota}
                        onChange={(event, editor) => handleDescriptionChange(editor.getData(), 'mota')}
                    />
                </div>
                <div className="mb-3">
                    <label className={cx('form-label')}>Mô tả chi tiết:</label>
                    <CKEditor
                        editor={ClassicEditor}
                        data={perfume.motact}
                        onChange={(event, editor) => handleDescriptionChange(editor.getData(), 'motact')}
                    />
                </div>
                <Link to={'/admin/qlsp'} className={cx('btn', 'btn-warning', 'btn-add')}>
                    Quay lại
                </Link>
                <button type="submit" className={cx('btn', 'btn-primary', 'btn-add', 'ml-3')}>
                    Thêm Nước Hoa
                </button>
            </form>
        </div>
    );
};

export default CreatePerfume;
