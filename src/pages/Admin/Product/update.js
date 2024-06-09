import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import request from '~/utils/request';
import styles from '../Admin.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

function UpdatePerfume() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [perfume, setPerfume] = useState({
        tenNH: '',
        giaban: '',
        dungtich: '',
        hinhanh1: '',
        hinhanh2: '',
        hinhanh3: '',
        hinhanh4: '',
        soluong: '',
        soluongban: '',
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
        const fetchPerfume = async () => {
            try {
                const res = await request.get(`/perfume/get-once/${id}`);
                setPerfume(res.data);
                setPreviewImages({
                    hinhanh1: res.data.hinhanh1 ? `http://localhost:8080/img/products/${res.data.hinhanh1}` : null,
                    hinhanh2: res.data.hinhanh2 ? `http://localhost:8080/img/products/${res.data.hinhanh2}` : null,
                    hinhanh3: res.data.hinhanh3 ? `http://localhost:8080/img/products/${res.data.hinhanh3}` : null,
                    hinhanh4: res.data.hinhanh4 ? `http://localhost:8080/img/products/${res.data.hinhanh4}` : null,
                });
            } catch (error) {
                console.log('Error fetching perfume:', error);
            }
        };
        fetchPerfume();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setPerfume((prev) => ({ ...prev, [name]: files[0] }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImages((prev) => ({ ...prev, [name]: reader.result }));
            };
            reader.readAsDataURL(files[0]);
        } else {
            setPerfume((prev) => ({ ...prev, [name]: value }));
        }
    };
    const handleDescriptionChange = (data, field) => {
        setPerfume((prev) => ({ ...prev, [field]: data }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            Object.keys(perfume).forEach((key) => {
                // Nếu key là hình ảnh và không có ảnh mới được chọn, gửi lại giá trị cũ
                if (['hinhanh1', 'hinhanh2', 'hinhanh3', 'hinhanh4'].includes(key) && perfume[key] instanceof File) {
                    formData.append(key, perfume[key]);
                } else if (['hinhanh1', 'hinhanh2', 'hinhanh3', 'hinhanh4'].includes(key) && !perfume[key]) {
                    formData.append(key, previewImages[key]); // Gửi lại giá trị của ảnh hiện có
                } else {
                    formData.append(key, perfume[key]);
                }
            });

            await request.put(`/perfume/${id}/update`, formData);
            navigate('/admin/qlsp');
        } catch (error) {
            console.log('Error updating perfume:', error);
        }
    };

    return (
        <div className={cx('container', 'form-create')}>
            <h2>Cập nhật nước hoa</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
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
                <div className="row">
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
                </div>
                <div className="row">
                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Số lượng kho:</label>
                        <input
                            type="number"
                            className={cx('form-control')}
                            name="soluong"
                            value={perfume.soluong}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3 col-md-6">
                        <label className={cx('form-label')}>Đã bán:</label>
                        <input
                            type="number"
                            className={cx('form-control')}
                            name="soluongban"
                            value={perfume.soluongban}
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
                    {['hinhanh1', 'hinhanh2', 'hinhanh3', 'hinhanh4'].map((imageField, index) => (
                        <div key={index} className="mb-3 col-md-3">
                            <label htmlFor="file-input" className={cx('upload-button')}>
                                Chọn ảnh
                            </label>
                            <input
                                type="file"
                                className={cx('file-input')}
                                name={imageField}
                                onChange={handleChange}
                                id="file-input"
                            />
                            {previewImages[imageField] && (
                                <img src={previewImages[imageField]} alt="Preview" className={cx('img-preview')} />
                            )}
                        </div>
                    ))}
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
                    Cập nhật
                </button>
            </form>
        </div>
    );
}

export default UpdatePerfume;
