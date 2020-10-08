import React from "react";
import {
  Content,
  ContentTitle,
  ContentTitleItem,
  TransictionList,
  TransictionItem,
  TransictionItemData,
  Result,
} from "../../styled/BlockResult";

const BlockResult = (props) => {
  return (
    <Content>
      <ContentTitle>
        <ContentTitleItem>От кого:</ContentTitleItem>
        <ContentTitleItem>Кому:</ContentTitleItem>
        <ContentTitleItem>Сумма:</ContentTitleItem>
      </ContentTitle>
      <TransictionList>
        {props.transictions.map((item, index) => {
          return (
            <TransictionItem key={index}>
              <TransictionItemData>{item.from}</TransictionItemData>
              <TransictionItemData>{item.where}</TransictionItemData>
              <TransictionItemData>{item.sum}</TransictionItemData>
            </TransictionItem>
          );
        })}
      </TransictionList>
      <Result>
        <span>Сумма всех транзакций:</span> {props.result}
      </Result>
    </Content>
  );
};

export default BlockResult;
