"use client";
import style from "./search.module.scss";
import React, { useState, useMemo } from "react";

const Highlighter = () => {

    const [sourceText, setSourceText] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [caseSensitive, setCaseSensitive] = useState(false);

    const highlightedText = useMemo(() => {
        if (!searchTerm) return sourceText;

        const flags = caseSensitive ? 'g' : 'gi';
        const regex = new RegExp(`(${searchTerm})`, flags);
        return sourceText.replace(regex, (match) => `<mark>${match}</mark>`);
    }, [sourceText, searchTerm, caseSensitive]);

    return (
        <>
            <div className={style.page_functionality}>

                <h1 className={style.page_title}>
                    Search functionnality
                </h1>

                <div className={style.search_container}>
                    <textarea className={style.input_source_text}
                        data-testid="source-text"
                        value={sourceText}
                        onChange={(e) => setSourceText(e.target.value)}
                        placeholder="Your text in which search"
                    />

                    <input className={style.input_search_term}
                        data-testid="search-term"
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Word search"
                    />

                    <label>
                        <input
                            className={style.sensitive_box}
                            data-testid="case-sensitive"
                            type="checkbox"
                            checked={caseSensitive}
                            onChange={(e) => setCaseSensitive(e.target.checked)}
                        />
                        Case Sensitive
                    </label>
                    <div
                        data-testid="result"
                        className="result"
                        dangerouslySetInnerHTML={{ __html: highlightedText }}
                    />
                </div>
            </div>
        </>
    );
};

export default Highlighter;