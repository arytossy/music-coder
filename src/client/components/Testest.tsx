import React from "react";
import useTreeState from "../hooks/useTreeState";

export default function Testest() {
  const hoge = useTreeState({name: "", age: 0});
  return (
    <div>
      <p>name: <input type="text" value={hoge.name} onChange={(e) => hoge.setName(e.target.value)} /></p>
      <p>age: <input type="number" value={hoge.age} onChange={(e) => hoge.setAge(parseInt(e.target.value))} /></p>
      <p>name: {hoge.name}</p>
      <p>age: {hoge.age}</p>
    </div>
  );
}