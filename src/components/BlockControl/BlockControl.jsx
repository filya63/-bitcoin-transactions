import React from 'react';
import {ControlPanelBtn, ControlPanel} from '../../styled/BlockControl';

const BlockControl = (props) => {
    return (
        <ControlPanel>
            <ControlPanelBtn onClick={props.subscribe}>Запуск</ControlPanelBtn>
            <ControlPanelBtn onClick={props.stop}>Остановка</ControlPanelBtn>
            <ControlPanelBtn onClick={props.drop}>Сброс</ControlPanelBtn>
        </ControlPanel>
    )
}

export default BlockControl;