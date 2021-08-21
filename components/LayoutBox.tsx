
import styled from 'styled-components'
import ContentBox from './ContentBox'
import HeaderBox from './HeaderBox'

const LayoutBoxWrapper = styled.div`
 height: 100%;
`

const LayoutBox = ({ children }) => {
    return (
        <LayoutBoxWrapper>
            {/* //     <HeaderBox /> */}
            <ContentBox>
                {children}
            </ContentBox>
        </LayoutBoxWrapper>
    )
}
// const LayoutBox = ({ children }) => {
//     return (
//         <LayoutBoxWrapper>
//             <HeaderBox />
//             <ContentBox>
//                 {children}
//             </ContentBox>
//         </LayoutBoxWrapper>
//     )
// }
export default LayoutBox;