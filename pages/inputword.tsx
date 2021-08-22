import { useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next'
import { WordData } from '../utils/word_data'
import { word, wordIdProps } from '../interfaces'
import Link from 'next/link'
import LayoutBox from '../components/LayoutBox';
import useLocalStorage from "react-use/lib/useLocalStorage";
import styled from 'styled-components'
import { useRouter } from "next/router";
import { v4 as uuidv4 } from 'uuid';

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

const NoteHeaderWrapper = styled.div`

    display: flex;
    justify-content: space-between;
    margin: 5px;
    margin-bottom:30px;
    &>.navigate{
        display: flex;
        flex-direction: row;
        &>div{
            height: 50%;
            margin: 5px;
            border-radius: 10px;
            border:1px solid black;
            display: flex;
            align-items: center
        }
    }
`



const InputWord = () => {
    const [wordIdList, setWordIdList] = useLocalStorage<wordIdProps[]>('wordIdList', [{ mainname: '', subname: '', uuid: '', editedDate: new Date() }])
    const [selectUuid, setSelectUuid] = useLocalStorage<string>(`select_uuid`)
    const [wordContainer, setWordContainer] = useLocalStorage<word[]>(`note_${selectUuid}`, []);

    const mymainname = wordIdList.find(note => note.uuid === selectUuid) !== undefined ? wordIdList.find(note => note.uuid === selectUuid).mainname : '';
    const mysubname = wordIdList.find(note => note.uuid === selectUuid) !== undefined ? wordIdList.find(note => note.uuid === selectUuid).subname : '';

    const onChangeTitle = ({ mainname, subname }) => {
        const result = wordIdList.filter(note => note.uuid !== selectUuid);
        const newNote: wordIdProps = { uuid: selectUuid, mainname, subname, editedDate: new Date() }
        setWordIdList([...result, newNote])
    }

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
        setWordContainer([...wordContainer, { index: i, after: '', before: '', isStar: false }])
    }

    const onChangeWord = (before: string, after: string, index: number) => {
        onChangeTitle({ mainname: mymainname, subname: mysubname })
        const isStar: boolean = wordContainer.find(container => container.index === index).isStar;
        var result = wordContainer.filter(container => container.index !== index);
        result = [...result, { index, after, before, isStar }]
        result = result.sort(function (a, b) {
            return a.index - b.index;
        });

        setWordContainer(result)
    }
    const returnWord = wordContainer.map((container, i) =>
    (
        <WordItemWrapper className="word_item" key={container.index}>
            <span>{i + 1}</span>
            {/* Star */}
            <input className="input" type="text" value={container.before} onChange={e => onChangeWord(e.target.value, container.after, container.index)} />
            <input className="input" type="text" value={container.after} onChange={e => onChangeWord(container.before, e.target.value, container.index)} />
            <button onClick={e => DeleteWord(container.index)}>x</button>
        </WordItemWrapper>
    )
    )
    return (
        <LayoutBox>
            <div className="note">
                <NoteHeaderWrapper>
                    <div>
                        <p>제목</p>
                        <input className="note_main_name" value={mymainname} onChange={(e) => onChangeTitle({ mainname: e.target.value, subname: mysubname })} />
                        <p>소제목</p>
                        <input className="note_sub_name" value={mysubname} onChange={(e) => onChangeTitle({ mainname: mymainname, subname: e.target.value })} />

                    </div>
                    <div className='navigate'>

                        <Link href={`/matchcards`}>
                            <div>카드 맞추기</div>
                        </Link>

                        <Link href={`/cardview`}>
                            <div>단어장 보기</div>
                        </Link>

                    </div>

                </NoteHeaderWrapper>
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



