import React, { useState } from 'react'


import {
  Menu,
  Segment,
  Grid,
  Container,
} from 'semantic-ui-react'

import Transfer from './Transfer'
import WalletStake from './WalletStake'
import MNRVTip from './MNRVTip'
import StakingInfo from './StakingInfo'

function Main(props) {
  
  const [activeItem, setActiveItem] = useState('Stake')
  const onClickHandler = (data) => {
    setActiveItem(data.value)
  }


  return (
    <Segment>
      <Grid>
        <Grid.Row>
          <Menu pointing secondary vertical>
            <Menu.Item
              name='Stake'
              active={activeItem === 'Stake'} 
              onClick={ () => onClickHandler(({value: 'Stake'}))}
              />
            <Menu.Item
              name='Transfer'
              active={activeItem === 'Transfer'} 
              onClick={ () => onClickHandler(({value: 'Transfer'}))}
              />
            <Menu.Item
              name='Stake Info'
              active={activeItem === 'Stake Info'} 
              onClick={ () => onClickHandler(({value: 'Stake Info'}))}
              />
            <Menu.Item
              name='Tip'
              active={activeItem === 'Tip'} 
              onClick={ () => onClickHandler(({value: 'Tip'}))}
              />
          </Menu>
          <Container>
          {activeItem === 'Stake' ? <WalletStake /> : null}
          {activeItem === 'Transfer' ? <Transfer /> : null}
          {activeItem === 'Tip' ? <MNRVTip /> : null}
          {activeItem === 'Stake Info' ? <StakingInfo /> : null}
          </Container>
        </Grid.Row>
      </Grid>
    </Segment>
  )
}


export default function Navigation(props) {
  return <Main {...props} />
}