import React from 'react';
import { ChevronDown,ChevronUp} from '../icons';
import { removeItem ,increase,decrease} from '../redux/features/cart/cartSlice';
import {useDispatch} from 'react-redux'

const CartItem = ({id,title,img,price,amount}) => {
  const dispatch = useDispatch();

  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div className="">
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn' onClick={()=>dispatch(removeItem(id))}>remove</button>
      </div>
      <div className="">
      <button className='amount-btn' onClick={()=>dispatch(increase(id))}> 
        {/* //if not destructured,you have to pass it normal */}
          <ChevronUp/>
        </button>
        <p className='amount'>{amount}</p>
        <button className='amount-btn' onClick={()=>{
          if(amount ===1){
            dispatch(removeItem(id));
            return;
          }
          dispatch(decrease({id}))}} 
          > 
          {/* //if destructured,you have to pass it as an object */}
          <ChevronDown/>
        </button>
        
        
      </div>
    </article>
  )
}

export default CartItem
