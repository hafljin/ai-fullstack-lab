import { Topic, TopicCategory } from './types';
// Kotlin & CS Tutor: Skill Topics
export const TOPICS: Topic[] = [
  {
  id: 'kotlin-basics-1',
  title: '1. App Data & Variables',
  titleJa: '1. アプリのデータと変数',
  category: TopicCategory.MOBILE_KOTLIN,
  difficulty: 'Beginner',
  description: 'Learn how to store app data. Understand val vs var and basic types.',
  descriptionJa: 'アプリがデータを保存する方法を学びましょう。valとvarの違い、基本的な型を理解します。',
  contentMarkdown: `Kotlin basics: val, var, and types.`,
  contentMarkdownJa: `# アプリでのデータ保存\n\nどんなアプリを作るにも、まずは情報を保存する必要があります。ユーザー名、ハイスコア、ログイン状態など。Kotlinはこれを簡潔かつ安全に行えます。\n\n### 1. 読み取り専用 vs 可変\nKotlinは、変更可能な値と変更不可能な値を区別します。\n*   **\`val\` (Value):** 不変。デフォルトでこれを使います。意図しないバグを防ぎます。\n*   **\`var\` (Variable):** 可変。データが*変更される必要がある*場合のみ使います（例：カウンター）。\n\n\`\`\`kotlin\nval appName = "My Awesome App" // 変更できない\nvar userScore = 0              // 変更できる\nuserScore = 100\n\`\`\`\n\n### 2. 基本的な型\nKotlinは通常、型を推測します（型推論）が、基本を知っておく必要があります：\n*   \`String\`: テキスト ("Hello")\n*   \`Int\`: 整数 (42)\n*   \`Double\`: 小数 (3.14)\n*   \`Boolean\`: 真偽値 (true/false)\n\n\`\`\`kotlin\nval username: String = "DevUser"\nval isPremium: Boolean = false\n\`\`\``,
  starterCode: `fun main() {\n  val appName = "Taro"\n  var unreadMessages = 5\n  println(appName)\n  println(unreadMessages)\n  unreadMessages -= 2\n  println(unreadMessages)\n}`,
    examples: [
      {
        code: 'val age: Int = 20\nvar name: String = "Alice"\nprintln(age)\nprintln(name)',
        output: '20\nAlice',
        explanation: 'valは変更不可、varは変更可能。型は明示的に指定できる。',
        codeJa: 'val age: Int = 20\nvar name: String = "Alice"\nprintln(age)\nprintln(name)',
        explanationJa: 'valは定数、varは変数。型はIntやStringなど。'
      }
    ],
    quickOutput: {
      prompt: 'What is the output of println(age) if age is declared as val age: Int = 20?',
      promptJa: 'val age: Int = 20 の場合 println(age) の出力は？',
      answer: '20',
      answerJa: '20',
      explanation: 'valで宣言したageは20なので、そのまま出力される。',
      explanationJa: 'valで宣言したageは20なので、そのまま出力される。'
    },
  practicePrompt: "Create a val appName with 'Taro', a var unreadMessages with 5, print both, subtract 2 from unreadMessages and print again.",
  practicePromptJa: "1. 名前を入れる箱 appName を作って「Taro」を入れよう（valで作る）\n2. メッセージの数 unreadMessages を作って「5」を入れよう（varで作る）\n3. appName と unreadMessages を println で出力しよう\n4. unreadMessages から2ひいて、新しい数字を println で出力しよう",
  expectedOutputDescription: 'Taro\n5\n3',
  expectedOutputDescriptionJa: "アプリ名と、更新されるメッセージ数を表示する出力。"
  },
  {
    id: 'kotlin-control-flow',
      title: '2. Logic & Decisions',
      titleJa: '2. ロジックと意思決定',
      category: TopicCategory.MOBILE_KOTLIN,
      difficulty: 'Beginner',
      description: 'Control app logic with if/else and when expressions.',
      descriptionJa: 'アプリは判断を下す必要があります。if/elseとwhen式を学んでロジックを制御しましょう。',
      contentMarkdown: `Kotlin control flow: if, when, and logic.`,
      contentMarkdownJa: `# 判断を下す\n\nアプリは静的ではありません。データに反応します。ユーザーがログインしていればダッシュボードを表示し、そうでなければログイン画面を表示します。\n\n### \`if\` 式\nKotlinでは、\`if\`は値を返します。状態を割り当てるのに最適です。\n\n\`\`\`kotlin\nval buttonColor = if (isValid) "Green" else "Red"\n\`\`\`\n\n### \`when\` 式\n複数の可能性をチェックする場合（HTTPステータスコードやメニューオプションの処理など）は\`when\`を使います。多数のif-else文よりもクリーンです。\n\n\`\`\`kotlin\nval message = when (statusCode) {\n    200 -> "成功"\n    404 -> "見つかりません"\n    500 -> "サーバーエラー"\n    else -> "不明"\n}\n\`\`\``,
    examples: [
        {
          code: 'val score = 75\nval result = if (score >= 60) "Pass" else "Fail"\nprintln(result)',
          output: 'Pass',
          explanation: 'if式は値を返すので、resultに直接代入できる。',
          codeJa: 'val score = 75\nval result = if (score >= 60) "Pass" else "Fail"\nprintln(result)',
          explanationJa: 'if式は値を返すので、resultに直接代入できる。'
        },
        {
          code: 'val code = 404\nval msg = when (code) {\n  200 -> "OK"\n  404 -> "Not Found"\n  else -> "Unknown"\n}\nprintln(msg)',
          output: 'Not Found',
          explanation: 'when式で複数の値を分岐できる。',
          codeJa: 'val code = 404\nval msg = when (code) {\n  200 -> "OK"\n  404 -> "Not Found"\n  else -> "Unknown"\n}\nprintln(msg)',
          explanationJa: 'when式で複数の値を分岐できる。'
        }
      ],
      quickOutput: {
        prompt: 'What is the output if batteryLevel = 15 and you use when { batteryLevel > 20 -> "OK"; batteryLevel in 5..20 -> "Low Battery"; else -> "Shutdown Imminent" }?',
        promptJa: 'batteryLevel = 15 の場合、when式で「OK」「Low Battery」「Shutdown Imminent」のどれが出力されますか？',
        answer: 'Low Battery',
        answerJa: 'Low Battery',
        explanation: '15は5〜20の範囲なので「Low Battery」が出力される。',
        explanationJa: '15は5〜20の範囲なので「Low Battery」が出力される。'
      },
      starterCode: `fun main() {\n  val batteryLevel = 15\n  val status = when {\n    batteryLevel > 20 -> "OK"\n    batteryLevel in 5..20 -> "Low Battery"\n    else -> "Shutdown Imminent"\n  }\n  println(status)\n}`,
      practicePrompt: 'Create batteryLevel (Int). Print status based on value: >20 "OK", 5-20 "Low Battery", <5 "Shutdown Imminent".',
      practicePromptJa: "`batteryLevel`（Int型）という変数を作成してください。論理的なロジックを使用：レベル > 20なら'OK'を出力、5〜20の間なら'Low Battery'を出力、< 5なら'Shutdown Imminent'を出力してください。できれば`when`式の範囲（例：`in 0..5`）を使ってみてください！",
      expectedOutputDescription: 'Low Battery',
      expectedOutputDescriptionJa: "バッテリーレベルに基づいた正しいステータスメッセージ。",
      quizzes: [
        {
          id: 'q1',
          type: 'choice',
          question: 'What does if (x > 0) "Positive" else "Non-positive" return if x = -3?',
          questionJa: 'x = -3 の場合、if (x > 0) "Positive" else "Non-positive" は何を返しますか？',
          options: ['Positive', 'Non-positive', 'Error'],
          answer: 'Non-positive',
          answerJa: 'Non-positive',
          hint: 'xが0より大きいかどうかを考えましょう。',
          hintJa: 'xが0より大きいかどうかを考えましょう。',
          explanation: 'xが負なのでelse側が返る。',
          explanationJa: 'xが負なのでelse側が返る。'
        },
        {
          id: 'q2',
          type: 'fill',
          question: 'Fill in the blank: val color = if (isActive) "Green" else ___',
          questionJa: '空欄を埋めてください: val color = if (isActive) "Green" else ___',
          answer: 'Red',
          answerJa: 'Red',
          hint: 'elseの値は何色？',
          hintJa: 'elseの値は何色？',
          explanation: 'else側は"Red"。',
          explanationJa: 'else側は"Red"。'
        }
      ],
      grading: { minScore: 0.7, total: 10 },
      resultFlow: {
        pass: [
          { label: '次へ進む', action: 'next', labelJa: '次へ進む' },
          { label: 'ヒントを見てやり直す', action: 'hint', labelJa: 'ヒントを見てやり直す' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ],
        fail: [
          { label: '諦めてフィードバック・ヒントを見る', action: 'hint', labelJa: '諦めてフィードバック・ヒントを見る' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ]
      }
  },
  {
    id: 'kotlin-functions-nulls',
      title: '3. Functions & Null Safety',
      titleJa: '3. 関数とNull安全性',
      category: TopicCategory.MOBILE_KOTLIN,
      difficulty: 'Beginner',
      description: 'Structure code with functions and handle missing data safely.',
      descriptionJa: '関数でコードを構造化し、欠落データを安全に処理する方法を学びます（10億ドルの間違いを修正）。',
      contentMarkdown: `Kotlin functions and null safety.`,
      contentMarkdownJa: `# モジュール化されたコードと安全性\n\nアプリが成長すると、すべてを\`main()\`に入れることはできません。タスクを整理するために**関数**が必要です。\n\n### 関数\n\`\`\`kotlin\nfun sendNotification(message: String, userId: Int): Boolean {\n    println("Sending '$message' to User $userId")\n    return true\n}\n\`\`\`\n\n### Null安全性（重要！）\n多くの言語では、欠落値にアクセスするとアプリがクラッシュします。Kotlinはこれを処理することを強制します。\n*   \`String\`: nullにはできません。\n*   \`String?\`: nullにできます。\n\n\`\`\`kotlin\nvar email: String? = null\n// println(email.length) // コンパイラエラー！unsafe.\nprintln(email?.length)   // 安全呼び出し。emailがnullならnullを出力。\nprintln(email?.length ?: 0) // Elvis演算子：nullなら0を使用。\n\`\`\``,
      examples: [
        {
          code: 'fun greet(name: String?): String = if (name != null) "Hi, $name!" else "Hi, Guest!"\nprintln(greet("Bob"))\nprintln(greet(null))',
          output: 'Hi, Bob!\nHi, Guest!',
          explanation: 'null安全な関数で、nullの場合はデフォルト値を返す。',
          codeJa: 'fun greet(name: String?): String = if (name != null) "Hi, $name!" else "Hi, Guest!"\nprintln(greet("Bob"))\nprintln(greet(null))',
          explanationJa: 'null安全な関数で、nullの場合はデフォルト値を返す。'
        },
        {
          code: 'var email: String? = null\nprintln(email?.length ?: 0)',
          output: '0',
          explanation: 'Elvis演算子でnullなら0を返す。',
          codeJa: 'var email: String? = null\nprintln(email?.length ?: 0)',
          explanationJa: 'Elvis演算子でnullなら0を返す。'
        }
      ],
      quickOutput: {
        prompt: 'What does greetUser(null) return?',
        promptJa: 'greetUser(null)は何を返しますか？',
        answer: 'Hello, Guest!',
        answerJa: 'Hello, Guest!',
        explanation: 'nameがnullなのでGuest用の挨拶が返る。',
        explanationJa: 'nameがnullなのでGuest用の挨拶が返る。'
      },
      starterCode: `fun greetUser(name: String?): String {\n  return if (name != null) "Hello, $name!" else "Hello, Guest!"\n}\nfun main() {\n  println(greetUser("Alice"))\n  println(greetUser(null))\n}`,
      practicePrompt: 'Write greetUser(name: String?) that returns "Hello, [name]!" or "Hello, Guest!". Test in main().',
      practicePromptJa: "`greetUser(name: String?)`という関数を書いてください。この関数はStringを返します。nameが提供されていれば'Hello, [name]!'を返し、nameがnullなら'Hello, Guest!'を返します。main()でテストしてください。",
      expectedOutputDescription: 'Hello, Alice!\nHello, Guest!',
      expectedOutputDescriptionJa: "2つの挨拶：特定の名前での挨拶と、null入力の一般的な挨拶。",
      quizzes: [
        {
          id: 'q1',
          type: 'choice',
          question: 'What is the type of a variable that can be null in Kotlin?',
          questionJa: 'Kotlinでnullを許容する型は？',
          options: ['String', 'String?', 'Int'],
          answer: 'String?',
          answerJa: 'String?',
          hint: 'nullを許容する型には?が付く。',
          hintJa: 'nullを許容する型には?が付く。',
          explanation: 'String?はnullを許容する型。',
          explanationJa: 'String?はnullを許容する型。'
        },
        {
          id: 'q2',
          type: 'fill',
          question: 'Fill in the blank: fun greet(name: ___): String',
          questionJa: '空欄を埋めてください: fun greet(name: ___): String',
          answer: 'String?',
          answerJa: 'String?',
          hint: 'nullを許容する型。',
          hintJa: 'nullを許容する型。',
          explanation: '?が付く型はnullを許容する。',
          explanationJa: '?が付く型はnullを許容する。'
        }
      ],
      grading: { minScore: 0.7, total: 10 },
      resultFlow: {
        pass: [
          { label: '次へ進む', action: 'next', labelJa: '次へ進む' },
          { label: 'ヒントを見てやり直す', action: 'hint', labelJa: 'ヒントを見てやり直す' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ],
        fail: [
          { label: '諦めてフィードバック・ヒントを見る', action: 'hint', labelJa: '諦めてフィードバック・ヒントを見る' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ]
      }
  },
  {
    id: 'kotlin-oop-classes',
      title: '4. Modeling Data (Classes)',
      titleJa: '4. データのモデリング（クラス）',
      category: TopicCategory.MOBILE_KOTLIN,
      difficulty: 'Intermediate',
      description: 'Manage real objects with classes and data class.',
      descriptionJa: '実際のアプリは実際のオブジェクトを管理します。クラスと強力な`data class`を学びましょう。',
      contentMarkdown: `Kotlin OOP: classes, data class, and methods.`,
      contentMarkdownJa: `# 現実世界のモデリング\n\nショップを作るには\`Product\`が必要です。ソーシャルネットワークを作るには\`Post\`が必要です。クラスを使ってこれらの設計図を定義できます。\n\n### \`data class\`\nKotlinには**データクラス**というスーパーパワーがあります。自動的に\`toString()\`、\`equals()\`、\`copy()\`を生成してくれます。データを保持するのに最適です。\n\n\`\`\`kotlin\ndata class User(val id: Int, val name: String, val isOnline: Boolean)\n\nval u1 = User(1, "Alice", true)\nprintln(u1) // 出力: User(id=1, name=Alice, isOnline=true)\n\`\`\`\n\n### メソッド\nクラスは内部に関数（メソッド）を持つこともできます。\n\n\`\`\`kotlin\nclass BankAccount(var balance: Double) {\n    fun deposit(amount: Double) {\n        balance += amount\n    }\n}\n\`\`\``,
      examples: [
        {
          code: 'data class User(val id: Int, val name: String)\nval u = User(1, "Bob")\nprintln(u)',
          output: 'User(id=1, name=Bob)',
          explanation: 'data classは自動でtoString()を生成する。',
          codeJa: 'data class User(val id: Int, val name: String)\nval u = User(1, "Bob")\nprintln(u)',
          explanationJa: 'data classは自動でtoString()を生成する。'
        },
        {
          code: 'class BankAccount(var balance: Double) {\n  fun deposit(amount: Double) { balance += amount }\n}\nval account = BankAccount(100.0)\naccount.deposit(50.0)\nprintln(account.balance)',
          output: '150.0',
          explanation: 'depositメソッドで残高を増やせる。',
          codeJa: 'class BankAccount(var balance: Double) {\n  fun deposit(amount: Double) { balance += amount }\n}\nval account = BankAccount(100.0)\naccount.deposit(50.0)\nprintln(account.balance)',
          explanationJa: 'depositメソッドで残高を増やせる。'
        }
      ],
      quickOutput: {
        prompt: 'What is the output of println(song1) if song1 = Song("Imagine", "John Lennon", 183)?',
        promptJa: 'song1 = Song("Imagine", "John Lennon", 183) の場合 println(song1) の出力は？',
        answer: 'Song(title=Imagine, artist=John Lennon, durationSeconds=183)',
        answerJa: 'Song(title=Imagine, artist=John Lennon, durationSeconds=183)',
        explanation: 'data classのtoString()が自動生成される。',
        explanationJa: 'data classのtoString()が自動生成される。'
      },
      starterCode: `data class Song(val title: String, val artist: String, val durationSeconds: Int)\nfun main() {\n  val song1 = Song("Imagine", "John Lennon", 183)\n  val song2 = Song("Yesterday", "The Beatles", 125)\n  println(song1)\n  println(song2)\n  val isLong = song1.durationSeconds > 180\n  println(isLong)\n}`,
      practicePrompt: 'Define data class Song. Create two songs, print them, and check if first is longer than 180 seconds.',
      practicePromptJa: "data class `Song`を定義してください。`title`（String）、`artist`（String）、`durationSeconds`（Int）を持ちます。2つの曲のインスタンスを作成し、出力してください。次に、最初の曲が180秒より長い場合にtrueになる変数`isLong`を作成してください。",
      expectedOutputDescription: 'Song(title=Imagine, artist=John Lennon, durationSeconds=183)\nSong(title=Yesterday, artist=The Beatles, durationSeconds=125)\ntrue',
      expectedOutputDescriptionJa: "曲の詳細が出力され、boolean型のチェック結果が表示される。",
      quizzes: [
        {
          id: 'q1',
          type: 'choice',
          question: 'What does data class Song(val t: String, val a: String, val d: Int) auto-generate?',
          questionJa: 'data class Song(val t: String, val a: String, val d: Int)は何を自動生成しますか？',
          options: ['toString()', 'equals()', 'copy()', 'All of the above'],
          answer: 'All of the above',
          answerJa: 'All of the above',
          hint: 'Kotlinのdata classの特徴を思い出しましょう。',
          hintJa: 'Kotlinのdata classの特徴を思い出しましょう。',
          explanation: 'data classはtoString, equals, copyを自動生成します。',
          explanationJa: 'data classはtoString, equals, copyを自動生成します。'
        },
        {
          id: 'q2',
          type: 'fill',
          question: 'Fill in the blank: class ___(var balance: Double)',
          questionJa: '空欄を埋めてください: class ___(var balance: Double)',
          answer: 'BankAccount',
          answerJa: 'BankAccount',
          hint: '残高を管理するクラス名。',
          hintJa: '残高を管理するクラス名。',
          explanation: 'BankAccountは残高を管理するクラス。',
          explanationJa: 'BankAccountは残高を管理するクラス。'
        }
      ],
      grading: { minScore: 0.7, total: 10 },
      resultFlow: {
        pass: [
          { label: '次へ進む', action: 'next', labelJa: '次へ進む' },
          { label: 'ヒントを見てやり直す', action: 'hint', labelJa: 'ヒントを見てやり直す' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ],
        fail: [
          { label: '諦めてフィードバック・ヒントを見る', action: 'hint', labelJa: '諦めてフィードバック・ヒントを見る' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ]
      }
  },
  {
  id: 'kotlin-collections',
    title: '5. Collections & Lambdas',
    titleJa: '5. コレクションとラムダ',
    category: TopicCategory.MOBILE_KOTLIN,
    difficulty: 'Intermediate',
    description: 'Manage lists and use functional programming (filter, map).',
    descriptionJa: 'データのリストを管理します。関数型プログラミング（filter、map）を学んで効率的にデータを処理しましょう。',
    contentMarkdown: `Kotlin collections: list, map, filter, and lambdas.`,
    contentMarkdownJa: `# データのリスト処理\n\nアプリはめったに1つのアイテムだけを扱いません。友達の*リスト*、設定の*マップ*などがあります。\n\n### リスト\n\`\`\`kotlin\nval numbers = listOf(1, 2, 3, 4, 5) // 読み取り専用\nval activeUsers = mutableListOf("Alice", "Bob") // 可変\n\`\`\`\n\n### 関数型操作（ラムダ）\n手動で\`for\`ループを書く代わりに、Kotlinでは**ラムダ**（コードブロック）を使ってコレクションを変換できます。\n\n*   .filter { it > 5 }: ロジックに一致するアイテムのみを保持。\n*   .map { it * 2 }: すべてのアイテムを変換。\n*   .forEach { println(it) }: 各アイテムに対して何かを実行。\n\n\`\`\`kotlin\nval names = listOf("Alice", "Bob", "Charlie")\nval aNames = names.filter { it.startsWith("A") } // ["Alice"]\n\`\`\``,
    examples: [
      {
        code: 'val numbers = listOf(1, 2, 3, 4, 5)\nval even = numbers.filter { it % 2 == 0 }\nprintln(even)',
        output: '[2, 4]',
        explanation: 'filterで偶数のみ抽出。',
        codeJa: 'val numbers = listOf(1, 2, 3, 4, 5)\nval even = numbers.filter { it % 2 == 0 }\nprintln(even)',
        explanationJa: 'filterで偶数のみ抽出。'
      },
      {
        code: 'val names = listOf("Alice", "Bob", "Charlie")\nval aNames = names.filter { it.startsWith("A") }\nprintln(aNames)',
        output: '[Alice]',
        explanation: 'filterでAから始まる名前のみ抽出。',
        codeJa: 'val names = listOf("Alice", "Bob", "Charlie")\nval aNames = names.filter { it.startsWith("A") }\nprintln(aNames)',
        explanationJa: 'filterでAから始まる名前のみ抽出。'
      }
    ],
    quickOutput: {
      prompt: 'What is the output of println(result) if result = listOf(20, 40, 60, 80, 100)?',
      promptJa: 'result = listOf(20, 40, 60, 80, 100) の場合 println(result) の出力は？',
      answer: '[20, 40, 60, 80, 100]',
      answerJa: '[20, 40, 60, 80, 100]',
      explanation: 'リストの内容がそのまま出力される。',
      explanationJa: 'リストの内容がそのまま出力される。'
    },
    starterCode: `fun main() {\n  val numbers = (1..10).toList()\n  val even = numbers.filter { it % 2 == 0 }\n  val result = even.map { it * 10 }\n  println(result)\n}`,
    practicePrompt: 'Create a list 1-10, filter even, map to x10, print result.',
    practicePromptJa: "1から10までの整数のリストを作成してください。演算子を連鎖させて：1) 偶数のみを保持するfilter、2) それらを10倍するmap、3) 最終リストを出力。",
    expectedOutputDescription: '[20, 40, 60, 80, 100]',
    expectedOutputDescriptionJa: "出力は[20, 40, 60, 80, 100]であるべきです。",
    quizzes: [
      {
        id: 'q1',
        type: 'choice',
        question: 'Which function transforms every element in a list?',
        questionJa: 'リストの全要素を変換する関数は？',
        options: ['filter', 'map', 'forEach'],
        answer: 'map',
        answerJa: 'map',
        hint: '変換はmap。filterは抽出。',
        hintJa: '変換はmap。filterは抽出。',
        explanation: 'mapは各要素を変換する。',
        explanationJa: 'mapは各要素を変換する。'
      },
      {
        id: 'q2',
        type: 'fill',
        question: 'Fill in the blank: val even = numbers.____ { it % 2 == 0 }',
        questionJa: '空欄を埋めてください: val even = numbers.____ { it % 2 == 0 }',
        answer: 'filter',
        answerJa: 'filter',
        hint: '条件で抽出する関数。',
        hintJa: '条件で抽出する関数。',
        explanation: 'filterは条件で抽出する。',
        explanationJa: 'filterは条件で抽出する。'
      }
    ],
    grading: { minScore: 0.7, total: 10 },
    resultFlow: {
      pass: [
        { label: '次へ進む', action: 'next', labelJa: '次へ進む' },
        { label: 'ヒントを見てやり直す', action: 'hint', labelJa: 'ヒントを見てやり直す' },
        { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
      ],
      fail: [
        { label: '諦めてフィードバック・ヒントを見る', action: 'hint', labelJa: '諦めてフィードバック・ヒントを見る' },
        { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
      ]
    }
  },
  {
  id: 'kotlin-error-handling',
    title: '6. Error Handling',
    titleJa: '6. エラーハンドリング',
    category: TopicCategory.MOBILE_KOTLIN,
    difficulty: 'Intermediate',
    description: 'Handle errors gracefully with try-catch-finally and custom exceptions.',
    descriptionJa: 'エラーを優雅に処理します。try-catch-finallyとカスタム例外の作成方法を学びます。',
    contentMarkdown: `Kotlin error handling: try, catch, finally, and exceptions.`,
    contentMarkdownJa: `# 実際のアプリでのエラー処理\n\n予期しないことが起こるとアプリはクラッシュします：ネットワーク障害、ファイルの欠落、ユーザーの無効な入力など。これらを優雅に処理する必要があります。\n\n### Try-Catch-Finally\nリスクのあるコードを\`try\`ブロックでラップします。エラーが発生した場合、\`catch\`が処理します。\`finally\`は常に実行されます（クリーンアップ）。\n\n\`\`\`kotlin\nfun parseNumber(input: String): Int? {\n    return try {\n        input.toInt()\n    } catch (e: NumberFormatException) {\n        println("無効な数値: $input")\n        null\n    } finally {\n        println("パース試行完了")\n    }\n}\n\`\`\`\n\n### 例外のスロー\n何かがうまくいかないときに独自のエラーを作成してスローできます。\n\n\`\`\`kotlin\nfun withdraw(amount: Double, balance: Double): Double {\n    if (amount > balance) {\n        throw IllegalArgumentException("残高不足")\n    }\n    return balance - amount\n}\n\`\`\`\n\n### 一般的な例外\n*   \`NullPointerException\`: nullへの安全でないアクセス\n*   \`IllegalArgumentException\`: 無効な関数引数\n*   \`IOException\`: ファイル/ネットワークの問題`,
    examples: [
      {
        code: 'fun parseNumber(input: String): Int? = try { input.toInt() } catch (e) { null }\nprintln(parseNumber("123"))\nprintln(parseNumber("abc"))',
        output: '123\nnull',
        explanation: 'try-catchで例外を安全に処理。',
        codeJa: 'fun parseNumber(input: String): Int? = try { input.toInt() } catch (e) { null }\nprintln(parseNumber("123"))\nprintln(parseNumber("abc"))',
        explanationJa: 'try-catchで例外を安全に処理。'
      },
      {
        code: 'fun withdraw(amount: Double, balance: Double): Double {\n  if (amount > balance) throw IllegalArgumentException("残高不足")\n  return balance - amount\n}\nprintln(withdraw(50.0, 100.0))',
        output: '50.0',
        explanation: '条件で例外をスロー。',
        codeJa: 'fun withdraw(amount: Double, balance: Double): Double {\n  if (amount > balance) throw IllegalArgumentException("残高不足")\n  return balance - amount\n}\nprintln(withdraw(50.0, 100.0))',
        explanationJa: '条件で例外をスロー。'
      }
    ],
    quickOutput: {
      prompt: 'What is the output of parseNumber("abc")?',
      promptJa: 'parseNumber("abc")の出力は？',
      answer: 'null',
      answerJa: 'null',
      explanation: 'abcはIntに変換できないのでcatchでnullが返る。',
      explanationJa: 'abcはIntに変換できないのでcatchでnullが返る。'
    },
    starterCode: `fun main() {\n  val name: String? = null\n  println(name?.length)\n}`,
    practicePrompt: 'Write validateAge(age: Int?): returns "Valid", throws if out of range, "Null age" if null. Test with try-catch.',
    practicePromptJa: "関数`validateAge(age: Int?)`を書いてください：1) ageが0〜150の間なら'Valid'を返す、2) ageが負または> 150ならIllegalArgumentExceptionをスロー、3) ageがnullなら'Null age'を返す。main()でtry-catchを使ってテストしてください。",
    expectedOutputDescription: 'Valid\nException: Invalid age\nNull age',
    expectedOutputDescriptionJa: "検証の成功、キャッチされた例外、null処理を示す出力。",
    quizzes: [
      {
        id: 'q1',
        type: 'choice',
        question: 'Which block always runs after try/catch?',
        questionJa: 'try/catchの後に必ず実行されるブロックは？',
        options: ['finally', 'catch', 'throw'],
        answer: 'finally',
        answerJa: 'finally',
        hint: 'クリーンアップ処理に使う。',
        hintJa: 'クリーンアップ処理に使う。',
        explanation: 'finallyは例外の有無に関わらず必ず実行される。',
        explanationJa: 'finallyは例外の有無に関わらず必ず実行される。'
      },
      {
        id: 'q2',
        type: 'fill',
        question: 'Fill in the blank: throw IllegalArgumentException("___")',
        questionJa: '空欄を埋めてください: throw IllegalArgumentException("___")',
        answer: 'Invalid value',
        answerJa: 'Invalid value',
        hint: '例外のメッセージ。',
        hintJa: '例外のメッセージ。',
        explanation: '例外のメッセージは自由に設定できる。',
        explanationJa: '例外のメッセージは自由に設定できる。'
      }
    ],
    grading: { minScore: 0.7, total: 10 },
    resultFlow: {
      pass: [
        { label: '次へ進む', action: 'next', labelJa: '次へ進む' },
        { label: 'ヒントを見てやり直す', action: 'hint', labelJa: 'ヒントを見てやり直す' },
        { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
      ],
      fail: [
        { label: '諦めてフィードバック・ヒントを見る', action: 'hint', labelJa: '諦めてフィードバック・ヒントを見る' },
        { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
      ]
    }
  },
  {
    id: 'kotlin-scope-functions',
      title: '7. Kotlin Scope Functions',
      titleJa: '7. スコープ関数と拡張関数',
      category: TopicCategory.MOBILE_KOTLIN,
      difficulty: 'Intermediate',
      description: 'Write clean code with let, apply, also, run, with, and extension functions.',
      descriptionJa: 'let, apply, also, run, withなどのスコープ関数と拡張関数で、よりクリーンなコードを書きましょう。',
      contentMarkdown: `Kotlin scope functions and extension functions.`,
      contentMarkdownJa: `# スコープ関数と拡張関数\n\nKotlinには、オブジェクトの初期化や一時的な処理に便利な**スコープ関数**があります。\n\n- let: 一時変数やnull安全\n- apply: オブジェクト初期化\n- also: ログや副作用\n- run: 式の評価\n- with: 複数プロパティ操作\n\n\`\`\`kotlin\nval user = User().apply {\n  name = "Alice"\n  age = 20\n}\n\`\`\`\n\n### 拡張関数\n既存クラスに新しい関数を追加できます。\n\n\`\`\`kotlin\nfun String.isEmail(): Boolean = contains("@")\n\`\`\``,
      examples: [
        {
          code: 'val list = mutableListOf(1,2,3)\nlist.apply { add(4) }\nprintln(list)',
          output: '[1, 2, 3, 4]',
          explanation: 'applyでリストに要素追加。',
          codeJa: 'val list = mutableListOf(1,2,3)\nlist.apply { add(4) }\nprintln(list)',
          explanationJa: 'applyでリストに要素追加。'
        },
        {
          code: 'fun String.isEmail(): Boolean = contains("@")\nprintln("test@example.com".isEmail())',
          output: 'true',
          explanation: '拡張関数でString型に新機能追加。',
          codeJa: 'fun String.isEmail(): Boolean = contains("@")\nprintln("test@example.com".isEmail())',
          explanationJa: '拡張関数でString型に新機能追加。'
        }
      ],
      quickOutput: {
        prompt: 'What is the output of email.preview() if body = "This is a long email body for preview."?',
        promptJa: 'body = "This is a long email body for preview." の場合 email.preview() の出力は？',
        answer: 'This is a long email b',
        answerJa: 'This is a long email b',
        explanation: 'bodyの先頭20文字が返る。',
        explanationJa: 'bodyの先頭20文字が返る。'
      },
      starterCode: `data class Email(var subject: String = "", var body: String = "")\nfun Email.preview(): String = body.take(20)\nfun main() {\n  val email = Email().apply {\n    subject = "Hello"\n    body = "This is a long email body for preview."\n  }\n  println(email.preview())\n}`,
      practicePrompt: 'Create Email data class, use apply to set fields, add preview() extension to return first 20 chars of body.',
      practicePromptJa: "Emailデータクラスを作成し、applyでフィールドを設定してください。bodyの先頭20文字を返す拡張関数preview()を追加し、出力してください。",
      expectedOutputDescription: 'This is a long email b',
      expectedOutputDescriptionJa: "bodyの先頭20文字が出力される。",
      quizzes: [
        {
          id: 'q1',
          type: 'choice',
          question: 'Which scope function is best for object initialization?',
          questionJa: 'オブジェクト初期化に最適なスコープ関数は？',
          options: ['let', 'apply', 'run'],
          answer: 'apply',
          answerJa: 'apply',
          hint: 'プロパティ設定に使う。',
          hintJa: 'プロパティ設定に使う。',
          explanation: 'applyは初期化に便利。',
          explanationJa: 'applyは初期化に便利。'
        },
        {
          id: 'q2',
          type: 'fill',
          question: 'Fill in the blank: fun String.____(): Boolean = contains("@")',
          questionJa: '空欄を埋めてください: fun String.____(): Boolean = contains("@")',
          answer: 'isEmail',
          answerJa: 'isEmail',
          hint: 'メール判定の関数名。',
          hintJa: 'メール判定の関数名。',
          explanation: 'isEmailはメール判定の拡張関数名。',
          explanationJa: 'isEmailはメール判定の拡張関数名。'
        }
      ],
      grading: { minScore: 0.7, total: 10 },
      resultFlow: {
        pass: [
          { label: '次へ進む', action: 'next', labelJa: '次へ進む' },
          { label: 'ヒントを見てやり直す', action: 'hint', labelJa: 'ヒントを見てやり直す' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ],
        fail: [
          { label: '諦めてフィードバック・ヒントを見る', action: 'hint', labelJa: '諦めてフィードバック・ヒントを見る' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ]
      }
  },
  {
    id: 'kotlin-advanced-oop',
      title: '8. Advanced OOP Patterns',
      titleJa: '8. 高度なOOPパターン',
      category: TopicCategory.MOBILE_KOTLIN,
      difficulty: 'Advanced',
      description: 'Master sealed class, enum, object, and companion object.',
      descriptionJa: 'sealed class、enum、object、companion objectなど高度なOOPパターンを習得しましょう。',
      contentMarkdown: `Kotlin advanced OOP: sealed class, enum, object, companion object.`,
      contentMarkdownJa: `# 高度なOOPパターン\n\nKotlinでは、より安全で表現力豊かなOOPが可能です。\n\n- sealed class: 限定された型階層\n- enum: 定数の集合\n- object: シングルトン\n- companion object: クラスの静的メンバー\n\n\`\`\`kotlin\nsealed class PaymentStatus {\n  object Pending : PaymentStatus()\n  data class Success(val transactionId: String) : PaymentStatus()\n  data class Failed(val reason: String) : PaymentStatus()\n}\nfun getMessage(status: PaymentStatus): String = when (status) {\n  is PaymentStatus.Pending -> "Pending"\n  is PaymentStatus.Success -> "Success: \${status.transactionId}"\n  is PaymentStatus.Failed -> "Failed: \${status.reason}"\n}\n\`\`\``,
      examples: [
        {
          code: 'enum class Color { RED, GREEN, BLUE }\nprintln(Color.RED)',
          output: 'RED',
          explanation: 'enumは定数の集合。',
          codeJa: 'enum class Color { RED, GREEN, BLUE }\nprintln(Color.RED)',
          explanationJa: 'enumは定数の集合。'
        },
        {
          code: 'object Singleton { val value = 42 }\nprintln(Singleton.value)',
          output: '42',
          explanation: 'objectはシングルトン。',
          codeJa: 'object Singleton { val value = 42 }\nprintln(Singleton.value)',
          explanationJa: 'objectはシングルトン。'
        }
      ],
      quickOutput: {
        prompt: 'What is the output of getMessage(PaymentStatus.Success("TX123"))?',
        promptJa: 'getMessage(PaymentStatus.Success("TX123")) の出力は？',
        answer: 'Success: TX123',
        answerJa: 'Success: TX123',
        explanation: 'SuccessのtransactionIdが出力される。',
        explanationJa: 'SuccessのtransactionIdが出力される。'
      },
      starterCode: `sealed class PaymentStatus {\n  object Pending : PaymentStatus()\n  data class Success(val transactionId: String) : PaymentStatus()\n  data class Failed(val reason: String) : PaymentStatus()\n}\nfun getMessage(status: PaymentStatus): String = when (status) {\n  is PaymentStatus.Pending -> "Pending"\n  is PaymentStatus.Success -> "Success: \${status.transactionId}"\n  is PaymentStatus.Failed -> "Failed: \${status.reason}"\n}\nfun main() {\n  println(getMessage(PaymentStatus.Pending))\n  println(getMessage(PaymentStatus.Success("TX123")))\n  println(getMessage(PaymentStatus.Failed("Card declined")))\n}`,
      practicePrompt: 'Create sealed class PaymentStatus: Pending, Success, Failed. Write getMessage() for each case.',
      practicePromptJa: "sealed class PaymentStatusを作成し、Pending, Success, Failedの3つの状態を持たせてください。getMessage()関数で各状態に応じたメッセージを返すようにしてください。",
      expectedOutputDescription: 'Pending\nSuccess: TX123\nFailed: Card declined',
      expectedOutputDescriptionJa: "各状態に応じたメッセージが出力される。",
      quizzes: [
        {
          id: 'q1',
          type: 'choice',
          question: 'Which keyword creates a singleton object?',
          questionJa: 'シングルトンオブジェクトを作るキーワードは？',
          options: ['object', 'class', 'enum'],
          answer: 'object',
          answerJa: 'object',
          hint: '1つだけのインスタンス。',
          hintJa: '1つだけのインスタンス。',
          explanation: 'objectはシングルトンを作る。',
          explanationJa: 'objectはシングルトンを作る。'
        },
        {
          id: 'q2',
          type: 'fill',
          question: 'Fill in the blank: sealed class ___',
          questionJa: '空欄を埋めてください: sealed class ___',
          answer: 'PaymentStatus',
          answerJa: 'PaymentStatus',
          hint: '支払い状態を表すクラス名。',
          hintJa: '支払い状態を表すクラス名。',
          explanation: 'PaymentStatusはsealed classの例。',
          explanationJa: 'PaymentStatusはsealed classの例。'
        }
      ],
      grading: { minScore: 0.7, total: 10 },
      resultFlow: {
        pass: [
          { label: '次へ進む', action: 'next', labelJa: '次へ進む' },
          { label: 'ヒントを見てやり直す', action: 'hint', labelJa: 'ヒントを見てやり直す' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ],
        fail: [
          { label: '諦めてフィードバック・ヒントを見る', action: 'hint', labelJa: '諦めてフィードバック・ヒントを見る' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ]
      }
  },
  {
    id: 'kotlin-collections-advanced',
    title: '9. Advanced Collections',
    titleJa: '9. 高度なコレクション',
    category: TopicCategory.MOBILE_KOTLIN,
    difficulty: 'Advanced',
    description: 'Master groupBy, partition, flatMap, and Sequence for performance.',
    descriptionJa: 'groupBy、partition、flatMap、Sequenceなどを使ってパフォーマンスの高いコレクション操作を習得しましょう。',
    contentMarkdown: `Kotlin advanced collections: groupBy, partition, flatMap, sequence.`,
    contentMarkdownJa: `# 高度なコレクション操作\n\nKotlinでは、複雑なデータ処理も簡単にできます。\n\n- groupBy: グループ分け\n- partition: 条件で分割\n- flatMap: ネスト解除\n- Sequence: 大量データの遅延処理\n\n\`\`\`kotlin\nval tags = listOf("kotlin,programming", "java,programming", "design,ui")\nval flatTags = tags.flatMap { it.split(",") }\nval tagCounts = flatTags.groupBy { it }.mapValues { it.value.size }\nprintln(flatTags)\nprintln(tagCounts)\n\`\`\``,
    starterCode: `fun main() {\n  val tags = listOf("kotlin,programming", "java,programming", "design,ui")\n  val flatTags = tags.flatMap { it.split(",") }\n  val tagCounts = flatTags.groupBy { it }.mapValues { it.value.size }\n  println(flatTags)\n  println(tagCounts)\n}`,
    practicePrompt: 'Create list of tag strings, use flatMap to extract all tags, groupBy to count frequency.',
    practicePromptJa: "タグ文字列のリストを作成し、flatMapで全タグを抽出、groupByで頻度を数えて出力してください。",
    expectedOutputDescription: '[kotlin, programming, java, programming, design, ui]\n{kotlin=1, programming=2, java=1, design=1, ui=1}',
  expectedOutputDescriptionJa: "全タグのリストと、各タグの出現回数が出力される。",
      examples: [
        {
          code: 'val tags = listOf("a,b", "c,d")\nval flat = tags.flatMap { it.split(",") }\nprintln(flat)',
          output: '[a, b, c, d]',
          explanation: 'flatMapでネスト解除。',
          codeJa: 'val tags = listOf("a,b", "c,d")\nval flat = tags.flatMap { it.split(",") }\nprintln(flat)',
          explanationJa: 'flatMapでネスト解除。'
        },
        {
          code: 'val nums = listOf(1,2,3,4,5)\nval (evens, odds) = nums.partition { it % 2 == 0 }\nprintln(evens)\nprintln(odds)',
          output: '[2, 4]\n[1, 3, 5]',
          explanation: 'partitionで偶数・奇数分割。',
          codeJa: 'val nums = listOf(1,2,3,4,5)\nval (evens, odds) = nums.partition { it % 2 == 0 }\nprintln(evens)\nprintln(odds)',
          explanationJa: 'partitionで偶数・奇数分割。'
        }
      ],
      quickOutput: {
        prompt: 'What is the output of tagCounts if flatTags = [a, b, a, c]?',
        promptJa: 'flatTags = [a, b, a, c] の場合 tagCounts の出力は？',
        answer: '{a=2, b=1, c=1}',
        answerJa: '{a=2, b=1, c=1}',
        explanation: 'groupByで各タグの出現回数を数える。',
        explanationJa: 'groupByで各タグの出現回数を数える。'
      },
      quizzes: [
        {
          id: 'q1',
          type: 'choice',
          question: 'Which function splits and flattens nested lists?',
          questionJa: 'ネストしたリストを分割・平坦化する関数は？',
          options: ['flatMap', 'groupBy', 'partition'],
          answer: 'flatMap',
          answerJa: 'flatMap',
          hint: 'ネスト解除はflatMap。',
          hintJa: 'ネスト解除はflatMap。',
          explanation: 'flatMapはネスト解除に使う。',
          explanationJa: 'flatMapはネスト解除に使う。'
        },
        {
          id: 'q2',
          type: 'fill',
          question: 'Fill in the blank: val (evens, odds) = nums.____ { it % 2 == 0 }',
          questionJa: '空欄を埋めてください: val (evens, odds) = nums.____ { it % 2 == 0 }',
          answer: 'partition',
          answerJa: 'partition',
          hint: '条件で分割する関数。',
          hintJa: '条件で分割する関数。',
          explanation: 'partitionは条件で分割する。',
          explanationJa: 'partitionは条件で分割する。'
        }
      ],
      grading: { minScore: 0.7, total: 10 },
      resultFlow: {
        pass: [
          { label: '次へ進む', action: 'next', labelJa: '次へ進む' },
          { label: 'ヒントを見てやり直す', action: 'hint', labelJa: 'ヒントを見てやり直す' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ],
        fail: [
          { label: '諦めてフィードバック・ヒントを見る', action: 'hint', labelJa: '諦めてフィードバック・ヒントを見る' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ]
      }
  },
  {
    id: 'kotlin-generics',
    title: '10. Generics & Type Safety',
    titleJa: '10. ジェネリクスと型安全',
    category: TopicCategory.MOBILE_KOTLIN,
    difficulty: 'Advanced',
    description: 'Write reusable, type-safe code with generics. Understand in/out variance.',
    descriptionJa: 'ジェネリクスで再利用可能かつ型安全なコードを書きましょう。in/outのバリアンスも理解します。',
    contentMarkdown: `Kotlin generics: generic functions, classes, constraints, variance.`,
    contentMarkdownJa: `# ジェネリクスと型安全\n\nKotlinでは、型をパラメータ化して再利用性と安全性を高めます。\n\n- ジェネリック関数・クラス\n- 型制約\n- バリアンス（in/out）\n\n\`\`\`kotlin\ndata class Product(val id: Int, val name: String)\nclass Repository<T> {\n  private val items = mutableListOf<T>()\n  fun add(item: T) { items.add(item) }\n  fun getAll(): List<T> = items\n  fun findById(id: Int, getId: (T) -> Int): T? = items.find { getId(it) == id }\n}\nfun main() {\n  val repo = Repository<Product>()\n  repo.add(Product(1, "Pen"))\n  repo.add(Product(2, "Book"))\n  println(repo.getAll())\n  println(repo.findById(2) { it.id })\n}\n\`\`\``,
    starterCode: `data class Product(val id: Int, val name: String)\nclass Repository<T> {\n  private val items = mutableListOf<T>()\n  fun add(item: T) { items.add(item) }\n  fun getAll(): List<T> = items\n  fun findById(id: Int, getId: (T) -> Int): T? = items.find { getId(it) == id }\n}\nfun main() {\n  val repo = Repository<Product>()\n  repo.add(Product(1, "Pen"))\n  repo.add(Product(2, "Book"))\n  println(repo.getAll())\n  println(repo.findById(2) { it.id })\n}`,
    practicePrompt: 'Create generic Repository<T> with add, getAll, findById. Test with Product data class.',
    practicePromptJa: "ジェネリックなRepository<T>クラスを作成し、add, getAll, findByIdメソッドを実装してください。Productデータクラスでテストしましょう。",
    expectedOutputDescription: '[Product(id=1, name=Pen), Product(id=2, name=Book)]\nProduct(id=2, name=Book)',
    expectedOutputDescriptionJa: "ProductリストとID検索の結果が出力される。"
  ,
  examples: [
        {
          code: 'class Box<T>(val value: T)\nval intBox = Box(123)\nval strBox = Box("abc")\nprintln(intBox.value)\nprintln(strBox.value)',
          output: '123\nabc',
          explanation: 'Boxはジェネリッククラス。型を自由に指定できる。',
          codeJa: 'class Box<T>(val value: T)\nval intBox = Box(123)\nval strBox = Box("abc")\nprintln(intBox.value)\nprintln(strBox.value)',
          explanationJa: 'Boxはジェネリッククラス。型を自由に指定できる。'
        },
        {
          code: 'fun <T> singletonList(item: T): List<T> = listOf(item)\nprintln(singletonList(42))',
          output: '[42]',
          explanation: 'ジェネリック関数で任意型のリスト生成。',
          codeJa: 'fun <T> singletonList(item: T): List<T> = listOf(item)\nprintln(singletonList(42))',
          explanationJa: 'ジェネリック関数で任意型のリスト生成。'
        }
      ],
      quickOutput: {
        prompt: 'What is the output of repo.getAll() if repo contains Product(1, "Pen") and Product(2, "Book")?',
        promptJa: 'repoにProduct(1, "Pen")とProduct(2, "Book")が入っている場合 repo.getAll() の出力は？',
        answer: '[Product(id=1, name=Pen), Product(id=2, name=Book)]',
        answerJa: '[Product(id=1, name=Pen), Product(id=2, name=Book)]',
        explanation: 'リストの内容がそのまま出力される。',
        explanationJa: 'リストの内容がそのまま出力される。'
      },
      quizzes: [
        {
          id: 'q1',
          type: 'choice',
          question: 'Which symbol is used for generics in Kotlin?',
          questionJa: 'Kotlinでジェネリクスに使う記号は？',
          options: ['<>', '[]', '{}'],
          answer: '<>',
          answerJa: '<>',
          hint: '型パラメータは<>で囲む。',
          hintJa: '型パラメータは<>で囲む。',
          explanation: 'ジェネリクスは<>で型を指定する。',
          explanationJa: 'ジェネリクスは<>で型を指定する。'
        },
        {
          id: 'q2',
          type: 'fill',
          question: 'Fill in the blank: class Repository<___>',
          questionJa: '空欄を埋めてください: class Repository<___>',
          answer: 'T',
          answerJa: 'T',
          hint: '型パラメータの名前。',
          hintJa: '型パラメータの名前。',
          explanation: 'Tは型パラメータの例。',
          explanationJa: 'Tは型パラメータの例。'
        }
      ],
      grading: { minScore: 0.7, total: 10 },
      resultFlow: {
        pass: [
          { label: '次へ進む', action: 'next', labelJa: '次へ進む' },
          { label: 'ヒントを見てやり直す', action: 'hint', labelJa: 'ヒントを見てやり直す' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ],
        fail: [
          { label: '諦めてフィードバック・ヒントを見る', action: 'hint', labelJa: '諦めてフィードバック・ヒントを見る' },
          { label: 'そのままやり直す', action: 'retry', labelJa: 'そのままやり直す' }
        ]
      }
  }
];

