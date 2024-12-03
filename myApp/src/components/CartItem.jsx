import React from 'react';
import { ChevronDown,ChevronUp} from '../icons';


const CartItem = ({id,title,img,price,amount}) => {
  return (
    <article className='cart-item'>
      <img src={img} alt={title} />
      <div className="">
        <h4>{title}</h4>
        <h4 className='item-price'>${price}</h4>
        <button className='remove-btn'>remove</button>
      </div>
    </article>
  )
}

export default CartItem
