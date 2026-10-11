/* 所有模拟器为简化的教学模型，并非 JVM 运行时的实时可视化。 */
export const labMeta = [
  { id:"reference", icon:"◫", title:"数组与引用共享", category:"语言基础", chapter:2, desc:"两个引用指向同一个数组，修改元素究竟发生在哪里？" },
  { id:"memory", icon:"◇", title:"栈引用与堆对象", category:"对象模型", chapter:3, desc:"观察引用建立、解除与对象失去可达引用的过程。" },
  { id:"hashmap", icon:"#", title:"HashMap 桶与扩容", category:"集合框架", chapter:8, desc:"添加键，查看散列索引、碰撞和扩容后的桶分布。" },
  { id:"generics", icon:"〈〉", title:"泛型类型擦除", category:"类型系统", chapter:7, desc:"对照源代码的泛型信息与擦除后等效的概念形式。" },
  { id:"stream", icon:"⇢", title:"Stream 管道", category:"函数式编程", chapter:12, desc:"观察 source、filter、map、collect 各阶段的数据。" },
  { id:"race", icon:"⏱", title:"线程竞态与丢失更新", category:"并发编程", chapter:11, desc:"逐步交错两个线程的读取与写入，理解为什么 count++ 不原子。" },
  { id:"thread", icon:"◎", title:"线程状态机", category:"并发编程", chapter:11, desc:"查看 Thread.State 的典型状态和可能的转换路径。" }
];
export const newState = () => ({ reference:[10,20,30], memory:0, hashmap:[], generics:0, stream:0, race:0, raceAtomic:false, thread:0 });
const clamp=(n,a,b)=>Math.max(a,Math.min(b,n));
export function updateLab(state,id,action){
  const next={...state};
  if(id==="reference"){ next.reference= action==="reset" ? [10,20,30] : state.reference.map((n,i)=>i===1?n+10:n); }
  if(id==="memory"){ next.memory= action==="reset"?0:clamp(state.memory+1,0,5); }
  if(id==="hashmap"){
    if(action==="reset")next.hashmap=[];
    if(action==="add")next.hashmap=state.hashmap.length>=6?state.hashmap:[...state.hashmap,["Aa","BB","Java","Kotlin","Go","JS"][state.hashmap.length]];
  }
  if(id==="generics")next.generics=action==="reset"?0:1-state.generics;
  if(id==="stream")next.stream=action==="reset"?0:clamp(state.stream+1,0,3);
  if(id==="race"){
    if(action==="toggle"){next.raceAtomic=!state.raceAtomic;next.race=0;}
    else next.race=action==="reset"?0:clamp(state.race+1,0,6);
  }
  if(id==="thread")next.thread=action==="reset"?0:clamp(state.thread+1,0,4);
  return next;
}
function controls(id,disabled=false,extra="重置"){
  return '<div class="lab-actions"><button class="btn btn-primary" data-lab-action="next" data-lab="'+id+'" '+(disabled?'disabled':'')+'>下一步 <span aria-hidden="true">→</span></button><button class="btn btn-ghost" data-lab-action="reset" data-lab="'+id+'">'+extra+'</button></div>';
}
function segment(text,active=false,small=""){return '<div class="visual-node '+(active?'is-active':'')+'"><strong>'+text+'</strong>'+(small?'<small>'+small+'</small>':'')+'</div>'}
const notes=(s)=>'<p class="lab-note">'+s+'</p>';
const hash = (key) => {let h=0;for (let i=0;i<key.length;i++)h=(Math.imul(31,h)+key.charCodeAt(i))|0; return (h^(h>>>16))>>>0};
function hashmapLab(keys){
  const capacity=keys.length>3?8:4;
  const buckets=Array.from({length:capacity},()=>[]);
  for(const key of keys)buckets[hash(key)&(capacity-1)].push(key);
  const table=buckets.map((bucket,i)=>'<div class="bucket"><span class="bucket-id">'+String(i).padStart(2,"0")+'</span><div class="bucket-keys">'+(bucket.length?bucket.map(k=>'<span class="bucket-key">'+k+'</span>').join(''): '<span class="empty-key">空桶</span>')+'</div></div>').join("");
  return '<div class="lab-metrics"><span>容量 <b>'+capacity+'</b></span><span>元素 <b>'+keys.length+'</b></span><span>阈值 <b>'+Math.floor(capacity*.75)+'</b></span><span>碰撞 <b>'+buckets.reduce((n,b)=>n+Math.max(0,b.length-1),0)+'</b></span></div><div class="buckets">'+table+'</div>'+notes('教学模型：初始容量设置为 4（而非 HashMap 默认容量），超过 0.75 负载因子阈值后扩容到 8。采用 Java String.hashCode + HashMap 常用扰动/索引公式；不展示真实节点树化。')+controls("hashmap",keys.length===6,"清空");
}
function memoryLab(step){
  const messages=["刚创建 Person 对象，变量 a 指向该对象。","执行 Person b = a；两变量引用同一对象。","通过 b.name 修改对象属性；通过 a 也能观察到。","执行 a = null；仍然可以通过 b 访问对象。","执行 b = null；此模型里对象失去所有强引用。","对象已经不可达，具备被 GC 回收的条件，但 GC 何时发生不可预测。"];
  const reachable=step<4;
  return '<div class="memory-diagram"><div class="memory-col"><span class="diagram-heading">局部变量 / 栈帧概念</span>'+segment("a",step<3,step<3?"ref → #01":"null")+segment("b",step>0&&step<4,step===0?"尚未声明":step<4?"ref → #01":"null")+'</div><div class="memory-arrow">'+(reachable?"⟶":"···")+'</div><div class="memory-col"><span class="diagram-heading">堆对象概念</span>'+segment("Person #01",reachable,step<2?"name: Alice":step<4?"name: Bob":"不可达（非立即释放）")+'</div></div><p class="step-description">步骤 '+(step+1)+'/6：'+messages[step]+'</p>'+notes('图中用“栈/堆”解释引用关系，是常见教学抽象；JVM 优化可能改变物理分配方式。失去强引用不等于立即回收。')+controls("memory",step===5);
}
function raceLab(step,atomic){
  const trace=["初始 count = 0","线程 A 读取 count → 本地值 0","线程 B 读取 count → 本地值 0","线程 A 本地加一 → 1","线程 B 本地加一 → 1","线程 A 写回 → count = 1","线程 B 写回 → count = 1（覆盖 A 的更新）"];
  const value=atomic?Math.min(step,2):step<=4?0:1;
  const line=atomic?["初始 count = 0","A 执行一次原子递增 → count = 1","B 执行一次原子递增 → count = 2"][Math.min(step,2)]:trace[step];
  return '<div class="switch-row"><span>对比原子操作模式</span><button class="switch '+(atomic?'on':'')+'" aria-pressed="'+atomic+'" data-lab="race" data-lab-action="toggle">'+(atomic?'已开启 AtomicInteger':'普通 count++')+'</button></div><div class="race-grid"><div class="race-thread"><span>线程 A</span><strong>'+(atomic?step>=1?'incrementAndGet() ✓':'等待执行':step>=3?'本地临时值 1':step>=1?'读到 0':'等待执行')+'</strong></div><div class="race-shared"><span>共享变量</span><strong>'+value+'</strong></div><div class="race-thread"><span>线程 B</span><strong>'+(atomic?step>=2?'incrementAndGet() ✓':'等待执行':step>=4?'本地临时值 1':step>=2?'读到 0':'等待执行')+'</strong></div></div><p class="step-description">'+line+'</p>'+notes('这是固定交错的演示，并非真实线程调度器；AtomicInteger 模式假设使用原子读改写，两个操作均完成后结果为 2。')+controls("race",step>=(atomic?2:6);
}
function streamLab(step){
  const data=[[1,2,3,4,5],[2,4],[4,16],[4,16]];
  const names=["source()","filter(n -> n % 2 == 0)","map(n -> n * n)","toList()"];
  return '<div class="pipeline">'+names.map((name,i)=>'<div class="pipeline-stage '+(i===step?'current':'')+'"><span class="pipeline-index">0'+(i+1)+'</span><b>'+name+'</b><div class="chips">'+(i<=step?data[i].map(n=>'<span>'+n+'</span>').join(''):'<em>待执行</em>')+'</div></div>').join('')+'</div><p class="step-description">'+["准备数据源。真实流的中间操作通常直到终端操作才被驱动。","满足偶数条件的元素保留为 [2, 4]。","将每个元素平方，得到 [4, 16]。","执行终端操作，把结果收集到 List。"][step]+'</p>'+notes('为展示各阶段的概念结果，动画按阶段展开；真实 Stream 可能进行操作融合、逐元素处理，也可能在短路操作时提前结束。')+controls("stream",step===3);
}
function genericsLab(switched){
 return '<div class="code-compare"><div><span class="diagram-heading">源代码 / 泛型声明</span><pre>List&lt;String&gt; names = new ArrayList&lt;&gt;();\nString x = names.get(0);</pre></div><div><span class="diagram-heading">类型擦除后的概念形式</span><pre>List names = new ArrayList();\nString x = (String) names.get(0);</pre></div></div><div class="callout '+(switched?'highlight':'')+'"><strong>'+(switched?'运行时类型参数通常不可辨认':'编译期类型检查')+'</strong><p>'+(switched?'List<String> 和 List<Integer> 通常都表现为 List 的运行时类对象；桥接方法、签名元数据等细节未在此图完整展示。':'编译器在写入与读取时检查泛型约束，减少显式类型转换。')+'</p></div>'+notes('这里展示的是经过简化的“擦除后概念形式”，不是 javac 逐行反编译结果。')+'<div class="lab-actions"><button class="btn btn-primary" data-lab="generics" data-lab-action="next">切换观察视角 →</button></div>';
}
function threadLab(step){
 const states=["NEW","RUNNABLE","WAITING","RUNNABLE","TERMINATED"];
 return '<div class="thread-track">'+states.map((s,i)=>'<div class="track-step '+(step===i?'current':'')+'"><span>'+s+'</span><small>'+["创建对象","调用 start()","等待条件","被唤醒","执行结束"][i]+'</small></div>').join('<span class="track-arrow">→</span>')+'</div><p class="step-description">当前：'+states[step]+' · '+["未启动","可运行，可能正在执行","无限期等待另一线程动作","重新获得运行资格","线程已结束"][step]+'</p>'+notes('Thread.State 还包含 BLOCKED 与 TIMED_WAITING，本路径只展示一种可能序列；WAITING 并非任何线程都会经历。RUNNABLE 不代表持续占用 CPU。')+controls("thread",step===4);
}
export function renderLab(id,state){
  switch(id){
   case "reference":return '<div class="reference-diagram"><div class="ref-stack"><span class="diagram-heading">引用变量</span>'+segment("scores",true,"ref → array")+segment("alias",true,"ref → array")+'</div><span class="memory-arrow">→</span><div><span class="diagram-heading">共享数组对象</span><div class="array-items">'+state.reference.map((n,i)=>'<div><small>['+i+']</small><strong>'+n+'</strong></div>').join('')+'</div></div></div><p class="step-description">执行 alias[1] += 10 后，scores[1] 也读到同一个数组的当前值。</p>'+notes('修改的是共享数组元素，并没有修改两个引用变量所保存的引用值。')+controls("reference",false);
   case "memory":return memoryLab(state.memory);
   case "hashmap":return hashmapLab(state.hashmap);
   case "generics":return genericsLab(state.generics);
   case "stream":return streamLab(state.stream);
   case "race":return raceLab(state.race,state.raceAtomic);
   case "thread":return threadLab(state.thread);
   default:return '<p>未找到实验。</p>';
  }
}