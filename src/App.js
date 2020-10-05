import React from 'react';
import BlockResult from './components/BlockResult';
import BlockControl from './components/BlockControl';
import classes from './App.module.css';

function App() {
  return (
    <section className={classes.wrapper}>
      <BlockResult />
      <BlockControl />
    </section>
  );
}

export default App;
