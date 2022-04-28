import React, {useState} from "react";
import './style.css'
import {createStore} from 'redux'
import {Provider, useSelector, useDispatch, Connect} from "react-redux";

function Left1(props) {
    return (
        <div>
            <h1>Left1: {props.number}</h1>
            <Left2 number={props.number}/>
        </div>
    );
}

function Left2(props) {
    return (
        <div>
            <h1>Left2: {props.number}</h1>
            <Left3 number={props.number}/>
        </div>
    );
}

function Left3(props) {
    return (
        <div>
            <h1>Left3: {props.number}</h1>
        </div>
    );
}

function Right1(props) {
    return (
        <div>
            <h1>Right1</h1>
            <Right2
                onIncrease={() => {
                    props.onIncrease();
                }}
                onDecrease={()=>{
                    props.onDecrease();
                }}
            />
        </div>
    );
}

function Right2(props) {
    return (
        <div>
            <h1>Right2</h1>
            <Right3
                onIncrease={() => {
                    props.onIncrease();
                }}
                onDecrease={()=>{
                    props.onDecrease();
                }}
            />
        </div>
    );
}

function Right3(props) {
    return (
        <div>
            <h1>Right3
                <input
                    type={'button'}
                    value={'+'}
                    onClick={() => {
                        props.onIncrease();
                    }}/>
                <input
                    type={'button'}
                    value={'-'}
                    onClick={() => {
                        props.onDecrease();
                    }}/>
            </h1>
        </div>
    );
}

function reducer(currentState, action) {
    if (currentState === undefined) {
        return {
            number: 1
        }
    }
    const newState = {...currentState};
    if (action.type === 'PLUS') {
        newState.number++;
    } else if (action.type === 'MINUS') {
        newState.number--;
    }
    return newState
}
const store = createStore(reducer);
export default function App() {
    const [number, setNumber] = useState(1);
    return (
        <div id="container">
            <h1>previous Root = without REDUX: {number}</h1>
            <div className={'grid'}>
                <Left1 number={number}></Left1>
                <Right1
                    onIncrease={() => {
                        setNumber(number + 1);
                    }}
                    onDecrease={()=>{
                        setNumber(number - 1);
                    }}
                />
            </div>

            <h1>Root by using REDUX</h1>
            <div className={'grid'}>
                <Provider store={store}>
                    <L1/>
                    <R1/>
                </Provider>
            </div>
        </div>
    );
}

function L1() {
    console.log('L1')
    return (
        <div>
            <h3>L1</h3>
            <L2/>
        </div>
    );
}

function L2() {
    console.log('L2')
    return (
        <div>
            <h3>L2</h3>
            <L3/>
        </div>
    );
}

function L3() {
    console.log('L3')
    const number = useSelector((state)=>state.number);
    return (
        <div>
            <h3>L3: {number}</h3>
        </div>
    );
}

function R1() {
    console.log('R1')
    return (
        <div>
            <h3>R1</h3>
            <R2/>
        </div>
    );
}

function R2() {
    console.log('R2')
    return (
        <div>
            <h3>R2</h3>
            <R3/>
        </div>
    );
}

function R3() {
    console.log('R3')
    const dispatch = useDispatch();
    return (
        <div>
            <h3>R3
                <input
                    type={'button'}
                    value={'+'}
                    onClick={() => {
                        dispatch({type: 'PLUS'});
                    }}/>
                <input
                    type={'button'}
                    value={'-'}
                    onClick={() => {
                        dispatch({type: 'MINUS'});
                    }}/>
            </h3>
        </div>
    );
}