
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
  const test = { name: 1 }
  return (<LayoutBox>
    <div>
      <Link href={`/inputword/${test}`}>
        <button>inputword</button>
      </Link>
      <Link href="/matchcards">
        <button>matchcards</button>
      </Link>
      <Link href="/appp">
        <button>app</button>
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
