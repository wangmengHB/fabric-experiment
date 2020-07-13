import {PieceTreeTextBufferBuilder, DefaultEndOfLine } from './index';


const pieceTreeTextBufferBuilder = new PieceTreeTextBufferBuilder();
pieceTreeTextBufferBuilder.acceptChunk('第1个buffer，1个换行\n abc');
pieceTreeTextBufferBuilder.acceptChunk('第2个buffer，1个换行\n abc');
pieceTreeTextBufferBuilder.acceptChunk('第3个buffer，1个换行\n abc');
pieceTreeTextBufferBuilder.acceptChunk('第4个buffer，1个换行\n abc');
pieceTreeTextBufferBuilder.acceptChunk('第5个buffer，1个换行\n abc');
pieceTreeTextBufferBuilder.acceptChunk('第6个buffer，1个换行\n abc');
pieceTreeTextBufferBuilder.acceptChunk('第7个buffer，1个换行\n abc');
pieceTreeTextBufferBuilder.acceptChunk('第8个buffer，1个换行\n abc');
pieceTreeTextBufferBuilder.acceptChunk('第9个buffer，1个换行\n abc');

const pieceTreeFactory = pieceTreeTextBufferBuilder.finish(true);


const pieceTree = pieceTreeFactory.create(DefaultEndOfLine.LF);



(window as any).pieceTreeTextBufferBuilder = pieceTreeTextBufferBuilder;
(window as any).pieceTreeFactory = pieceTreeFactory;
(window as any).pieceTree = pieceTree;


(window as any).root = pieceTree.root;

debugger;
pieceTree.insert(3, '+insert');


(window as any).prevNode1 = pieceTree.root.prev();

(window as any).prevNode2 = (window as any).prevNode1.prev();

(window as any).prevNode3 = (window as any).prevNode2.prev();

(window as any).prevNode4 = (window as any).prevNode3.prev();
(window as any).prevNode5 = (window as any).prevNode4.prev();
(window as any).prevNode6 = (window as any).prevNode5.prev();
(window as any).prevNode7 = (window as any).prevNode6.prev();

console.log((window as any).prevNode7.piece);
console.log((window as any).prevNode6.piece);
console.log((window as any).prevNode5.piece);
console.log((window as any).prevNode4.piece);
console.log((window as any).prevNode3.piece);
console.log((window as any).prevNode2.piece);
console.log((window as any).prevNode1.piece);
console.log('root');
console.log((window as any).root.piece);




(window as any).nextNode1 = pieceTree.root.next();
(window as any).nextNode2 = (window as any).nextNode1.next();
(window as any).nextNode3 = (window as any).nextNode2.next();
(window as any).nextNode4 = (window as any).nextNode3.next();
(window as any).nextNode5 = (window as any).nextNode4.next();
(window as any).nextNode6 = (window as any).nextNode5.next();
(window as any).nextNode7 = (window as any).nextNode6.next();

console.log((window as any).nextNode1.piece);
console.log((window as any).nextNode2.piece);
console.log((window as any).nextNode3.piece);
console.log((window as any).nextNode4.piece);
console.log((window as any).nextNode5.piece);
console.log((window as any).nextNode6.piece);
console.log((window as any).nextNode7.piece);















// pieceTree.getLineCount(); // 2
// debugger;
// pieceTree.getLineContent(4); // 'abc'
// pieceTree.getLineContent(2); // 'def'


// pieceTree.getLineCount(); // 2
// pieceTree.getLineContent(1); // 'a+bc'
// pieceTree.getLineContent(2); // 'def'