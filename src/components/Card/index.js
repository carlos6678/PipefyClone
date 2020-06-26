import React,{useRef,useContext} from 'react';
import {useDrag,useDrop} from 'react-dnd'
import { Container,Label } from './styles';
import BoardContenxt from '../Board/context'

function Card({content,labels,profile,index,listIndex}) {
  const ref = useRef()
  const {move} = useContext(BoardContenxt)
  const [{isDragging},dragRef] = useDrag({
    item:{ type:'CARD',index,listIndex},
    collect:monitor=>({
      isDragging:monitor.isDragging(),
    }),
  })

  const [, dropRef]=useDrop({
    accept:'CARD',
    hover(item,monitor){
      const draggedListIndex = item.listIndex
      const targetListIndex = listIndex

      const draggedIndex = item.index
      const targetIndex = index

      if(draggedIndex === targetIndex){
        return;
      }

      const targetSize = ref.current.getBoundingClientRect()
      const targetCenter = (targetSize.bottom - targetSize.top)/2

      const draggedOffset = monitor.getClientOffset()
      const draggedTop = draggedOffset.y - targetSize.top

      if(draggedIndex < targetIndex && draggedTop< targetCenter){
        return;
      }

      if(draggedIndex >targetIndex && draggedTop>targetCenter){
        return;
      }

      move(draggedListIndex,draggedIndex,targetIndex,targetListIndex)

      item.index=targetIndex
    }
  })

  dragRef(dropRef(ref))

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        <Label color={labels}/>
      </header>
      <p>
        {content}
      </p>
      {profile && (<img src={profile} alt="User"/>)}
    </Container>
  )
}

export default Card;