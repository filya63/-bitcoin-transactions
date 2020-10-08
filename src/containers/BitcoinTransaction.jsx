import React, { useState } from "react";
import BlockResult from "../components/BlockResult";
import BlockControl from "../components/BlockControl";
import { Wrapper } from "../styled/Wrapper";

const BitcoinTransaction = () => {
  const [result, setResult] = useState(0);
  const [transictions, setTransictions] = useState([]);
  const [sub, setSub] = useState(false);

  const socket = new WebSocket("wss://ws.blockchain.info/inv"); // открываем соединение
  socket.onopen = function () {
    socket.send(JSON.stringify({ op: "unconfirmed_sub" })); // отправляем серверу данные в json формате, на что подписываемся
  };

  const closeConnect = (socket) => {
    socket.onclose = function (event) {
      if(event.wasClean) {
        console.log('Соединение закрыто')
        socket.send(JSON.stringify({ op: "unconfirmed_unsub" })); // отправляем на сервер данные об отписке
        console.log('Данные об отмене отправлены');
      } else {
        console.log('Соединение прервано');
      }
    };
    socket.close(1000); // закрываем подключение к серверу
  }

  const subscribe = () => {
    socket.onmessage = function (event) {
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
    setSub(() => {
      return true;
    });
  };

  const stopping = () => {
    closeConnect(socket);
    setSub(() => {
      return false;
    });
  };

  const drop = () => {
    closeConnect(socket);
    setTransictions(() => {
      return [];
    });
    setResult(() => {
      return 0;
    });
  };
  
  return (
    <Wrapper>
      <BlockResult transictions={transictions} result={result} />
      <BlockControl subscribe={subscribe} stop={stopping} drop={drop} />
    </Wrapper>
  );
};

export default BitcoinTransaction;