import React from 'react';

import { MdAdd } from 'react-icons/md'

import Card from '../Card'

import { Container } from './styles';

function List({title,data,index:listIndex}) {
  return (
    <Container done={data.done}>
      <header>
        <h2>{title}</h2>
        {data.creatable && (
          <button type="button">
            <MdAdd size={24} color="#fff"/>
          </button>
        )}
      </header>

      <ul>
        {data.cards.map((card,index)=>{
        return(
          <Card 
          key={card.id}
          listIndex={listIndex}
          index={index}
          content={card.content} 
          labels={card.labels} 
          profile={card.user} 
          done={card.done}/>
        )

})}
      </ul>
    </Container>
  )
}

export default List;