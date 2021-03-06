import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Timer from 'react-compound-timer';
import LayoutBox from '../components/LayoutBox'
import ReactDOM from 'react-dom';
import Modal from '../components/Modal'
import Link from 'next/link'
import useLocalStorage from "react-use/lib/useLocalStorage";
import { useRouter } from "next/router";


interface IProps {
    opacity?: boolean;
    background?: string;
}
const CardWrapper = styled.div <IProps>`
border: 1px solid black;
border-radius: 5px;
display: flex ;
text-align: center;
height: 80%;
justify-content: center;
opacity: ${props => props.opacity ? 0 : 1};;
background-color: ${props => props.background};
 &:hover {
    border-bottom: 6px solid #CDB5E4;
  }
`

const DeckWrapper = styled.div`
display: grid ;

grid-template-columns: 240px 240px 240px ;
grid-template-rows: 190px 190px 190px 190px;
padding:10px;
border: 1px solid black;
`

const DisplayWrapper = styled.div`
width: 100%;
height: 100%;
display: flex ;
justify-content: center;
`
const MenuWrapper = styled.div`
border: 1px solid black;
width: 400px;
display: flex;
justify-content: center;
flex-direction: column;
align-items: center;
`

interface WordProps {
    index: number;
    before: string;
    after: string;
}
interface CardProps {
    title: string;
    cardValue: number;
    index?: number;
}
interface recordProps {
    time: number;
    round: number;
    dack: string[];
}
const WordPairing = () => {
    const [selecValue, setSelecValue] = useState<CardProps | null>(null)
    const [answerCard, setAnswerCard] = useState<number[]>([])
    const [wrongCard, setWrongCard] = useState<string[]>([])
    const [record, setRecord] = useState<recordProps[]>([])
    const [dack, setDack] = useState<CardProps[]>([])
    const [showModal, setShowModal] = useState(false);
    const [selectUuid, setSelectUuid] = useLocalStorage(`select_uuid`)
    const [allDackList, setAllDackList] = useLocalStorage(`note_${selectUuid}`, [])

    const Gamestart = () => {
        var range = allDackList.concat()

        while (range.length > 6) {
            range.splice(Math.floor(Math.random() * (range.length + 1)), 1);
        }

        var testarr: CardProps[] = range.map((card, i) => ({ cardValue: card.index, title: card.before, index: i }))
        testarr = [...testarr, ...range.map((card, i) => ({ cardValue: card.index, title: card.after, index: i + 6 }))]

        for (let i = 0; i < 1000; i++) {
            for (let i = testarr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [testarr[i], testarr[j]] = [testarr[j], testarr[i]];
            }
        }

        setDack(testarr);
    }

    useEffect(() => {
        console.log('asdfdddss')
        Gamestart();
        return () => {
            // Clean up the subscription
        };
    }, []);
    const Card: React.FC<CardProps> = ({ title, cardValue, index }) => {
        const onClickDiv = () => {
            if (selecValue === null) {
                setSelecValue({ title, cardValue, index })
            } else {
                if (selecValue.index === index) {
                    // console.log('????????????')
                } else if (selecValue.cardValue === cardValue) {
                    // console.log('??????')
                    setAnswerCard([...answerCard, selecValue.index, index])
                    // if (answerCard.length >= 10) {
                    //     console.log('??? ??????')
                    //     setAnswerCard([])
                    // }
                } else {
                    // console.log('??????')
                    setWrongCard([...wrongCard, selecValue.title, title])
                }
                setSelecValue(null)
            }
            // console.log('wrongCard:', wrongCard)
            // console.log('selecValue:', selecValue)
        }
        const answerClick = () => {

            // console.log('?????? ????????? ??????')
        }

        const dgcolor = (selecValue !== null && selecValue.index === index) ? '#ffa8b8' : 'white'
        const isopacity = (answerCard.find(word => word === index) !== undefined) ? true : false
        const isAnswer = (answerCard.find(word => word === index) !== undefined) ? answerClick : onClickDiv

        // if (answerCard.find(findex => findex !== index))
        return (
            <div>
                <CardWrapper onClick={isAnswer} background={dgcolor} opacity={isopacity}>
                    <p>{title}</p>
                </CardWrapper>
            </div>
        )
    }
    return (
        <LayoutBox>
            <Modal
                title='?????????'
                onClose={() => setShowModal(false)}
                show={showModal}
            >

            </Modal>
            <DisplayWrapper>
                <DeckWrapper>
                    {dack.map((card) => <Card title={card.title} cardValue={card.cardValue} index={card.index} key={card.index} />)}

                </DeckWrapper>
                <MenuWrapper>
                    <Timer
                        timeToUpdate={100}
                        lastUnit="m"
                    >
                        {({ start, resume, pause, stop, reset, getTimerState, getTime }) => {
                            const resetstate = () => {
                                setRecord([...record, { time: getTime(), dack: wrongCard, round: record.length + 1 }]);
                                setAnswerCard([])
                                setWrongCard([])
                                reset();
                                Gamestart();
                            }

                            // if (showModal === true) {
                            //     { stop() }
                            // } else {
                            //     { start() }
                            // }

                            return (
                                <React.Fragment>

                                    <div>
                                        ?????? :
                                        {answerCard.length >= 12 ? resetstate() : null}
                                        <Timer.Minutes />???
                                        <Timer.Seconds /> ???
                                        <Timer.Milliseconds /> ms
                                    </div>

                                </React.Fragment>
                            )
                        }}
                    </Timer>
                    <p>?????? ????????? : {record.length + 1}</p>
                    <p>?????? ?????? ?????? : {answerCard.length / 2} / 6</p>
                    <p>??????</p>
                    {record.map(record =>
                        <div key={record.round}>
                            <p>{record.round}??? : ????????????{Math.floor(record.time / 60000)}??? {Math.floor(record.time / 1000) % 60}???</p>
                            <p>{record.dack.length === 0 ? '???????????? ??????' : ('?????? ?????? :  ' + record.dack)}</p>

                        </div>
                    )}
                    {/* <button onClick={() => setShowModal(true)}>Open Modal</button>
                    <Link href="/inputword">
                        <button >Open Modal</button>
                    </Link> */}

                </MenuWrapper>
            </DisplayWrapper>
        </LayoutBox >
    )
}
export default WordPairing;
