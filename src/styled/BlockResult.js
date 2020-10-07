import styled from 'styled-components';
export const Content = styled.div`
  border-left: 1px solid gray;
  border-right: 1px solid gray;
  border-top: 1px solid gray;
  border-radius: 5px 5px 0 0;
  width: 90%;
  margin: 0 auto;
`;
export const ContentTitle = styled.div`
  display: flex;
  justify-content: space-around;
  border-bottom: 4px solid gray;
  font-weight: 600;
`;
export const ContentTitleItem = styled.div`
  width: 33.333333333%;
  text-align: center;
  border-right: 1px solid gray;
  &:last-child {
    border-right: none;
  }
`;
export const TransictionList = styled.div`
  max-height: 210px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;
export const TransictionItem = styled.div`
  display: flex;
  justify-content: space-around;
`;
export const TransictionItemData = styled.div`
  width: 33.333333333%;
  text-align: center;
  &:last-child {
    border-right: none;
  }
`;
export const Result = styled.div`
  text-align: right;
  padding-right: 5px;
  border-top: 1px solid gray;
  span {
    font-weight: 600;
  }
`;