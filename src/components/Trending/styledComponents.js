import styled from 'styled-components'

export const TrendingContainer = styled.div`
  display: flex;
  background-color: ${props => (props.darkTheme ? '#0f0f0f' : '#f9f9f9')};
`

export const TrendingSubContainer = styled.div`
  display: flex;
`

export const VideoItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
`
