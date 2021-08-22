
import Link from 'next/link'
import { useState } from 'react';
import LayoutBox from '../components/LayoutBox'
import Modal from '../components/Modal'

const HomeIndexPage = () => {
  const [state, setstate] = useState<number>(0);
  const testonClick = () => {
    const dlatl: number = state + 1
    setstate(dlatl);
    console.log(state, 'test')
  }
  const [showModal, setShowModal] = useState(false);

  return (<LayoutBox>
    <div>
      <Link href={`/inputword?id=${1}`}>
        <button>inputword1</button>
      </Link>
      <Link href={`/inputword?id=${2}`}>
        <button>inputword2</button>
      </Link>
      <Link href={`/inputword?id=${3}`}>
        <button>inputword3</button>
      </Link>
      <Link href="/matchcards">
        <button>matchcards</button>
      </Link>
      <Link href="/appp">
        <button>app</button>
      </Link>
      <Link href={`/wordlist`}>
        <button>wordlist</button>
      </Link>
    </div>
    <button onClick={() => setShowModal(true)}>Open Modal</button>

    <Modal
      title='타이틀'
      onClose={() => setShowModal(false)}
      show={showModal}
    >

    </Modal>
  </LayoutBox>)
}

export default HomeIndexPage
