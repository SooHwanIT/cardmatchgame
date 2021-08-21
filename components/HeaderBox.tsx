
import styled from 'styled-components'

import Link from 'next/link'
const HeaderBoxWrapper = styled.div`
background-color: #8A2Be2;

position: relative;
display: flex ;
justify-content: space-between;
border-bottom: 5px solid black;
`
const HeaderContentBoxWrapper = styled.div`
background-color: #cdb5e4;
position: relative;
display: flex ;
margin-left: 10px;
margin-right: 10px;
&>p{
        margin-left: 10px;
        margin-right: 10px;
    }
`

const HeaderBox = () => {
    return (
        <HeaderBoxWrapper>
            <HeaderContentBoxWrapper>
                <p>logo</p>
                <Link href="/" >
                    <div>
                        <p>gotoHome</p>
                    </div>
                </Link>
                <Link href="/list" >
                    <div>
                        <p>gotoList</p>

                    </div>
                </Link>
                <p>makenote</p>
            </HeaderContentBoxWrapper>
            <HeaderContentBoxWrapper>
                <p>user</p>
            </HeaderContentBoxWrapper>
        </HeaderBoxWrapper >
    )
}
export default HeaderBox;