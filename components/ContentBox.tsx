
import styled from 'styled-components'


import Link from 'next/link'
const ContentBoxWrapper = styled.div`
background-color: #ffffff;
margin: 10px;
/* border:1px solid black; */
height: 80%;
display: flex ;
justify-content: center;
/* align-items: center; */
`

const ContentBox = ({ children }) => {
    return (
        <ContentBoxWrapper>
            {children}
        </ContentBoxWrapper>
    )
}
export default ContentBox;