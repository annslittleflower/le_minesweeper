import { useState } from 'react'
import Modal from "./components/Modal/Modal";

/*
  TODO

  possible general app state

  START (here we have form to enter rows number, cols number, mines number) (localstorage this setup)

  GAME_IS_ON (render board with cells) (on every move localstorage this setup)

*/

const App = () => {
  const [isModalOpened, setIsModalOpened ] = useState(false)
  return (
    <div>
      <button onClick={() => setIsModalOpened(true)}>OPEN ME</button>
      <div style={{ width: 2000}}>
        hello
      </div>
      <Modal isOpened={isModalOpened} onClose={() => setIsModalOpened(false)}>
        <p>heee</p>
        <p>heee</p>
        <p onClick={() => console.log('hello')}>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
        <p>heee</p>
      </Modal>
    </div>
  );
}

export default App;
