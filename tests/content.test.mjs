import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { chapters } from "../src/content.js";
import { labMeta, newState, renderLab, updateLab } from "../src/labs.js";

test("两个卷册完整覆盖 24 个不同章节",()=>{
  assert.equal(chapters.length,24);
  assert.equal(new Set(chapters.map(c=>c.title)).size,24);
  assert.ok(chapters.every(c=>typeof c.summary==="string"&&c.summary.length>8));
});

test("每章都提供原创讲解、要点、代码、误区和有效测验",()=>{
  for(const [i,c] of chapters.entries()){
    assert.ok(c.concept.length>55,"第"+(i+1)+"章概念过短");
    assert.ok(c.points.length>=3,"第"+(i+1)+"章知识点不足");
    assert.ok(c.pitfalls.length>=2,"第"+(i+1)+"章误区不足");
    assert.ok(c.code.length>35,"第"+(i+1)+"章缺少代码");
    assert.ok(c.quiz.choices.length>=3,"第"+(i+1)+"章测验不足");
    assert.ok(Number.isInteger(c.quiz.answer)&&c.quiz.answer>=0&&c.quiz.answer<c.quiz.choices.length,"第"+(i+1)+"章无效答案索引");
    assert.ok(c.quiz.why.length>8,"第"+(i+1)+"章没有解题说明");
  }
});
test("模拟器 ID、章节关联和初始状态正确",()=>{
  assert.equal(labMeta.length,7);
  assert.equal(new Set(labMeta.map(m=>m.id)).size,labMeta.length);
  const state=newState();
  for(const m of labMeta){
    assert.ok(Number.isInteger(m.chapter)&&m.chapter>=0&&m.chapter<24);
    assert.ok(typeof renderLab(m.id,state)==="string");
    assert.ok(renderLab(m.id,state).length>60);
  }
});
test("数组引用共享模型只更新选中的元素",()=>{
  const next=updateLab(newState(),"reference","next");
  assert.deepEqual(next.reference,[10,30,30]);
  assert.deepEqual(updateLab(next,"reference","reset").reference,[10,20,30]);
});
test("HashMap 教学模型在插入第四个元素后按阈值扩容",()=>{
  let state=newState();
  for(let i=0;i<3;i++)state=updateLab(state,"hashmap","add");
  assert.match(renderLab("hashmap",state),/容量 <b>4<\/b>/);
  state=updateLab(state,"hashmap","add");
  assert.match(renderLab("hashmap",state),/容量 <b>8<\/b>/);
  assert.equal(state.hashmap.length,4);
  state=updateLab(state,"hashmap","reset");
  assert.equal(state.hashmap.length,0);
});
test("线程、对象可达性、Stream 模型不会越过最后一步",()=>{
  for(const [id,steps,key] of [["memory",5,"memory"],["stream",3,"stream"],["thread",4,"thread"],["race",6,"race"]]){
    let state=newState();
    for(let i=0;i<steps+4;i++)state=updateLab(state,id,"next");
    assert.equal(state[key],steps,id+" should clamp at final step");
  }
});
test("源页面包含模块入口，浅色样式无旧深色主题",()=>{
  const html=readFileSync(new URL("../index.html",import.meta.url),"utf8");
  const css=readFileSync(new URL("../src/style.css",import.meta.url),"utf8");
  assert.match(html,/type="module" src="\.\/src\/app\.js"/);
  assert.match(css,/--sidebar:#f7f7f5/);
  assert.ok(!html.includes('theme-color" content="#101827"'));
});
