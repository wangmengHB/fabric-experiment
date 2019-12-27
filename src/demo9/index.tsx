import React from 'react';
import { List,AutoSizer,CellMeasurer, CellMeasurerCache} from 'react-virtualized';
import ReactDOM from 'react-dom';
const {loremIpsum} = require("lorem-ipsum");


const root = document.createElement('div');
document.body.appendChild(root);


const rowCount = 1000;
const list = Array(rowCount).fill(1).map(()=>{
  return loremIpsum({
      count: 1,
      units: 'sentences',
      sentenceLowerBound: 3,
      sentenceUpperBound: 3
    }).repeat(Math.ceil(Math.random() * 40));
});

(window as any)._list = list;









const cache = new CellMeasurerCache({ defaultHeight: 30,fixedWidth: true});

function cellRenderer ({ index, key, parent, style }) {
  console.log(index)

  return (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      parent={parent}
      rowIndex={index}
    >
      <div
        style={{...style, border: 'solid 1px red'}}
      >
        {list[index]}
      </div>
    </CellMeasurer>
  );
}




class TestList extends React.Component{
  render(){
    console.log('render');
    return (
      <div style={{width: 600, height: 600, background: 'grey'}}>
        <List
          height={600}
          rowCount={list.length}
          rowHeight={cache.rowHeight}
          deferredMeasurementCache={cache}
          rowRenderer={cellRenderer}
          width={600}
        /> 
      </div>
    );
  }
}


ReactDOM.render(
  <TestList />,
  root
)





