// 日本語翻訳データ
export const topicTranslationsJa: Record<string, {
  title: string;
  description: string;
  contentMarkdown: string;
  practicePrompt: string;
  expectedOutputDescription: string;
}> = {
  'kotlin-basics-1': {
    title: '1. アプリのデータと変数',
    description: 'アプリがデータを保存する方法を学びましょう。valとvarの違い、基本的な型を理解します。',
    contentMarkdown: `
# アプリでのデータ保存

どんなアプリを作るにも、まずは情報を保存する必要があります。ユーザー名、ハイスコア、ログイン状態など。Kotlinはこれを簡潔かつ安全に行えます。

### 1. 読み取り専用 vs 可変
Kotlinは、変更可能な値と変更不可能な値を区別します。
*   **\`val\` (Value):** 不変。デフォルトでこれを使います。意図しないバグを防ぎます。
*   **\`var\` (Variable):** 可変。データが*変更される必要がある*場合のみ使います（例：カウンター）。

\`\`\`kotlin
val appName = "My Awesome App" // 変更できない
var userScore = 0              // 変更できる
userScore = 100
\`\`\`

### 2. 基本的な型
Kotlinは通常、型を推測します（型推論）が、基本を知っておく必要があります：
*   \`String\`: テキスト ("Hello")
*   \`Int\`: 整数 (42)
*   \`Double\`: 小数 (3.14)
*   \`Boolean\`: 真偽値 (true/false)

\`\`\`kotlin
val username: String = "DevUser"
val isPremium: Boolean = false
\`\`\`
    `,
    practicePrompt: "1. 名前を入れる箱 appName を作って「Taro」を入れよう（valで作る）\n2. メッセージの数 unreadMessages を作って「5」を入れよう（varで作る）\n3. appName と unreadMessages を println で出力しよう\n4. unreadMessages から2ひいて、新しい数字を println で出力しよう",
    expectedOutputDescription: "アプリ名と、更新されるメッセージ数を表示する出力。"
  },
  
  'kotlin-control-flow': {
    title: '2. ロジックと意思決定',
    description: 'アプリは判断を下す必要があります。if/elseとwhen式を学んでロジックを制御しましょう。',
    contentMarkdown: `
# 判断を下す

アプリは静的ではありません。データに反応します。ユーザーがログインしていればダッシュボードを表示し、そうでなければログイン画面を表示します。

### \`if\` 式
Kotlinでは、\`if\`は値を返します。状態を割り当てるのに最適です。

\`\`\`kotlin
val buttonColor = if (isValid) "Green" else "Red"
\`\`\`

### \`when\` 式
複数の可能性をチェックする場合（HTTPステータスコードやメニューオプションの処理など）は\`when\`を使います。多数のif-else文よりもクリーンです。

\`\`\`kotlin
val message = when (statusCode) {
    200 -> "成功"
    404 -> "見つかりません"
    500 -> "サーバーエラー"
    else -> "不明"
}
\`\`\`
    `,
    practicePrompt: "`batteryLevel`（Int型）という変数を作成してください。論理的なロジックを使用：レベル > 20なら'OK'を出力、5〜20の間なら'Low Battery'を出力、< 5なら'Shutdown Imminent'を出力してください。できれば`when`式の範囲（例：`in 0..5`）を使ってみてください！",
    expectedOutputDescription: "バッテリーレベルに基づいた正しいステータスメッセージ。"
  },

  'kotlin-functions-nulls': {
    title: '3. 関数とNull安全性',
    description: '関数でコードを構造化し、欠落データを安全に処理する方法を学びます（10億ドルの間違いを修正）。',
    contentMarkdown: `
# モジュール化されたコードと安全性

アプリが成長すると、すべてを\`main()\`に入れることはできません。タスクを整理するために**関数**が必要です。

### 関数
\`\`\`kotlin
fun sendNotification(message: String, userId: Int): Boolean {
    println("Sending '$message' to User $userId")
    return true
}
\`\`\`

### Null安全性（重要！）
多くの言語では、欠落値にアクセスするとアプリがクラッシュします。Kotlinはこれを処理することを強制します。
*   \`String\`: nullにはできません。
*   \`String?\`: nullにできます。

\`\`\`kotlin
var email: String? = null
// println(email.length) // コンパイラエラー！unsafe.
println(email?.length)   // 安全呼び出し。emailがnullならnullを出力。
println(email?.length ?: 0) // Elvis演算子：nullなら0を使用。
\`\`\`
    `,
    practicePrompt: "`greetUser(name: String?)`という関数を書いてください。この関数はStringを返します。nameが提供されていれば'Hello, [name]!'を返し、nameがnullなら'Hello, Guest!'を返します。main()でテストしてください。",
    expectedOutputDescription: "2つの挨拶：特定の名前での挨拶と、null入力の一般的な挨拶。"
  },

  'kotlin-oop-classes': {
    title: '4. データのモデリング（クラス）',
    description: '実際のアプリは実際のオブジェクトを管理します。クラスと強力な`data class`を学びましょう。',
    contentMarkdown: `
# 現実世界のモデリング

ショップを作るには\`Product\`が必要です。ソーシャルネットワークを作るには\`Post\`が必要です。クラスを使ってこれらの設計図を定義できます。

### \`data class\`
Kotlinには**データクラス**というスーパーパワーがあります。自動的に\`toString()\`、\`equals()\`、\`copy()\`を生成してくれます。データを保持するのに最適です。

\`\`\`kotlin
data class User(val id: Int, val name: String, val isOnline: Boolean)

val u1 = User(1, "Alice", true)
println(u1) // 出力: User(id=1, name=Alice, isOnline=true)
\`\`\`

### メソッド
クラスは内部に関数（メソッド）を持つこともできます。

\`\`\`kotlin
class BankAccount(var balance: Double) {
    fun deposit(amount: Double) {
        balance += amount
    }
}
\`\`\`
    `,
    practicePrompt: "data class `Song`を定義してください。`title`（String）、`artist`（String）、`durationSeconds`（Int）を持ちます。2つの曲のインスタンスを作成し、出力してください。次に、最初の曲が180秒より長い場合にtrueになる変数`isLong`を作成してください。",
    expectedOutputDescription: "曲の詳細が出力され、boolean型のチェック結果が表示される。"
  },

  'kotlin-collections': {
    title: '5. コレクションとラムダ',
    description: 'データのリストを管理します。関数型プログラミング（filter、map）を学んで効率的にデータを処理しましょう。',
    contentMarkdown: `
# データのリスト処理

アプリはめったに1つのアイテムだけを扱いません。友達の*リスト*、設定の*マップ*などがあります。

### リスト
\`\`\`kotlin
val numbers = listOf(1, 2, 3, 4, 5) // 読み取り専用
val activeUsers = mutableListOf("Alice", "Bob") // 可変
\`\`\`

### 関数型操作（ラムダ）
手動で\`for\`ループを書く代わりに、Kotlinでは**ラムダ**（コードブロック）を使ってコレクションを変換できます。

*   \`.filter { it > 5 }\`: ロジックに一致するアイテムのみを保持。
*   \`.map { it * 2 }\`: すべてのアイテムを変換。
*   \`.forEach { println(it) }\`: 各アイテムに対して何かを実行。

\`\`\`kotlin
val names = listOf("Alice", "Bob", "Charlie")
val aNames = names.filter { it.startsWith("A") } // ["Alice"]
\`\`\`
    `,
    practicePrompt: "1から10までの整数のリストを作成してください。演算子を連鎖させて：1) 偶数のみを保持するfilter、2) それらを10倍するmap、3) 最終リストを出力。",
    expectedOutputDescription: "出力は[20, 40, 60, 80, 100]であるべきです。"
  },

  'kotlin-error-handling': {
    title: '6. エラーハンドリング',
    description: 'エラーを優雅に処理します。try-catch-finallyとカスタム例外の作成方法を学びます。',
    contentMarkdown: `
# 実際のアプリでのエラー処理

予期しないことが起こるとアプリはクラッシュします：ネットワーク障害、ファイルの欠落、ユーザーの無効な入力など。これらを優雅に処理する必要があります。

### Try-Catch-Finally
リスクのあるコードを\`try\`ブロックでラップします。エラーが発生した場合、\`catch\`が処理します。\`finally\`は常に実行されます（クリーンアップ）。

\`\`\`kotlin
fun parseNumber(input: String): Int? {
    return try {
        input.toInt()
    } catch (e: NumberFormatException) {
        println("無効な数値: $input")
        null
    } finally {
        println("パース試行完了")
    }
}
\`\`\`

### 例外のスロー
何かがうまくいかないときに独自のエラーを作成してスローできます。

\`\`\`kotlin
fun withdraw(amount: Double, balance: Double): Double {
    if (amount > balance) {
        throw IllegalArgumentException("残高不足")
    }
    return balance - amount
}
\`\`\`

### 一般的な例外
*   \`NullPointerException\`: nullへの安全でないアクセス
*   \`IllegalArgumentException\`: 無効な関数引数
*   \`IOException\`: ファイル/ネットワークの問題
    `,
    practicePrompt: "関数`validateAge(age: Int?)`を書いてください：1) ageが0〜150の間なら'Valid'を返す、2) ageが負または> 150ならIllegalArgumentExceptionをスロー、3) ageがnullなら'Null age'を返す。main()でtry-catchを使ってテストしてください。",
    expectedOutputDescription: "検証の成功、キャッチされた例外、null処理を示す出力。"
  },

  'kotlin-scope-functions': {
    title: '7. Kotlinスコープ関数',
    description: 'let、apply、also、run、withできれいなコードを書きましょう。拡張関数も！',
    contentMarkdown: `
# 慣用的なKotlin：スコープ関数

Kotlinは、コードをより簡潔で読みやすくする特別な関数を提供します。これらは**スコープ関数**と呼ばれます。

### ビッグ5
1. **\`let\`**: オブジェクトを変換して結果を返す。nullチェックに最適。
   \`\`\`kotlin
   val length = name?.let { it.length } ?: 0
   \`\`\`

2. **\`apply\`**: オブジェクトを設定してオブジェクト自体を返す。
   \`\`\`kotlin
   val user = User().apply {
       name = "Alice"
       age = 30
   }
   \`\`\`

3. **\`also\`**: 副作用（ログ、検証）を実行してオブジェクトを返す。
   \`\`\`kotlin
   val result = calculateScore().also { println("Score: $it") }
   \`\`\`

4. **\`run\`**: コードブロックを実行して結果を返す。ロジックと戻り値の両方が必要な場合に使用。
   \`\`\`kotlin
   val isValid = userInput.run {
       isNotEmpty() && length > 5
   }
   \`\`\`

5. **\`with\`**: オブジェクトの名前を繰り返さずに操作をグループ化。
   \`\`\`kotlin
   with(canvas) {
       drawCircle()
       drawLine()
   }
   \`\`\`

### 拡張関数
既存のクラスを変更せずに新しいメソッドを追加！

\`\`\`kotlin
fun String.isPalindrome(): Boolean {
    return this == this.reversed()
}

println("radar".isPalindrome()) // true
\`\`\`
    `,
    practicePrompt: "data class 'Email'をsubjectとbodyで作成してください。'apply'を使って両方のフィールドを持つインスタンスを構築してください。拡張関数'Email.preview()'を追加してbodyの最初の20文字を返すようにしてください。両方をテストしてください。",
    expectedOutputDescription: "Emailインスタンスが作成され、preview関数が正しく動作する。"
  },

  'kotlin-advanced-oop': {
    title: '8. 高度なOOPパターン',
    description: '本番環境対応のコードのためにsealed class、enum、object、companion objectをマスターしましょう。',
    contentMarkdown: `
# 本番環境対応のOOP

実際のアプリには洗練されたオブジェクトモデリングが必要です。Kotlinはこのための強力なツールを提供します。

### Sealed Class
制限されたクラス階層を表現します。状態管理と結果型に最適です。

\`\`\`kotlin
sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handleResult(result: Result) = when(result) {
    is Result.Success -> println("データ: \${result.data}")
    is Result.Error -> println("エラー: \${result.message}")
    Result.Loading -> println("読み込み中...")
}
\`\`\`

### Enum Class
プロパティとメソッドを持つ固定された定数のセット。

\`\`\`kotlin
enum class Priority(val level: Int) {
    LOW(1), MEDIUM(2), HIGH(3), CRITICAL(4)
}
\`\`\`

### Object（シングルトン）
厳密に1つのインスタンスを持つクラス。マネージャー、ファクトリー、ユーティリティに最適。

\`\`\`kotlin
object DatabaseManager {
    fun connect() { println("接続しました") }
}
DatabaseManager.connect()
\`\`\`

### Companion Object
クラス内の静的なようなメンバー。

\`\`\`kotlin
class User(val name: String) {
    companion object {
        fun createGuest() = User("ゲスト")
    }
}
val guest = User.createGuest()
\`\`\`
    `,
    practicePrompt: "sealed class 'PaymentStatus'を作成してください：Pending、Success(transactionId: String)、Failed(reason: String)。PaymentStatusを受け取り、各ケースに応じたユーザーフレンドリーなメッセージを返す関数を書いてください。",
    expectedOutputDescription: "すべての支払いステータスケースを適切なメッセージで正しく処理する関数。"
  },

  'kotlin-collections-advanced': {
    title: '9. 高度なコレクション',
    description: 'groupBy、partition、flatMap、Sequenceをマスターしてパフォーマンスを向上させましょう。',
    contentMarkdown: `
# 高度なコレクション操作

基本的なfilter/mapを超えて、Kotlinはデータ操作のための強力なツールを提供します。

### GroupBy
キーでアイテムをグループ化します。

\`\`\`kotlin
val users = listOf(
    User("Alice", 25),
    User("Bob", 25),
    User("Charlie", 30)
)
val byAge = users.groupBy { it.age }
// {25=[Alice, Bob], 30=[Charlie]}
\`\`\`

### Partition
条件に基づいてリストを2つに分割します。

\`\`\`kotlin
val (passed, failed) = scores.partition { it >= 60 }
\`\`\`

### FlatMap
ネストされたコレクションを変換してフラット化します。

\`\`\`kotlin
val nested = listOf(listOf(1, 2), listOf(3, 4))
val flat = nested.flatMap { it } // [1, 2, 3, 4]
\`\`\`

### Sequence（パフォーマンス）
大規模なデータセットの場合、遅延評価のために\`Sequence\`を使用します（操作は必要なときのみ実行されます）。

\`\`\`kotlin
val result = (1..1_000_000).asSequence()
    .filter { it % 2 == 0 }
    .map { it * 2 }
    .take(10)
    .toList()
\`\`\`
    `,
    practicePrompt: "タグを表す文字列のリストを作成してください：['kotlin,programming', 'java,programming', 'design,ui']。flatMapを使ってすべての個別タグを単一リストに抽出してください。次にgroupByを使って各タグの出現回数をカウントしてください。",
    expectedOutputDescription: "タグのフラットリストと、タグの頻度を示すマップ。"
  },

  'kotlin-generics': {
    title: '10. ジェネリクスと型安全性',
    description: 'ジェネリクスで再利用可能で型安全なコードを書きましょう。in/out変性を理解します。',
    contentMarkdown: `
# 再利用可能な型安全コード

ジェネリクスを使うと、型安全性を維持しながら、任意の型で動作する関数やクラスを書くことができます。

### ジェネリック関数
\`\`\`kotlin
fun <T> printList(items: List<T>) {
    items.forEach { println(it) }
}
printList(listOf(1, 2, 3))
printList(listOf("a", "b", "c"))
\`\`\`

### ジェネリッククラス
\`\`\`kotlin
class Box<T>(val value: T) {
    fun get(): T = value
}
val intBox = Box(42)
val strBox = Box("Hello")
\`\`\`

### 制約
ジェネリクスを特定の型に制限します。

\`\`\`kotlin
fun <T : Number> sum(a: T, b: T): Double {
    return a.toDouble() + b.toDouble()
}
\`\`\`

### 変性（in/out）
*   \`out T\`: プロデューサー（Tのみを返せる）
*   \`in T\`: コンシューマー（Tのみを受け取れる）

\`\`\`kotlin
interface Producer<out T> {
    fun produce(): T
}
interface Consumer<in T> {
    fun consume(item: T)
}
\`\`\`
    `,
    practicePrompt: "ジェネリッククラス'Repository<T>'を作成してください。可変リストを持ち、メソッド：add(item: T)、getAll(): List<T>、findById(id: Int, getId: (T) -> Int): T?を持ちます。data class 'Product(val id: Int, val name: String)'でテストしてください。",
    expectedOutputDescription: "RepositoryがProductインスタンスを正しく保存および取得する。"
  },

  'kotlin-coroutines-basics': {
    title: '11. 非同期プログラミング（Coroutines）',
    description: 'ブロックせずに非同期操作を処理します。suspend、launch、asyncを学びましょう。',
    contentMarkdown: `
# 非同期プログラミング

実際のアプリはネットワーク呼び出し、データベースクエリ、ファイルI/Oを実行します。これらには時間がかかります。コルーチンを使うと、同期的に見える非同期コードを書けます。

### Suspend関数
スレッドをブロックせずに一時停止および再開できる関数。

\`\`\`kotlin
suspend fun fetchData(): String {
    delay(1000) // ネットワーク呼び出しをシミュレート
    return "データ読み込み完了"
}
\`\`\`

### Launch（Fire and Forget）
結果を返さないコルーチンを開始します。

\`\`\`kotlin
GlobalScope.launch {
    val data = fetchData()
    println(data)
}
\`\`\`

### Async（結果を返す）
Deferred結果を返すコルーチンを開始します。

\`\`\`kotlin
val deferred = GlobalScope.async {
    fetchData()
}
val result = deferred.await()
\`\`\`

### Coroutine Scope
コルーチンのライフサイクルを管理する適切な方法。

\`\`\`kotlin
runBlocking {
    val result = async { fetchData() }
    println(result.await())
}
\`\`\`

**注意：** 本番環境では、適切なスコープ（AndroidのviewModelScope、lifecycleScope）で構造化された並行性を使用してください。
    `,
    practicePrompt: "2つのsuspend関数を作成してください：fetchWeather()（1秒遅延、'Sunny'を返す）とfetchNews()（2秒遅延、'10 articles'を返す）。asyncを使って両方を並列に呼び出し、結果を出力してください。合計時間を測定（約2秒であるべきで、3秒ではない）。",
    expectedOutputDescription: "両方の結果が出力され、合計時間約2秒で並列実行が証明される。"
  },

  'kotlin-file-io': {
    title: '12. ファイル操作',
    description: 'ファイルの読み書きを学びます。データ永続化と設定に不可欠です。',
    contentMarkdown: `
# ファイルの扱い

アプリはデータの保存、設定ファイルの読み取り、ログの処理を行う必要があることがよくあります。

### ファイルの読み取り
\`\`\`kotlin
import java.io.File

val content = File("data.txt").readText()
val lines = File("data.txt").readLines()
\`\`\`

### ファイルの書き込み
\`\`\`kotlin
File("output.txt").writeText("Hello, File!")
File("log.txt").appendText("新しいログエントリ\\n")
\`\`\`

### 存在確認
\`\`\`kotlin
if (File("config.json").exists()) {
    println("設定ファイルが見つかりました")
}
\`\`\`

### Try-Catchと併用
ファイル操作は失敗する可能性があります（ファイルが見つからない、権限拒否）。

\`\`\`kotlin
try {
    val data = File("data.txt").readText()
} catch (e: IOException) {
    println("ファイル読み取りエラー: \${e.message}")
}
\`\`\`
    `,
    practicePrompt: "シンプルなログシステムを作成してください：関数writeLog(message: String)は'[タイムスタンプ] message'を'app.log'に追記します。関数readLogs()はすべてのログエントリをリストとして返します。3つのログを書き込んでから読み戻してテストしてください。",
    expectedOutputDescription: "タイムスタンプ付きエントリでログファイルが作成され、正常に読み戻される。"
  },

  'kotlin-mini-project': {
    title: '13. ミニプロジェクト：タスクマネージャーCLI',
    description: 'これまで学んだすべてを使って完全なCLIタスクマネージャーを構築しましょう。',
    contentMarkdown: `
# 最終プロジェクト：タスクマネージャー

すべてを組み合わせる時が来ました！コマンドラインタスクマネージャーを構築しましょう。

### 要件
1. **データモデル**: Task (id, title, completed, priority)
2. **機能**:
   - タスクの追加
   - すべてのタスクのリスト表示
   - 完了としてマーク
   - 優先度でフィルター
   - ファイルに保存
   - ファイルから読み込み
3. **使用するもの**:
   - データクラス
   - コレクション（filter、map）
   - ファイルI/O
   - エラーハンドリング
   - コマンド用のSealed class

### 例のフロー
\`\`\`
> add 牛乳を買う
タスク追加: #1

> add バグ修正 priority:HIGH
タスク追加: #2

> list
1. [ ] 牛乳を買う (NORMAL)
2. [ ] バグ修正 (HIGH)

> complete 1
タスク #1 を完了にしました

> save
タスクをtasks.jsonに保存しました
\`\`\`
    `,
    practicePrompt: "完全なTaskManagerを実装してください：1) 優先度付きタスクの追加、2) フォーマットされたリスト表示、3) リストを更新してタスクを完了、4) JSON風フォーマットでファイルI/Oを使った保存/読み込み。コマンドループでインタラクティブにしてください。",
    expectedOutputDescription: "すべての機能が動作し、データがファイルに永続化される完全に機能するCLIタスクマネージャー。"
  },

  'cs-basics-algos': {
    title: 'ボーナス：Big Oとアルゴリズム',
    description: 'コード効率の測定方法への簡単な入門。',
    contentMarkdown: `
# コンピューターサイエンスの基礎

Kotlinはコーディングを簡単にしますが、*効率的な*コードを書くにはCS基礎の理解が必要です。

### Big O記法
データが増えるにつれて実行時間はどのように増加しますか？
*   **O(1)**: 即座。配列インデックスへのアクセス。
*   **O(n)**: 線形。リストのループ。
*   **O(n^2)**: 2次。ネストされたループ（可能なら避ける！）。
    `,
    practicePrompt: "1から5まで数字を出力するループを書いてください（O(n)）。そのループの中に1から5の別のループを書いてください（O(n^2)になります）。内側と外側のインデックスの積を出力してください。",
    expectedOutputDescription: "掛け算テーブルのロジックを示す25行の出力。"
  }
};
