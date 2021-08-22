
import useLocalStorage from "react-use/lib/useLocalStorage";
import { useRouter } from "next/router";
import { word, wordIdProps } from '../interfaces'
import { useState, useEffect } from 'react';
import LayoutBox from './../components/LayoutBox';
import styled from 'styled-components'


const CardViewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid black;
    border-radius: 10px;
    width: 500px;
    height: 400px;
    margin: 10px;
    padding: 10px;
    
`
const CountButtonWrapper = styled.div`
 display: flex;
    justify-content: center;
`
const CardView = () => {
    const [selectUuid, setSelectUuid] = useLocalStorage<string>(`select_uuid`)
    const [allDackList, setAllDackList] = useLocalStorage<word[]>(`note_${selectUuid}`, [])
    const [count, setCount] = useState<number>(0)
    const [selectCard, setSelectCard] = useState<word>({ before: '', after: '', isStar: false })
    const [isShow, setIsShow] = useState<boolean>(false)
    useEffect(() => {
        setSelectCard(allDackList.find((e, i) => i === count))
        console.log
    });

    const changeWordCount = () => {
        setIsShow(false)
        setSelectCard(allDackList.find((e, i) => i === count))
    }
    const countUp = () => {
        if (count < allDackList.length - 1) {
            setCount(count + 1)
            changeWordCount()
        }
    }

    const countDown = () => {
        if (count > 0) {
            setCount(count - 1)
            changeWordCount()
        }
    }

    const changeIsShow = () => {
        if (isShow === true) {
            setIsShow(false)
        } else {
            setIsShow(true)
        }
    }
    return (
        <LayoutBox>
            <CardViewWrapper>
                {count + 1} / {allDackList.length}
                <CardWrapper onClick={changeIsShow}>

                    {isShow ?
                        selectCard.after :
                        selectCard.before}


                </CardWrapper>
                <CountButtonWrapper>
                    <button onClick={countDown}>이전단어 보기</button>
                    <button onClick={countUp}>다음단어 보기</button>
                </CountButtonWrapper>
            </CardViewWrapper>
        </LayoutBox>
    )
}
export default CardView;