import React, { useEffect, useState } from "react";
import BlockResult from "../components/BlockResult";
import BlockControl from "../components/BlockControl";
import { Wrapper } from "../styled/Wrapper";

const BitcoinTransaction = () => {
  const [result, setResult] = useState(0);
  const [transictions, setTransictions] = useState([]);
  const [sub, setSub] = useState(false);
  const subscribe = () => {
    console.log('Подписались на получение транзакций')
    setSub(() => {
      return true;
    });
  };
  const stopping = () => {
    console.log('Получение данных приостановлено')
    setSub(() => {
      return false;
    });
  };
  const drop = () => {
    console.log("Все данные удалены");
    setTransictions(() => {
      return [];
    });
    setResult(() => {
      return 0;
    });
  };
  useEffect(() => {
    console.log(`Подписка: ${sub}`);
    const socet = new WebSocket("wss://ws.blockchain.info/inv");
    if (sub) {
      socet.onopen = function () {
        socet.send(JSON.stringify({ op: "unconfirmed_sub" })); // отправляем серверу данные в json формате, на что подписываемся
      };
      socet.onmessage = function (event) {
        // при получении нового меседжа
        const data = JSON.parse(event.data);
        const from = data.x.inputs[0].prev_out.addr; // от кого транзакция
        const sum = data.x.inputs[0].prev_out.value; // сумма
        const where = data.x.out[0].addr; // кому перевод
        setResult((prev) => {
          return prev + sum;
        });
        setTransictions((prev) => {
          return [...prev, { from, sum, where }];
        });
      };
    } else {
      socet.onmessage = function () {
        socet.send(JSON.stringify({ op: "unconfirmed_unsub" })); // отправляем на сервер данные об отписке
      };
      socet.close(); // закрываем подключение к серверу
    }
  });
  return (
    <Wrapper>
      <BlockResult transictions={transictions} result={result} />
      <BlockControl subscribe={subscribe} stop={stopping} drop={drop} />
    </Wrapper>
  );
};

export default BitcoinTransaction;