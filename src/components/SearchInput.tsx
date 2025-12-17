'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './SearchInput.module.css';

interface SearchInputProps {
    defaultValue?: string;
}

export default function SearchInput({ defaultValue = '' }: SearchInputProps) {
    const [keyword, setKeyword] = useState(defaultValue);
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!keyword.trim()) return;

        router.push(`/search?q=${encodeURIComponent(keyword)}`);
    };

    return (
        <form onSubmit={handleSearch} className={styles.searchBox}>
            <input 
                type="text" 
                placeholder="어디로 떠나고 싶으신가요?"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={styles.input}
            />
            <button type="submit" className={styles.button}>검색</button>
        </form>
    );
}