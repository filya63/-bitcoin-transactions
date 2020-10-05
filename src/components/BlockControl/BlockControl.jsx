import React from 'react';
import classes from './BlockControl.module.css';

const BlockControl = () => {
    const state = {
        subscribe() {
            console.log('Вы подписались');
        },
        stop() {
            console.log('Отписались')
        },
        drop() {
            console.log('Все данные удалены')
        }
    }
    return (
        <div className={classes.BlockControl}>
            <button onClick={state.subscribe}>Запуск</button>
            <button onClick={state.stop}>Остановка</button>
            <button onClick={state.drop}>Сброс</button>
        </div>
    )
}

export default BlockControl;