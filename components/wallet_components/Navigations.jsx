import React, { useState } from 'react'
import navstyles from '../../styles/navbar.module.css';
import styles from '@/styles/Home.module.css'

import {
  Menu,
  Segment,
  Grid,
  Container,
} from 'semantic-ui-react'

import Transfer from './Transfer'
import Stake from './Stake'
import MNRVTip from './MNRVTip'
import Delegations from './Delegations'


function Main(props) {
  const [activeItem, setActiveItem] = useState('Stake');

  const onClickHandler = (data) => {
    setActiveItem(data.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-700">
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
          </div>
          <div style={{ width: '1200px' }}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <button
                className={`${
                  activeItem === 'Stake'
                    ? 'bg-gray-500 text-white'
                    : 'bg-white border border-gray-300'
                } rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 dark:focus:ring-gray-700`}
                onClick={() => onClickHandler({ value: 'Stake' })}
              >
                Stake
              </button>
              <button
                className={`${
                  activeItem === 'Transfer'
                    ? 'bg-gray-500 text-white'
                    : 'bg-white border border-gray-300'
                } rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 dark:focus:ring-gray-700`}
                onClick={() => onClickHandler({ value: 'Transfer' })}
              >
                Transfer
              </button>
              <button
                className={`${
                  activeItem === 'Delegations'
                    ? 'bg-gray-700 text-white'
                    : 'bg-white border border-gray-300'
                } rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600`}
                onClick={() => onClickHandler({ value: 'Delegations' })}
              >
                Delegations
              </button>
              <button
                className={`${
                  activeItem === 'Tip'
                    ? 'bg-gray-500 text-white'
                    : 'bg-white border border-gray-300'
                } rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 dark:focus:ring-gray-700`}
                onClick={() => onClickHandler({ value: 'Tip' })}
              >
                Tip
              </button>
            </div>
          </div>
          <div className="mt-10" style={{ width: '600px' }}>
            {activeItem === 'Stake' ? <Stake /> : null}
            {activeItem === 'Transfer' ? <Transfer /> : null}
            {activeItem === 'Tip' ? <MNRVTip /> : null}
            {activeItem === 'Delegations' ? <Delegations /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}



export default function Navigation(props) {
  return <Main {...props} />
}
