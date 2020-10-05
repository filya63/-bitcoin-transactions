import React, {useEffect, useState} from "react";
import classes from "./BlockResult.module.css";

const BlockResult = () => {
  const state = {
    result: 1054320
  };
  const [transictions, setTransictions] = useState([]);
  useEffect(() => {
    const socet = new WebSocket("wss://ws.blockchain.info/inv");
    socet.onopen = function () {
      socet.send(JSON.stringify({ op: "unconfirmed_sub" })); // отправляем серверу данные в json формате, на что подписываемся
    };
    socet.onmessage = function (response) { // при получении нового меседжа
      const data = JSON.parse(response.data);
      const from = data.x.inputs[0].prev_out.addr; // от кого транзакция
      const sum = data.x.inputs[0].prev_out.value; // сумма
      const where = data.x.out[0].addr; // кому перевод
      const newPost = transictions.push({from, sum, where});
      setTransictions([...transictions, newPost]);
      console.log(transictions)
      /* console.log(`От кого: ${from}, кому: ${where} сумма: ${sum}`); */
    };
    
  });
  return (
    <div className={classes.content}>
      <div className={classes.contentTitle}>
        <div>От кого:</div>
        <div>Кому:</div>
        <div>Сумма:</div>
      </div>
      <div className={classes.transictionList}>
        {transictions.map((item, index) => {
          return (
            <div key={index} className={classes.transictionItem}>
              <div>{item.from}</div>
              <div>{item.where}</div>
              <div>{item.sum}</div>
            </div>
          );
        })}
      </div>
      <div className={classes.result}>
        <span>Сумма всех транзакций:</span> {state.result}
      </div>
    </div>
  );
};

export default BlockResult;