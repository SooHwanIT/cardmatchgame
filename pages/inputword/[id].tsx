import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next'
import { WordData } from '../../utils/word_data'
import { word } from '../../interfaces'
import Link from 'next/link'
import LayoutBox from '../../components/LayoutBox';
import useLocalStorage from "../../components/useLocalStorage";
import styled from 'styled-components'

const WordItemWrapper = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    margin: 5px;
    padding: 10px;
    & > input {
        margin : 10px;
        border: 0px solid black;
        border-bottom: 1px solid black;
    }
    &>span{
        margin : 10px;
    }
`

const AddWordItemWrapper = styled.div`
    border: 1px solid black;
    margin: 5px;

    display: flex;
    justify-content: center;

`




const InputWord = () => {

    const [wordContainer, setWordContainer] = useLocalStorage('words', [{}]);


    const DeleteWord = (i: number) => {
        const result = wordContainer.filter(container => container.index !== i);
        setWordContainer(result)
    }
    const AddWord = () => {
        var i = 1;
        while (true) {
            if (wordContainer.find(note => note.index === i) === undefined) {
                break;
            }
            i++
        }
        setWordContainer([...wordContainer, { index: i, after: '', before: '' }])
    }
    const onChangeWord = (before: string, after: string, index: number) => {
        var result = wordContainer.filter(container => container.index !== index);

        result = [...result, { index, after, before }]
        result = result.sort(function (a, b) {
            return a.index - b.index;
        });

        setWordContainer(result)
    }
    const returnWord = wordContainer.map((container, i) =>
    (
        <WordItemWrapper className="word_item" key={container.index}>
            <span>{i + 1}</span>
            <input className="input" type="text" value={container.before} onChange={e => onChangeWord(e.target.value, container.after, container.index)} />
            <input className="input" type="text" value={container.after} onChange={e => onChangeWord(container.before, e.target.value, container.index)} />
            <button onClick={e => DeleteWord(container.index)}>x</button>
        </WordItemWrapper>
    )
    )
    return (
        <LayoutBox>
            <div className="note">
                <div>
                    <p>제목</p>
                    <input className="note_main_name" />
                    <p>소제목</p>
                    <input className="note_sub_name" />

                    <Link href="/matchcards">
                        <button>next</button>
                    </Link>

                </div>
                <div className="word_list">
                    {returnWord}
                </div>
                <div className="add_word">
                    <AddWordItemWrapper onClick={AddWord}>단어 추가하기</AddWordItemWrapper>
                </div>

            </div>
        </LayoutBox>
    );
}

export default InputWord;



