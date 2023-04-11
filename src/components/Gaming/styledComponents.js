import styled from 'styled-components'

export const GamingContainer = styled.div`
  display: flex;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
`

export const GamingSubContainer = styled.div`
  display: flex;
`

export const GameItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`
