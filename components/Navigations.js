import React, { useState } from 'react'
import navstyles from '../styles/navbar.module.css';
import styles from '@/styles/Home.module.css'

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
        <Grid.Row >
          <Menu pointing secondary vertical className={navstyles.nav}>
            <Menu.Item
              name='Stake'
              className={styles.card}
              active={activeItem === 'Stake'} 
              onClick={ () => onClickHandler(({value: 'Stake'}))}
              />
            <Menu.Item
              name='Transfer'
              className={styles.card}
              active={activeItem === 'Transfer'} 
              onClick={ () => onClickHandler(({value: 'Transfer'}))}
              />
            <Menu.Item
              name='Stake Info'
              className={styles.card}
              active={activeItem === 'Stake Info'} 
              onClick={ () => onClickHandler(({value: 'Stake Info'}))}
              />
            <Menu.Item
              name='Tip'
              className={styles.card}
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