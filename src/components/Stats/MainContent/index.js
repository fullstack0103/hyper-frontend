import React from 'react'
import { MainContentContainer } from './styles'
import { useWindowSize } from '../../../hooks/useWindowSize'
import StatsEventTable from '../../Shared/StatsEventTable'

export const MainContent = (props) => {
  const {
    isOpenRightMenu,
    tradeHistory,
    nftFiltered,
    users
  } = props
  
  const windowSize = useWindowSize()

  return (
    <MainContentContainer style={(windowSize.width < 800 && isOpenRightMenu) ? {display: 'none'} : {display: 'block'}}>
      <StatsEventTable eventList={tradeHistory} nftFiltered={nftFiltered} users={users}/>
    </MainContentContainer>
  )
}