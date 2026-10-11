/* 基于《Java 核心技术》第12版的主题索引原创编写，示例以 Java 17 为目标。 */
export const chapters = [
  {
    "title": "Java 程序设计概述",
    "summary": "从源代码、字节码到 JVM 的执行链路",
    "level": "基础",
    "concept": "Java 使用 javac 将源文件编译为字节码，JVM 负责加载、验证与运行字节码。JDK 是开发工具与运行工具的集合。理解语言规范、API 与虚拟机实现之间的区别，有助于解释为什么同一份 Java 程序可以在不同平台上运行。",
    "points": [
      "javac 生成 .class 字节码；java 启动虚拟机执行入口类。",
      "JIT 可以针对热点代码进行本机优化，但不是源代码直接翻译。",
      "不同 JDK 发行版与 Java SE 规范并不是同一个概念。"
    ],
    "pitfalls": [
      "字节码不等于 CPU 可以直接运行的本机指令。",
      "不是每个 Java 程序都必须手动写 main：框架可能管理启动入口。"
    ],
    "code": "public class Hello {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, Java!\");\n    }\n}",
    "quiz": {
      "question": "javac 编译 .java 文件通常生成什么？",
      "choices": [
        ".exe 程序",
        ".class 字节码",
        "SQL 文件"
      ],
      "answer": 1,
      "why": "生成的 .class 字节码交由 JVM 加载并执行。"
    },
    "lab": null
  },
  {
    "title": "Java 程序设计环境",
    "summary": "JDK、命令行工具、JShell 和构建环境",
    "level": "基础",
    "concept": "一套稳定的 Java 环境由 JDK、终端和编辑器或 IDE 组成。配置前应确认命令行实际使用哪个 JDK，并区分 javac 编译器与 java 启动器。JShell 适合试验表达式；正式项目建议使用构建工具管理依赖和测试。",
    "points": [
      "通过 java -version 和 javac -version 检查版本一致性。",
      "javac -d 指定输出目录，java -cp 指定类路径。",
      "JShell 可以即时执行表达式，不等同于完整工程构建。"
    ],
    "pitfalls": [
      "修改 JAVA_HOME 之后，已打开的终端可能仍保留旧 PATH。",
      "不要把 IDE 运行成功误认为命令行环境已配置正确。"
    ],
    "code": "// 保存为 Main.java\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println(Runtime.version());\n    }\n}\n// javac Main.java && java Main",
    "quiz": {
      "question": "哪个命令用于查看 Java 运行时版本？",
      "choices": [
        "java -version",
        "javac -d",
        "jar -c"
      ],
      "answer": 0,
      "why": "java -version 会输出正在使用的 Java 运行环境信息。"
    },
    "lab": null
  },
  {
    "title": "Java 的基本程序设计结构",
    "summary": "变量、控制流、字符串和数组",
    "level": "基础",
    "concept": "基本类型变量保存值，而引用变量保存指向对象的引用值。Java 方法始终采用值传递：传入对象引用时复制的是引用值。数组长度固定、下标从零开始；String 不可变，内容比较通常使用 equals。",
    "points": [
      "注意整数除法与浮点除法的区别，以及类型提升规则。",
      "字符串拼接时避免在循环中大量构造中间对象，可用 StringBuilder。",
      "数组是对象，两个变量可以共享同一个数组。"
    ],
    "pitfalls": [
      "用 == 比较 String 的文本内容可能出错。",
      "误把 Java 对对象的参数传递理解为引用传递。"
    ],
    "code": "int[] scores = {10, 20, 30};\nint[] alias = scores;\nalias[1] = 99;\nSystem.out.println(scores[1]); // 99",
    "quiz": {
      "question": "修改 alias 指向的数组元素后，scores 会怎样？",
      "choices": [
        "看到相同修改",
        "自动复制数组",
        "发生编译错误"
      ],
      "answer": 0,
      "why": "两个引用指向同一个数组对象，因此能观察到同一个元素变化。"
    },
    "lab": "reference"
  },
  {
    "title": "对象与类",
    "summary": "封装、构造器、实例方法与身份",
    "level": "核心",
    "concept": "类是创建对象的类型蓝图；对象由状态与行为组成。private 隐藏内部状态、公开方法维护不变式，构造器用于建立合法初始状态。引用同一性与逻辑相等是不同维度，合理实现 equals 和 hashCode 是集合操作的重要基础。",
    "points": [
      "构造器没有返回类型，能够重载。",
      "static 成员属于类的层面，实例成员属于对象。",
      "引用类型的 == 比较是否为同一个对象，equals 语义由类型定义。"
    ],
    "pitfalls": [
      "将所有字段公开会破坏封装。",
      "覆盖 equals 却不一致地覆盖 hashCode 会影响散列集合。"
    ],
    "code": "class Counter {\n    private int value;\n    public void increment() { value++; }\n    public int getValue() { return value; }\n}",
    "quiz": {
      "question": "对两个对象引用使用 ==，默认比较什么？",
      "choices": [
        "各字段是否相等",
        "是否是同一对象",
        "toString 输出"
      ],
      "answer": 1,
      "why": "引用的 == 比较同一性；逻辑值相等通常使用 equals。"
    },
    "lab": "memory"
  },
  {
    "title": "继承",
    "summary": "多态、方法重写、抽象类与类型转换",
    "level": "核心",
    "concept": "继承表达 is-a 的类型关系，允许子类沿用并扩展父类的行为。调用被重写的实例方法时，Java 根据对象实际运行时类型选择实现，这就是动态分派。抽象类可以部分实现行为，接口更强调能力契约。",
    "points": [
      "使用 @Override 帮助编译器检查签名。",
      "super 可调用父类构造器或被重写的父类方法。",
      "向下转型需要类型兼容，可使用 instanceof 检查。"
    ],
    "pitfalls": [
      "字段访问不是实例方法的动态分派。",
      "过度继承容易导致紧耦合，组合往往更灵活。"
    ],
    "code": "class Animal { String speak() { return \"...\"; } }\nclass Dog extends Animal {\n    @Override String speak() { return \"woof\"; }\n}\nAnimal animal = new Dog();\nSystem.out.println(animal.speak()); // woof",
    "quiz": {
      "question": "animal 声明为 Animal，实际是 Dog，调用重写方法采用什么实现？",
      "choices": [
        "Animal 固定实现",
        "Dog 的运行时实现",
        "随机选择"
      ],
      "answer": 1,
      "why": "对重写的实例方法使用动态分派，选择实际对象类型的实现。"
    },
    "lab": null
  },
  {
    "title": "接口、lambda 表达式与内部类",
    "summary": "抽象契约、函数式接口、捕获变量",
    "level": "核心",
    "concept": "接口描述类型应提供的行为。带一个抽象方法的函数式接口可由 lambda 表达式提供实现；lambda 在使用外部局部变量时要求该变量是 final 或事实上 final。内部类能够访问其外围对象成员，但也带来生命周期与耦合问题。",
    "points": [
      "lambda 的目标类型需要函数式接口。",
      "方法引用可用 Type::method 形式简化常见 lambda。",
      "接口 default 方法可在保持兼容时提供默认实现。"
    ],
    "pitfalls": [
      "lambda 并不是任意匿名代码块，它需要可推断的目标接口。",
      "被 lambda 捕获的局部变量不能再重新赋值。"
    ],
    "code": "import java.util.function.Predicate;\nPredicate<String> nonEmpty = s -> !s.isEmpty();\nSystem.out.println(nonEmpty.test(\"Java\")); // true",
    "quiz": {
      "question": "lambda 表达式可以赋给什么类型？",
      "choices": [
        "只有 String",
        "函数式接口",
        "任何 final 类"
      ],
      "answer": 1,
      "why": "lambda 需要函数式接口作为目标类型。"
    },
    "lab": null
  },
  {
    "title": "异常、断言和日志",
    "summary": "异常处理边界、资源释放与诊断",
    "level": "核心",
    "concept": "Java 使用异常报告不适合通过正常返回值处理的错误路径。受检异常要求捕获或声明抛出，非受检异常通常反映编程错误或无法在当前层恢复的问题。try-with-resources 用于可靠关闭资源；日志应保留上下文并避免泄露敏感数据。",
    "points": [
      "catch 应尽量准确处理可恢复情况，不应无条件吞掉错误。",
      "finally 与 try-with-resources 的资源关闭顺序需要理解。",
      "断言用于程序内部假设，不应用于校验不可信输入。"
    ],
    "pitfalls": [
      "catch (Exception e) {} 会隐藏问题。",
      "不要以异常处理代替正常分支控制。"
    ],
    "code": "import java.io.*;\ntry (BufferedReader r = new BufferedReader(\n        new StringReader(\"Java\"))) {\n    System.out.println(r.readLine());\n} catch (IOException e) {\n    throw new UncheckedIOException(e);\n}",
    "quiz": {
      "question": "哪种语法能在作用域结束时自动关闭资源？",
      "choices": [
        "switch",
        "try-with-resources",
        "synchronized"
      ],
      "answer": 1,
      "why": "声明在 try(...) 中的 AutoCloseable 资源会按规则关闭。"
    },
    "lab": null
  },
  {
    "title": "泛型程序设计",
    "summary": "类型参数、边界、通配符与类型擦除",
    "level": "核心",
    "concept": "泛型把可复用的数据结构和算法写成带类型参数的形式，让编译器检查类型约束。Java 的泛型主要通过类型擦除实现：运行时通常不保留大部分具体泛型参数，必要时编译器还会插入转换和桥接方法。PECS 口诀可帮助理解通配符：生产者 extends，消费者 super。",
    "points": [
      "List<String> 与 List<Integer> 在运行时通常同属 List 类型。",
      "T extends Number 是上界约束；? super Integer 是下界通配符。",
      "擦除不会把泛型集合元素的真实对象类型改变掉。"
    ],
    "pitfalls": [
      "不能直接 new T() 或 new List<String>[10]。",
      "不要误以为 instanceof List<String> 能检测运行时类型参数。"
    ],
    "code": "import java.util.*;\nList<String> names = new ArrayList<>();\nnames.add(\"Ada\");\nString first = names.get(0);\n// 编译器依据泛型声明检查存取类型",
    "quiz": {
      "question": "以下哪种写法通常因类型擦除而非法？",
      "choices": [
        "new ArrayList<String>()",
        "instanceof List<String>",
        "List<String> names = new ArrayList<>()"
      ],
      "answer": 1,
      "why": "运行时通常无法通过 instanceof 检测具体泛型参数。"
    },
    "lab": "generics"
  },
  {
    "title": "集合",
    "summary": "List、Set、Map、迭代器与复杂度",
    "level": "核心",
    "concept": "集合框架提供多种容器及统一操作协议。ArrayList 适合按索引访问，HashSet 表达无重复元素，HashMap 表达键值查找。容器选型应从语义、操作分布、时间复杂度和并发要求出发，而非仅凭名称。",
    "points": [
      "ArrayList 按索引访问通常是常数时间，内部插入可能移动元素。",
      "HashMap 依赖键的 hashCode 与 equals 一致性。",
      "TreeMap 按键的排序规则维护有序映射。"
    ],
    "pitfalls": [
      "HashMap 不保证迭代顺序。",
      "可变键的散列值变化可能导致查找失败。"
    ],
    "code": "import java.util.*;\nMap<String, Integer> counts = new HashMap<>();\ncounts.merge(\"java\", 1, Integer::sum);\nSystem.out.println(counts.get(\"java\"));",
    "quiz": {
      "question": "要求元素唯一，优先选择哪个接口？",
      "choices": [
        "List",
        "Set",
        "Queue"
      ],
      "answer": 1,
      "why": "Set 表达元素不重复的语义。"
    },
    "lab": "hashmap"
  },
  {
    "title": "图形用户界面程序设计",
    "summary": "Swing、窗口生命周期和事件派发线程",
    "level": "扩展",
    "concept": "Swing 是 Java SE 的桌面 GUI 工具包，采用组件和事件驱动模型。桌面界面必须理解事件派发线程（EDT）：大多数 Swing 组件操作应在 EDT 上执行，耗时任务不应阻塞界面事件处理，否则窗口会冻结。",
    "points": [
      "JFrame 是顶层窗口，JPanel 用于组织组件。",
      "SwingUtilities.invokeLater 将更新调度到 EDT。",
      "界面布局交给 LayoutManager，避免大量绝对坐标。"
    ],
    "pitfalls": [
      "不要在按钮回调中执行耗时查询或网络请求。",
      "Swing 的线程规则与浏览器前端的事件循环不是一回事。"
    ],
    "code": "import javax.swing.*;\nSwingUtilities.invokeLater(() -> {\n    JFrame frame = new JFrame(\"Hello\");\n    frame.add(new JLabel(\"Java Swing\"));\n    frame.setSize(240, 120);\n    frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);\n    frame.setVisible(true);\n});",
    "quiz": {
      "question": "Swing 界面更新一般应该在哪个线程执行？",
      "choices": [
        "事件派发线程 EDT",
        "任意后台线程",
        "垃圾回收线程"
      ],
      "answer": 0,
      "why": "Swing 大部分组件不是线程安全的，更新一般安排在 EDT。"
    },
    "lab": null
  },
  {
    "title": "Swing 用户界面组件",
    "summary": "布局、输入组件、动作与表格",
    "level": "扩展",
    "concept": "Swing 提供 JButton、JTextField、JTable、JTree 等基础组件。组件与数据模型分离能够降低耦合，例如 JTable 搭配 TableModel；布局管理器负责尺寸与对齐。合理使用 Action、事件监听器和输入验证可保持大型界面的可维护性。",
    "points": [
      "BorderLayout 按区域布局，FlowLayout 按行排列。",
      "JScrollPane 能为 JTable、JTextArea 等提供滚动能力。",
      "TableModel 是表格展示内容的逻辑模型。"
    ],
    "pitfalls": [
      "依赖 setBounds 绝对定位可能在不同 DPI 和字体上错位。",
      "不要忘记为输入组件提供校验和可访问标签。"
    ],
    "code": "import javax.swing.*;\nJPanel panel = new JPanel();\nJTextField field = new JTextField(12);\nJButton button = new JButton(\"提交\");\nbutton.addActionListener(e ->\n    System.out.println(field.getText()));\npanel.add(field); panel.add(button);",
    "quiz": {
      "question": "为 Swing 组件提供可伸缩布局，通常使用什么？",
      "choices": [
        "LayoutManager",
        "System.gc()",
        "ClassLoader"
      ],
      "answer": 0,
      "why": "布局管理器根据容器与规则安排子组件。"
    },
    "lab": null
  },
  {
    "title": "并发",
    "summary": "线程状态、原子性、同步与可见性",
    "level": "核心",
    "concept": "并发程序需要区分竞态条件、原子性、内存可见性与调度。start() 才会启动新线程；共享可变数据通过同步、原子类或并发集合协调。volatile 解决特定的可见性和有序性问题，却不能将读—改—写复合操作变成原子操作。",
    "points": [
      "Thread.State 包含 NEW、RUNNABLE、BLOCKED、WAITING、TIMED_WAITING、TERMINATED。",
      "synchronized 可建立互斥访问并提供相应 happens-before 关系。",
      "ExecutorService 管理任务通常比手动创建大量线程更合适。"
    ],
    "pitfalls": [
      "直接调用 run() 不创建线程。",
      "volatile int 的 count++ 仍可能产生丢失更新。"
    ],
    "code": "Thread worker = new Thread(() ->\n    System.out.println(\"working\"));\nworker.start();\nworker.join();",
    "quiz": {
      "question": "直接调用 thread.run() 会怎样？",
      "choices": [
        "启动新线程",
        "在当前线程执行普通方法",
        "等待线程结束"
      ],
      "answer": 1,
      "why": "run() 是普通方法；start() 才启动新线程。"
    },
    "lab": "race"
  },
  {
    "title": "Stream 库",
    "summary": "惰性管道、终端操作与规约",
    "level": "核心",
    "concept": "Stream 用流水线表达数据转换：数据源经 filter、map 等中间操作，最终由 collect、count、reduce 等终端操作消费。中间操作通常惰性执行，流水线在遇到终端操作时才会驱动遍历。并行流并不必然更快，需考虑拆分成本和副作用。",
    "points": [
      "filter 选择元素，map 转换元素，flatMap 展平结构。",
      "Stream 流通常只能消费一次。",
      "保持操作无干扰、尽量无状态，尤其在并行场景中。"
    ],
    "pitfalls": [
      "没有终端操作，通常不会执行中间操作中的副作用。",
      "对同一个 Stream 执行两次终端操作会失败。"
    ],
    "code": "import java.util.*;\nvar values = List.of(1, 2, 3, 4, 5)\n    .stream().filter(n -> n % 2 == 0)\n    .map(n -> n * n).toList();\nSystem.out.println(values); // [4, 16]",
    "quiz": {
      "question": "哪一个是终端操作？",
      "choices": [
        "filter",
        "map",
        "count"
      ],
      "answer": 2,
      "why": "count 触发流管道并返回终端结果。"
    },
    "lab": "stream"
  },
  {
    "title": "输入与输出",
    "summary": "字节流、字符流、路径和文件处理",
    "level": "核心",
    "concept": "I/O 按数据表达可区分 InputStream/OutputStream 字节流与 Reader/Writer 字符流。文本处理需要明确字符集，Path 和 Files 提供现代文件操作 API。使用缓冲与流式处理能减少大文件的内存压力，资源应由 try-with-resources 关闭。",
    "points": [
      "Files.readString 适合较小文本文件，大文件可逐行流式读取。",
      "UTF-8 是常见的跨平台文本编码选择。",
      "Path 表示路径；Files 的方法执行实际文件操作。"
    ],
    "pitfalls": [
      "不要混淆文件字节与字符数量。",
      "不要把整个超大文件一次性读入内存。"
    ],
    "code": "import java.nio.file.*;\nimport java.nio.charset.StandardCharsets;\nPath path = Path.of(\"demo.txt\");\nFiles.writeString(path, \"你好 Java\", StandardCharsets.UTF_8);\nString text = Files.readString(path, StandardCharsets.UTF_8);",
    "quiz": {
      "question": "处理 UTF-8 文本时，最应该明确什么？",
      "choices": [
        "线程数量",
        "字符编码",
        "窗口位置"
      ],
      "answer": 1,
      "why": "字符与字节间的转换依赖明确的 Charset。"
    },
    "lab": null
  },
  {
    "title": "XML",
    "summary": "DOM、SAX、StAX、XPath 与安全解析",
    "level": "进阶",
    "concept": "XML 是具有严格结构约束的标记格式。DOM 构建内存树，适合随机遍历与修改；SAX 事件驱动，适合流式读取；StAX 允许应用主动控制读取过程。XPath 可定位节点。解析外部 XML 时必须关注外部实体（XXE）等安全风险。",
    "points": [
      "DOM 适合小中型文档的树状操作。",
      "SAX 不会默认保留完整树结构。",
      "正确启用解析器的安全选项并禁用不需要的外部实体访问。"
    ],
    "pitfalls": [
      "解析来自不可信源的 XML 时不能使用无防护的默认设置。",
      "XML 元素与属性名称是区分大小写的。"
    ],
    "code": "import javax.xml.parsers.*;\nimport org.w3c.dom.Document;\nvar factory = DocumentBuilderFactory.newInstance();\nfactory.setFeature(\"http://apache.org/xml/features/disallow-doctype-decl\", true);\nDocument doc = factory.newDocumentBuilder()\n    .parse(new java.io.File(\"data.xml\"));",
    "quiz": {
      "question": "对未知来源的 XML 最应防范哪类安全问题？",
      "choices": [
        "XXE 外部实体",
        "JIT 热点编译",
        "数组越界"
      ],
      "answer": 0,
      "why": "不安全的外部实体解析可能导致敏感文件读取或资源访问。"
    },
    "lab": null
  },
  {
    "title": "网络",
    "summary": "URI、HTTP 客户端与 Socket 通信",
    "level": "进阶",
    "concept": "Java 标准库同时提供高层 HTTP API 与底层 Socket 编程。HttpClient 支持同步、异步请求及 HTTP/2；Socket 处理字节流级别的连接。网络程序必须合理设置超时、处理失败与重试，避免将重试误用到不具备幂等性的写操作。",
    "points": [
      "URI 表示资源标识，URL 还包含资源定位语义。",
      "HttpClient 可以复用连接并发起异步请求。",
      "连接超时与响应等待超时应分别设计。"
    ],
    "pitfalls": [
      "默认无限等待会导致任务卡住。",
      "不要在失败后无条件重试支付等可能具有副作用的请求。"
    ],
    "code": "import java.net.URI;\nimport java.net.http.*;\nimport java.time.Duration;\nvar client = HttpClient.newBuilder()\n    .connectTimeout(Duration.ofSeconds(3)).build();\nvar req = HttpRequest.newBuilder(URI.create(\"https://example.com\"))\n    .timeout(Duration.ofSeconds(5)).GET().build();",
    "quiz": {
      "question": "HTTP 客户端请求可能卡住，优先配置什么？",
      "choices": [
        "超时",
        "垃圾回收",
        "Swing 事件"
      ],
      "answer": 0,
      "why": "连接、请求超时能给网络等待设置明确边界。"
    },
    "lab": null
  },
  {
    "title": "数据库编程",
    "summary": "JDBC、PreparedStatement、事务与连接管理",
    "level": "核心",
    "concept": "JDBC 为 Java 应用提供数据库访问的标准接口。通过 DataSource 获取连接，PreparedStatement 参数化 SQL，ResultSet 读取数据；一组需要共同成功的操作可用事务管理。连接池是工程实践中常用的资源管理方式。",
    "points": [
      "PreparedStatement 使用占位符区分 SQL 结构与参数值。",
      "默认自动提交模式下，每条语句通常单独提交。",
      "事务失败时需要回滚，并确保连接归还连接池。"
    ],
    "pitfalls": [
      "拼接用户输入构造 SQL 可能产生注入漏洞。",
      "不要把数据库连接长期保存在全局单例供多线程共用。"
    ],
    "code": "import java.sql.*;\ntry (Connection conn = dataSource.getConnection();\n     PreparedStatement ps = conn.prepareStatement(\n         \"SELECT name FROM users WHERE id = ?\")) {\n    ps.setLong(1, 42L);\n    try (ResultSet rs = ps.executeQuery()) {\n        while (rs.next()) System.out.println(rs.getString(1));\n    }\n}",
    "quiz": {
      "question": "防止 SQL 注入，哪种写法更恰当？",
      "choices": [
        "字符串拼接 SQL",
        "PreparedStatement 参数化",
        "关闭数据库日志"
      ],
      "answer": 1,
      "why": "参数化查询将 SQL 结构与参数绑定分离。"
    },
    "lab": null
  },
  {
    "title": "日期与时间 API",
    "summary": "时刻、当地时间、时区与格式化",
    "level": "核心",
    "concept": "java.time 将具体时刻 Instant、无时区的 LocalDateTime 和带时区规则的 ZonedDateTime 分开建模。业务系统必须先明确记录的是全球唯一时刻还是地区本地日程，再选择存储与展示类型。夏令时与地区规则可能使本地时间存在重复或不存在的情况。",
    "points": [
      "Instant 表示时间轴上的一个点。",
      "LocalDateTime 不包含时区，不能直接唯一定位全球时刻。",
      "ZoneId 使用 IANA 区域标识，例如 Asia/Shanghai。"
    ],
    "pitfalls": [
      "不能把 LocalDateTime 当作自带时区的时间戳。",
      "固定 UTC 偏移不等同于包含夏令时规则的地区时区。"
    ],
    "code": "import java.time.*;\nInstant now = Instant.now();\nZonedDateTime tokyo = now.atZone(ZoneId.of(\"Asia/Tokyo\"));\nSystem.out.println(tokyo.toLocalDate());",
    "quiz": {
      "question": "哪一个类型表示全球时间轴上确定的时刻？",
      "choices": [
        "LocalDate",
        "Instant",
        "MonthDay"
      ],
      "answer": 1,
      "why": "Instant 对应一个确定时间点，与展示时区无关。"
    },
    "lab": null
  },
  {
    "title": "国际化",
    "summary": "Locale、ResourceBundle、数字和日期格式",
    "level": "扩展",
    "concept": "国际化把文本、区域格式与程序逻辑分离。Locale 描述语言和地区偏好，ResourceBundle 管理本地化消息，NumberFormat 与 DateTimeFormatter 处理本地数字和时间格式。国际化不仅是翻译，还包括排序、货币、复数及文字方向等文化规则。",
    "points": [
      "用户界面文字不要散落为硬编码字符串。",
      "货币代码、符号与金额格式需要分开处理。",
      "使用 Locale-aware 格式化 API 代替手工拼接日期格式。"
    ],
    "pitfalls": [
      "语言与国家是不同概念，同一种语言可对应不同地区格式。",
      "不要将本地化数字文本直接当作机器存储数据。"
    ],
    "code": "import java.text.NumberFormat;\nimport java.util.Locale;\nvar fmt = NumberFormat.getCurrencyInstance(Locale.JAPAN);\nSystem.out.println(fmt.format(1234.5));",
    "quiz": {
      "question": "需要在不同地区输出合适的货币格式，使用什么？",
      "choices": [
        "NumberFormat",
        "ThreadLocal",
        "JFrame"
      ],
      "answer": 0,
      "why": "NumberFormat 能依据 Locale 格式化金额。"
    },
    "lab": null
  },
  {
    "title": "高级 Swing 和图形",
    "summary": "绘制、字体、图像与双缓冲",
    "level": "扩展",
    "concept": "Java 2D 通过 Graphics2D 绘制形状、文本、颜色和图像。自定义 Swing 绘制通常在 JComponent 的 paintComponent 中完成，并遵循 EDT 更新规则。高 DPI、字体度量和重绘区域是桌面图形界面设计必须考虑的因素。",
    "points": [
      "在 paintComponent 中先调用 super.paintComponent。",
      "Graphics2D 提供变换、抗锯齿与 Stroke 等能力。",
      "组件状态变化后调用 repaint 请求重绘，而不是随意直接绘制。"
    ],
    "pitfalls": [
      "不要在 paintComponent 中执行文件 I/O。",
      "绘制方法可能被频繁调用，避免副作用或重资源分配。"
    ],
    "code": "import javax.swing.*;\nimport java.awt.*;\nJComponent canvas = new JComponent() {\n    @Override protected void paintComponent(Graphics g) {\n        super.paintComponent(g);\n        g.setColor(Color.BLUE);\n        g.fillOval(12, 12, 72, 72);\n    }\n};",
    "quiz": {
      "question": "Swing 组件自定义绘制主要覆盖哪个方法？",
      "choices": [
        "paintComponent",
        "toString",
        "finalize"
      ],
      "answer": 0,
      "why": "JComponent 的 paintComponent 是常见自定义绘制入口。"
    },
    "lab": null
  },
  {
    "title": "高级 AWT",
    "summary": "剪贴板、桌面能力、打印与系统集成",
    "level": "扩展",
    "concept": "AWT 提供与平台窗口系统交互的底层能力，包括 Desktop、Clipboard、打印和拖放。涉及系统资源时应检查平台支持情况、权限和无头环境限制。自动化或服务器进程不能假设一定存在显示器和图形桌面。",
    "points": [
      "Desktop.isDesktopSupported 可检查是否支持桌面服务。",
      "剪贴板操作可能因系统资源占用等原因失败。",
      "Java 打印 API 需要考虑打印机能力和页面设置。"
    ],
    "pitfalls": [
      "不要在服务器的 headless 环境中直接依赖桌面 UI。",
      "平台特有能力需要失败降级与异常处理。"
    ],
    "code": "import java.awt.*;\nimport java.net.URI;\nif (Desktop.isDesktopSupported()) {\n    Desktop desktop = Desktop.getDesktop();\n    if (desktop.isSupported(Desktop.Action.BROWSE)) {\n        desktop.browse(URI.create(\"https://example.com\"));\n    }\n}",
    "quiz": {
      "question": "在无桌面服务器上使用 Desktop API 前应当如何处理？",
      "choices": [
        "检查是否受支持",
        "直接假设可用",
        "执行 System.exit"
      ],
      "answer": 0,
      "why": "平台服务并非任何环境都可用，应检测并进行降级。"
    },
    "lab": null
  },
  {
    "title": "安全",
    "summary": "加密、消息摘要、签名与密码管理",
    "level": "进阶",
    "concept": "Java 安全 API 涵盖消息摘要、对称加密、非对称签名、密钥管理与 TLS。哈希不等于加密；数字签名可验证来源与完整性；密码散列需要专门的自适应算法和随机盐。实际系统要优先使用成熟协议与库，避免自行发明加密格式。",
    "points": [
      "MessageDigest 可计算 SHA-256 摘要，但不适合直接储存用户密码。",
      "使用 SecureRandom 生成安全敏感随机值。",
      "TLS 验证证书身份，随意关闭验证会引入中间人攻击。"
    ],
    "pitfalls": [
      "不要将 API 密钥硬编码入仓库。",
      "不应使用裸 SHA-256 直接保存用户密码。"
    ],
    "code": "import java.security.MessageDigest;\nimport java.nio.charset.StandardCharsets;\nbyte[] hash = MessageDigest.getInstance(\"SHA-256\")\n    .digest(\"document\".getBytes(StandardCharsets.UTF_8));\nSystem.out.println(hash.length); // 32",
    "quiz": {
      "question": "以下哪一项适合用于安全敏感随机值？",
      "choices": [
        "Math.random()",
        "SecureRandom",
        "Random 固定种子"
      ],
      "answer": 1,
      "why": "SecureRandom 专门面向密码学用途。"
    },
    "lab": null
  },
  {
    "title": "平台模块系统",
    "summary": "module-info.java、requires、exports 和封装",
    "level": "进阶",
    "concept": "Java 平台模块系统（JPMS）用 module-info.java 显式声明模块依赖与公开包。模块路径与传统类路径的解析机制不同，强封装能减少未经允许访问内部实现的情况。大型工程需要设计模块边界而不是简单把每个包都导出。",
    "points": [
      "requires 声明对其他模块的依赖。",
      "exports 控制可访问的公开包。",
      "opens 用于需要深度反射访问的情况，作用与 exports 不同。"
    ],
    "pitfalls": [
      "模块并不是普通 package 的别名。",
      "反射库报错时不应盲目把所有包全局 opens。"
    ],
    "code": "// src/com.example.app/module-info.java\nmodule com.example.app {\n    requires java.logging;\n    exports com.example.app.api;\n}",
    "quiz": {
      "question": "module-info.java 中 exports 的作用是什么？",
      "choices": [
        "公开指定包",
        "启动 JVM GC",
        "创建线程"
      ],
      "answer": 0,
      "why": "exports 声明哪些包对其他模块开放编译期访问。"
    },
    "lab": null
  },
  {
    "title": "本地方法",
    "summary": "JNI、跨语言内存边界与原生库",
    "level": "进阶",
    "concept": "JNI 允许 Java 通过 native 方法调用 C/C++ 等本机实现，用于连接遗留系统或平台级能力。它跨越 Java 管理内存边界，涉及指针、线程、资源释放和 ABI 兼容。应首先评估纯 Java 或成熟绑定库，只有确有必要时才引入本地代码。",
    "points": [
      "native 方法只有声明，具体实现由加载的动态库提供。",
      "System.loadLibrary 根据平台查找本机动态库。",
      "JVM 的垃圾回收不替本地 malloc 管理内存。"
    ],
    "pitfalls": [
      "本地指针错误可能导致 JVM 进程崩溃。",
      "跨平台发布必须处理不同 CPU、OS 和 ABI。"
    ],
    "code": "public class NativeBridge {\n    static { System.loadLibrary(\"nativebridge\"); }\n    public native int add(int a, int b);\n    // 需单独实现并提供对应本机动态库\n}",
    "quiz": {
      "question": "哪种机制可连接 Java 与本机 C/C++ 代码？",
      "choices": [
        "JNI",
        "CSS",
        "JDBC ResultSet"
      ],
      "answer": 0,
      "why": "JNI 定义 Java 与本机代码之间的调用接口。"
    },
    "lab": null
  }
];
