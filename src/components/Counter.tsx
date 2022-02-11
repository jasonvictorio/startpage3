import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'

import { decrement, increment, incrementByAmount, incrementAsync, selectCount } from '../store/counter'

export default () => {
  const count = useSelector(selectCount)
  const dispatch = useDispatch()
  const [incrementAmount, setIncrementAmount] = useState('2')

  return (
    <div>
      <div>
        <Button aria-label='Increment value' onClick={() => dispatch(increment())}>
          +
        </Button>
        <span> {count}</span>
        <button aria-label='Decrement value' onClick={() => dispatch(decrement())}>
          -
        </button>
      </div>
      <div>
        <input
          aria-label='Set increment amount'
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>Add Amount</button>
        <button onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>Add Async</button>
      </div>
    </div>
  )
}
