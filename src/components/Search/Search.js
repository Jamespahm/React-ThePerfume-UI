import { useEffect, useRef, useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import HeadlessTippy from '@tippyjs/react/headless'; // different import path!
import ProductItem from '~/components/ProductItem';

import * as searchService from '~/services/searchProductService';
import { useDebounce } from '~/hooks';
import { FaCircleXmark } from 'react-icons/fa6';
import { IoSearchOutline } from 'react-icons/io5';
import { RiLoader4Fill } from 'react-icons/ri';

import classNames from 'classnames/bind';
import style from './Search.module.scss';

const cx = classNames.bind(style);

function Search() {
    const [searchResult, setSearchResult] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);

    const inputRef = useRef();
    const debounceValue = useDebounce(searchValue, 300);

    useEffect(() => {
        if (!debounceValue) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchService.search(debounceValue);
            setSearchResult(result);
            setLoading(false);
        };
        fetchApi();
    }, [debounceValue]);

    const handleClear = () => {
        setSearchValue('');
        inputRef.current.focus();
        setSearchResult([]);
    };

    const handleHideResult = () => {
        setShowResult(false);
    };

    return (
        <div>
            <HeadlessTippy
                visible={showResult && searchResult.length > 0}
                // visible
                interactive
                appendTo={() => document.body}
                render={(attrs) => (
                    <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                        <PopperWrapper>
                            {searchResult.map((result) => (
                                <ProductItem key={result.id} data={result} />
                            ))}
                        </PopperWrapper>
                    </div>
                )}
                onClickOutside={handleHideResult}
            >
                <div className={cx('search')}>
                    <input
                        ref={inputRef}
                        value={searchValue}
                        spellCheck={false}
                        onChange={(e) => {
                            setSearchValue(e.target.value.trimStart());
                        }}
                        placeholder="Search accouts and videos"
                        onFocus={() => setShowResult(true)}
                    />
                    {!!searchValue && !loading && (
                        <button className={cx('clear')} onClick={handleClear}>
                            <FaCircleXmark />
                        </button>
                    )}
                    {loading && <RiLoader4Fill className={cx('loading')} />}

                    <button className={cx('search-btn')} onMouseDown={(e) => e.preventDefault()}>
                        <IoSearchOutline />
                    </button>
                </div>
            </HeadlessTippy>
        </div>
    );
}

export default Search;
