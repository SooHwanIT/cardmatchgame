import useLocalStorage from "react-use/lib/useLocalStorage";
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid';
import { useState } from 'react';
import { wordIdProps } from '../interfaces'
import LayoutBox from './../components/LayoutBox';

import styled from 'styled-components'
// Usage
const WordListWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-flow: column;
    width: 450px;
    
`
const WordListItemWrapper = styled.div`
    border: 1px solid black;
    border-radius: 10px;
    margin: 10px;
    display: flex;
    justify-content: space-between;
    & > div:not(:last-child){
        width: 100%;
        padding: 10px;
        & > .top-bar{
            
            display: flex;
            justify-content: space-between;
            
            border-bottom: 1px solid black;
            padding: 1px;
        }
    }   
    & > .delbutton{
        position: relative;
        
        padding: 10px;
        border-left: 1px solid black;

    }
`
function wordlist() {
    // Similar to useState but first arg is key to the value in local storage.
    const [wordIdList, setWordIdList] = useLocalStorage<wordIdProps[]>('wordIdList', [])
    const [selectUuid, setSelectUuid] = useLocalStorage(`select_uuid`)


    const addWordId = () => {
        const date = new Date();
        const newId = { uuid: uuidv4(), mainname: '새로운 단어장', subname: '', editedDate: date }
        setWordIdList([...wordIdList, newId])

    }
    const delWordID = (id) => {
        const result = wordIdList.filter(container => container !== id);
        localStorage.removeItem(`note_${id}`)
        setWordIdList(result)
    }

    const TimeBefore = (props) => {
        //현재시간
        var now = new Date();
        var writeDay: Date = new Date(props.date);
        //글쓴 시간 
        var minus;
        if (now.getFullYear() > writeDay.getFullYear()) {
            minus = now.getFullYear() - writeDay.getFullYear();
            return (<div> {minus} 년 전</div>);

        } else if (now.getMonth() > writeDay.getMonth()) {
            minus = now.getMonth() - writeDay.getMonth();
            return (<div> {minus} 달 전</div>);
        } else if (now.getDate() > writeDay.getDate()) {
            minus = now.getDate() - writeDay.getDate();
            return (<div> {minus} 일 전</div>);
        } else if (now.getDate() == writeDay.getDate()) {
            var nowTime = now.getTime();
            var writeTime = writeDay.getTime();
            if (nowTime > writeTime) {
                var sec: number = parseInt((nowTime - writeTime).toString()) / 1000;
                var day: number = parseInt((sec / 60 / 60 / 24).toString());
                var sec: number = (sec - (day * 60 * 60 * 24));
                var hour: number = parseInt((sec / 60 / 60).toString());
                sec = (sec - (hour * 60 * 60));
                var min: number = parseInt((sec / 60).toString());
                sec = parseInt((sec - (min * 60)).toString());
                if (hour > 0) {
                    return (<div> {hour} 시간 전</div>);
                } else if (min > 0) {
                    return (<div> {min} 분 전</div>);
                } else if (sec > 0) {
                    return (<div> {sec} 초 전</div>);
                }
            }
        }
        return <div>방금전</div>;
    }
    return (
        <LayoutBox>
            <WordListWrapper>
                <button onClick={addWordId}>단어장 추가하기</button>

                {wordIdList.map(note =>
                    <WordListItemWrapper key={note.uuid}>
                        <Link href={`/inputword`} >
                            <div onClick={() => setSelectUuid(note.uuid)}>

                                <div className='top-bar'>
                                    <div>{note.mainname}</div>
                                    {/* <div>{() => timeBefore(note.editedDate)} </div> */}
                                    <TimeBefore date={note.editedDate}> </TimeBefore>
                                </div>
                                <div>{note.subname}</div>
                            </div>
                        </Link>
                        <div className='delbutton' onClick={() => delWordID(note)}>X</div>
                    </WordListItemWrapper>
                )
                }

            </WordListWrapper>

        </LayoutBox>
    );
}
export default wordlist;