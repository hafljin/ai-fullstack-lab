import { Topic, TopicCategory } from './types';
import { topicTranslationsJa } from './constants.ja';

const TOPICS_BASE: Topic[] = [
  // --- STEP 1: Foundations ---
  {
    id: 'kotlin-basics-1',
    title: '1. App Data & Variables',
    category: TopicCategory.KOTLIN,
    difficulty: 'Beginner',
    description: 'Start your journey by learning how apps store data. Understand val vs var and basic types.',
    contentMarkdown: `
# storing Data in Apps

To build any application, you first need to store information—like a user's name, their high score, or whether they are logged in. Kotlin makes this concise and safe.

### 1. Read-only vs Mutable
Kotlin distinguishes between values that change and those that don't.
*   **\`val\` (Value):** Immutable. Use this by default. It prevents accidental bugs.
*   **\`var\` (Variable):** Mutable. Use this only when data *must* change (e.g., a counter).

\`\`\`kotlin
val appName = "My Awesome App" // Cannot change
var userScore = 0              // Can change
userScore = 100
\`\`\`

### 2. Basic Types
Kotlin usually guesses the type (Type Inference), but you should know the basics:
*   \`String\`: Text ("Hello")
*   \`Int\`: Whole numbers (42)
*   \`Double\`: Decimals (3.14)
*   \`Boolean\`: True/False flags (true)

\`\`\`kotlin
val username: String = "DevUser"
val isPremium: Boolean = false
\`\`\`
    `,
    starterCode: `fun main() {
    // TODO: Simulate a User Profile
    
    // 1. Create a read-only variable for the 'username' (e.g., "KotlinFan")
    
    
    // 2. Create a mutable variable for 'currentLevel' set to 1
    
    
    // 3. Create a boolean 'isActive' set to true
    
    
    // 4. Print them all nicely
    println("User Profile Created")
}`,
    practicePrompt: "Define a `val` for `appName` and a `var` for `unreadMessages` (start at 5). Print them. Then, simulate reading 2 messages by decreasing `unreadMessages` by 2 and print the new count.",
    expectedOutputDescription: "Output showing the app name and the updating message count."
  },

  // --- STEP 2: Logic ---
  {
    id: 'kotlin-control-flow',
    title: '2. Logic & Decision Making',
    category: TopicCategory.KOTLIN,
    difficulty: 'Beginner',
    description: 'Apps need to make decisions. Learn if/else and when expressions to control logic.',
    contentMarkdown: `
# Making Decisions

An app isn't static; it reacts to data. If a user is logged in, show the dashboard. If not, show the login screen.

### The \`if\` Expression
In Kotlin, \`if\` returns a value. This is great for assigning states.

\`\`\`kotlin
val buttonColor = if (isValid) "Green" else "Red"
\`\`\`

### The \`when\` Expression
Use \`when\` when checking multiple possibilities (like handling HTTP status codes or menu options). It's cleaner than many if-else statements.

\`\`\`kotlin
val message = when (statusCode) {
    200 -> "Success"
    404 -> "Not Found"
    500 -> "Server Error"
    else -> "Unknown"
}
\`\`\`
    `,
    starterCode: `fun main() {
    val userRole = "admin" // Try changing to "guest" or "editor"
    
    // TODO: Use a 'when' expression to determine permissions
    // "admin" -> print "Full Access"
    // "editor" -> print "Edit Content"
    // "guest"  -> print "Read Only"
    // else     -> print "Unknown Role"

}`,
    practicePrompt: "Create a variable `batteryLevel` (Int). Use logical logic: if level > 20 print 'OK', if between 5 and 20 print 'Low Battery', and if < 5 print 'Shutdown Imminent'. Try to use a `when` expression range (e.g. `in 0..5`) if you can!",
    expectedOutputDescription: "The correct status message based on the battery level."
  },

  // --- STEP 3: Functions & Safety ---
  {
    id: 'kotlin-functions-nulls',
    title: '3. Functions & Null Safety',
    category: TopicCategory.KOTLIN,
    difficulty: 'Intermediate',
    description: 'Learn to structure code with functions and handle missing data safely (The Billion Dollar Mistake fixed).',
    contentMarkdown: `
# Modular Code & Safety

As your app grows, you can't put everything in \`main()\`. You need **Functions** to organize tasks.

### Functions
\`\`\`kotlin
fun sendNotification(message: String, userId: Int): Boolean {
    println("Sending '$message' to User $userId")
    return true
}
\`\`\`

### Null Safety (Crucial!)
In many languages, accessing a missing value crashes the app. Kotlin forces you to handle this.
*   \`String\`: Cannot be null.
*   \`String?\`: Can be null.

\`\`\`kotlin
var email: String? = null
// println(email.length) // Compiler error! Unsafe.
println(email?.length)   // Safe call. Prints null if email is null.
println(email?.length ?: 0) // Elvis operator: Use 0 if null.
\`\`\`
    `,
    starterCode: `fun main() {
    // 1. Call the function safely
    val length = getUsernameLength(null)
    println("Length is: $length")
    
    val length2 = getUsernameLength("KotlinMaster")
    println("Length is: $length2")
}

// TODO: Fix this function to handle nullable input
fun getUsernameLength(name: String?): Int {
    // Return the length of name, or 0 if name is null
    // Hint: Use the Elvis operator ?:
    return 0 
}`,
    practicePrompt: "Write a function `greetUser(name: String?)` that returns a String. If name is provided, return 'Hello, [name]!'. If name is null, return 'Hello, Guest!'. Test it in main().",
    expectedOutputDescription: "Two greetings: one with a specific name, one generic for a null input."
  },

  // --- STEP 4: OOP ---
  {
    id: 'kotlin-oop-classes',
    title: '4. Modeling Data (Classes)',
    category: TopicCategory.KOTLIN,
    difficulty: 'Intermediate',
    description: 'Real apps manage real objects. Learn Classes and the powerful `data class`.',
    contentMarkdown: `
# Modeling the Real World

To build a shop, you need a \`Product\`. To build a social network, you need a \`Post\`. Classes let you define these blueprints.

### The \`data class\`
Kotlin has a superpower called **Data Classes**. They automatically generate \`toString()\`, \`equals()\`, and \`copy()\` for you. Perfect for holding data.

\`\`\`kotlin
data class User(val id: Int, val name: String, val isOnline: Boolean)

val u1 = User(1, "Alice", true)
println(u1) // Prints: User(id=1, name=Alice, isOnline=true)
\`\`\`

### Methods
Classes can also have functions (methods) inside them.

\`\`\`kotlin
class BankAccount(var balance: Double) {
    fun deposit(amount: Double) {
        balance += amount
    }
}
\`\`\`
    `,
    starterCode: `// 1. Define a data class 'Task' with:
//    - id (Int)
//    - title (String)
//    - isCompleted (Boolean, default to false)

// data class Task(...)

fun main() {
    // 2. Create an instance of Task
    
    // 3. Print it (notice how nice the output is automatically)
    
    // 4. Create a copy of that task but set isCompleted = true
    
}`,
    practicePrompt: "Define a data class `Song` with `title` (String), `artist` (String), and `durationSeconds` (Int). Create two song instances. Print them. Then create a variable `isLong` that is true if the first song is longer than 180 seconds.",
    expectedOutputDescription: "Printed song details and the boolean check result."
  },

  // --- STEP 5: Collections ---
  {
    id: 'kotlin-collections',
    title: '5. Collections & Lambdas',
    category: TopicCategory.KOTLIN,
    difficulty: 'Advanced',
    description: 'Manage lists of data. Learn functional programming (filter, map) to process data efficiently.',
    contentMarkdown: `
# Handling Lists of Data

Apps rarely deal with just one item. You have a *list* of friends, a *map* of settings, etc.

### Lists
\`\`\`kotlin
val numbers = listOf(1, 2, 3, 4, 5) // Read-only
val activeUsers = mutableListOf("Alice", "Bob") // Mutable
\`\`\`

### Functional Operations (Lambdas)
Instead of writing manual \`for\` loops, Kotlin allows you to transform collections using **Lambdas** (code blocks).

*   \`.filter { it > 5 }\`: Keep only items matching logic.
*   \`.map { it * 2 }\`: Transform every item.
*   \`.forEach { println(it) }\`: Do something for each item.

\`\`\`kotlin
val names = listOf("Alice", "Bob", "Charlie")
val aNames = names.filter { it.startsWith("A") } // ["Alice"]
\`\`\`
    `,
    starterCode: `data class Transaction(val amount: Double, val type: String)

fun main() {
    val transactions = listOf(
        Transaction(100.0, "DEPOSIT"),
        Transaction(50.0, "WITHDRAWAL"),
        Transaction(200.0, "DEPOSIT"),
        Transaction(25.0, "FEE")
    )

    // 1. Use .filter to get only "DEPOSIT" transactions
    
    // 2. Use .map to get a list of just the amounts from those deposits
    
    // 3. Print the result
}`,
    practicePrompt: "Create a list of integers from 1 to 10. Chain operators: 1) Filter to keep only even numbers. 2) Map them to multiply by 10. 3) Print the final list.",
    expectedOutputDescription: "Output should be [20, 40, 60, 80, 100]."
  },

  // --- STEP 6: Error Handling ---
  {
    id: 'kotlin-error-handling',
    title: '6. Error Handling',
    category: TopicCategory.KOTLIN,
    difficulty: 'Intermediate',
    description: 'Handle errors gracefully. Learn try-catch-finally and create custom exceptions.',
    contentMarkdown: `
# Handling Errors in Real Apps

Apps crash when unexpected things happen: a network fails, a file is missing, or a user enters invalid data. You must handle these gracefully.

### Try-Catch-Finally
Wrap risky code in a \`try\` block. If an error occurs, \`catch\` handles it. \`finally\` always runs (cleanup).

\`\`\`kotlin
fun parseNumber(input: String): Int? {
    return try {
        input.toInt()
    } catch (e: NumberFormatException) {
        println("Invalid number: $input")
        null
    } finally {
        println("Parse attempt completed")
    }
}
\`\`\`

### Throwing Exceptions
You can create and throw your own errors when something goes wrong.

\`\`\`kotlin
fun withdraw(amount: Double, balance: Double): Double {
    if (amount > balance) {
        throw IllegalArgumentException("Insufficient funds")
    }
    return balance - amount
}
\`\`\`

### Common Exceptions
*   \`NullPointerException\`: Accessing null unsafely
*   \`IllegalArgumentException\`: Invalid function argument
*   \`IOException\`: File/network issues
    `,
    starterCode: `fun main() {
    // Test different scenarios
    println(divideNumbers(10, 2))
    println(divideNumbers(10, 0))
    println(divideNumbers(10, null))
}

// TODO: Complete this function
fun divideNumbers(a: Int, b: Int?): String {
    // 1. Check if b is null, return "Error: divisor is null"
    // 2. Use try-catch to handle division by zero
    // 3. Return the result as a string "Result: X"
    // 4. In catch, return "Error: division by zero"
    
    return "Not implemented"
}`,
    practicePrompt: "Write a function `validateAge(age: Int?)` that: 1) Returns 'Valid' if age is between 0-150, 2) Throws IllegalArgumentException if age is negative or > 150, 3) Returns 'Null age' if age is null. Test it in main() with try-catch.",
    expectedOutputDescription: "Output showing successful validation, caught exceptions, and null handling."
  },

  // --- STEP 7: Scope Functions ---
  {
    id: 'kotlin-scope-functions',
    title: '7. Kotlin Scope Functions',
    category: TopicCategory.KOTLIN,
    difficulty: 'Intermediate',
    description: 'Write cleaner code with let, apply, also, run, and with. Plus extension functions!',
    contentMarkdown: `
# Idiomatic Kotlin: Scope Functions

Kotlin provides special functions that make code more concise and readable. These are called **Scope Functions**.

### The Big 5
1. **\`let\`**: Transform an object and return a result. Great for null checks.
   \`\`\`kotlin
   val length = name?.let { it.length } ?: 0
   \`\`\`

2. **\`apply\`**: Configure an object and return the object itself.
   \`\`\`kotlin
   val user = User().apply {
       name = "Alice"
       age = 30
   }
   \`\`\`

3. **\`also\`**: Perform side effects (logging, validation) and return the object.
   \`\`\`kotlin
   val result = calculateScore().also { println("Score: $it") }
   \`\`\`

4. **\`run\`**: Execute code block and return result. Use when you need both logic and a return value.
   \`\`\`kotlin
   val isValid = userInput.run {
       isNotEmpty() && length > 5
   }
   \`\`\`

5. **\`with\`**: Group operations on an object without repeating its name.
   \`\`\`kotlin
   with(canvas) {
       drawCircle()
       drawLine()
   }
   \`\`\`

### Extension Functions
Add new methods to existing classes without modifying them!

\`\`\`kotlin
fun String.isPalindrome(): Boolean {
    return this == this.reversed()
}

println("radar".isPalindrome()) // true
\`\`\`
    `,
    starterCode: `data class Config(
    var apiUrl: String = "",
    var timeout: Int = 0,
    var debug: Boolean = false
)

fun main() {
    // TODO: Use 'apply' to create and configure a Config object
    val config = Config() // Configure all three properties using apply
    
    println(config)
    
    // TODO: Use 'let' to safely handle a nullable string
    val input: String? = "Hello"
    // Use let to print the uppercase version, or "Empty" if null
    
    
    // TODO: Create an extension function for Int called 'isEven()'
    // Then test it: println(4.isEven())
}

// Extension function here
`,
    practicePrompt: "Create a data class 'Email' with subject and body. Use 'apply' to build an instance with both fields. Add an extension function 'Email.preview()' that returns the first 20 chars of body. Test both.",
    expectedOutputDescription: "Email instance created and preview function working correctly."
  },

  // --- STEP 8: Advanced OOP ---
  {
    id: 'kotlin-advanced-oop',
    title: '8. Advanced OOP Patterns',
    category: TopicCategory.KOTLIN,
    difficulty: 'Advanced',
    description: 'Master sealed classes, enums, objects, and companion objects for production-ready code.',
    contentMarkdown: `
# Production-Ready OOP

Real apps need sophisticated object modeling. Kotlin provides powerful tools for this.

### Sealed Classes
Represent restricted class hierarchies. Perfect for state management and result types.

\`\`\`kotlin
sealed class Result {
    data class Success(val data: String) : Result()
    data class Error(val message: String) : Result()
    object Loading : Result()
}

fun handleResult(result: Result) = when(result) {
    is Result.Success -> println("Data: \${result.data}")
    is Result.Error -> println("Error: \${result.message}")
    Result.Loading -> println("Loading...")
}
\`\`\`

### Enum Classes
Fixed set of constants with properties and methods.

\`\`\`kotlin
enum class Priority(val level: Int) {
    LOW(1), MEDIUM(2), HIGH(3), CRITICAL(4)
}
\`\`\`

### Object (Singleton)
A class with exactly one instance. Perfect for managers, factories, or utilities.

\`\`\`kotlin
object DatabaseManager {
    fun connect() { println("Connected") }
}
DatabaseManager.connect()
\`\`\`

### Companion Object
Static-like members inside a class.

\`\`\`kotlin
class User(val name: String) {
    companion object {
        fun createGuest() = User("Guest")
    }
}
val guest = User.createGuest()
\`\`\`
    `,
    starterCode: `// TODO: Define a sealed class 'ApiResponse'
// with: Success(data: String), Error(code: Int, message: String), Loading

sealed class ApiResponse {
    // Define subclasses here
}

// TODO: Define an enum 'HttpMethod' with GET, POST, PUT, DELETE
// Each should have a property 'requiresBody: Boolean'


fun main() {
    // Test sealed class with when expression
    val response: ApiResponse = ApiResponse.Loading
    // Use when to handle all cases
    
    
    // Test enum
    // println(HttpMethod.POST.requiresBody) // should be true
}`,
    practicePrompt: "Create a sealed class 'PaymentStatus' with: Pending, Success(transactionId: String), Failed(reason: String). Write a function that takes PaymentStatus and returns a user-friendly message for each case.",
    expectedOutputDescription: "Function correctly handling all payment status cases with appropriate messages."
  },

  // --- STEP 9: Collections Advanced ---
  {
    id: 'kotlin-collections-advanced',
    title: '9. Advanced Collections',
    category: TopicCategory.KOTLIN,
    difficulty: 'Advanced',
    description: 'Master groupBy, partition, flatMap, and Sequences for performance.',
    contentMarkdown: `
# Advanced Collection Operations

Beyond basic filter/map, Kotlin offers powerful tools for data manipulation.

### GroupBy
Group items by a key.

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
Split a list into two based on a condition.

\`\`\`kotlin
val (passed, failed) = scores.partition { it >= 60 }
\`\`\`

### FlatMap
Transform and flatten nested collections.

\`\`\`kotlin
val nested = listOf(listOf(1, 2), listOf(3, 4))
val flat = nested.flatMap { it } // [1, 2, 3, 4]
\`\`\`

### Sequences (Performance)
For large datasets, use \`Sequence\` for lazy evaluation (operations run only when needed).

\`\`\`kotlin
val result = (1..1_000_000).asSequence()
    .filter { it % 2 == 0 }
    .map { it * 2 }
    .take(10)
    .toList()
\`\`\`
    `,
    starterCode: `data class Purchase(val userId: Int, val amount: Double, val category: String)

fun main() {
    val purchases = listOf(
        Purchase(1, 50.0, "Food"),
        Purchase(2, 200.0, "Electronics"),
        Purchase(1, 30.0, "Food"),
        Purchase(3, 100.0, "Clothing"),
        Purchase(2, 150.0, "Electronics")
    )
    
    // TODO: Use groupBy to group purchases by userId
    
    
    // TODO: Use partition to split into small (<100) and large purchases
    
    
    // TODO: Calculate total spending per user using groupBy + sumOf
    
}`,
    practicePrompt: "Create a list of strings representing tags: ['kotlin,programming', 'java,programming', 'design,ui']. Use flatMap to extract all individual tags into a single list. Then use groupBy to count occurrences of each tag.",
    expectedOutputDescription: "Flat list of tags and a map showing tag frequencies."
  },

  // --- STEP 10: Generics ---
  {
    id: 'kotlin-generics',
    title: '10. Generics & Type Safety',
    category: TopicCategory.KOTLIN,
    difficulty: 'Advanced',
    description: 'Write reusable, type-safe code with generics. Understand in/out variance.',
    contentMarkdown: `
# Reusable Type-Safe Code

Generics let you write functions and classes that work with any type, while maintaining type safety.

### Generic Functions
\`\`\`kotlin
fun <T> printList(items: List<T>) {
    items.forEach { println(it) }
}
printList(listOf(1, 2, 3))
printList(listOf("a", "b", "c"))
\`\`\`

### Generic Classes
\`\`\`kotlin
class Box<T>(val value: T) {
    fun get(): T = value
}
val intBox = Box(42)
val strBox = Box("Hello")
\`\`\`

### Constraints
Restrict generics to specific types.

\`\`\`kotlin
fun <T : Number> sum(a: T, b: T): Double {
    return a.toDouble() + b.toDouble()
}
\`\`\`

### Variance (in/out)
*   \`out T\`: Producer (can only return T)
*   \`in T\`: Consumer (can only accept T)

\`\`\`kotlin
interface Producer<out T> {
    fun produce(): T
}
interface Consumer<in T> {
    fun consume(item: T)
}
\`\`\`
    `,
    starterCode: `// TODO: Create a generic class 'Container<T>' that stores a value
// and has methods: get(), set(value: T), and isEmpty(): Boolean


// TODO: Create a generic function 'swapPair<T>' that takes two values
// and returns them swapped as a Pair


fun main() {
    // Test Container
    
    
    // Test swapPair
    // val swapped = swapPair(1, 2)
    // println(swapped) // (2, 1)
}`,
    practicePrompt: "Create a generic class 'Repository<T>' with a mutable list, and methods: add(item: T), getAll(): List<T>, findById(id: Int, getId: (T) -> Int): T?. Test it with a data class 'Product(val id: Int, val name: String)'.",
    expectedOutputDescription: "Repository correctly storing and retrieving Product instances."
  },

  // --- STEP 11: Coroutines Basics ---
  {
    id: 'kotlin-coroutines-basics',
    title: '11. Async Programming (Coroutines)',
    category: TopicCategory.KOTLIN,
    difficulty: 'Advanced',
    description: 'Handle async operations without blocking. Learn suspend, launch, and async.',
    contentMarkdown: `
# Asynchronous Programming

Real apps perform network calls, database queries, and file I/O. These take time. Coroutines let you write async code that looks synchronous.

### Suspend Functions
Functions that can pause and resume without blocking threads.

\`\`\`kotlin
suspend fun fetchData(): String {
    delay(1000) // Simulates network call
    return "Data loaded"
}
\`\`\`

### Launch (Fire and Forget)
Start a coroutine that doesn't return a result.

\`\`\`kotlin
GlobalScope.launch {
    val data = fetchData()
    println(data)
}
\`\`\`

### Async (Return a Result)
Start a coroutine that returns a Deferred result.

\`\`\`kotlin
val deferred = GlobalScope.async {
    fetchData()
}
val result = deferred.await()
\`\`\`

### Coroutine Scope
Proper way to manage coroutines lifecycle.

\`\`\`kotlin
runBlocking {
    val result = async { fetchData() }
    println(result.await())
}
\`\`\`

**Note:** In production, use structured concurrency with proper scopes (viewModelScope, lifecycleScope in Android).
    `,
    starterCode: `import kotlinx.coroutines.*

// Simulated API calls
suspend fun fetchUser(): String {
    delay(1000)
    return "User: Alice"
}

suspend fun fetchPosts(): String {
    delay(1500)
    return "Posts: 42"
}

fun main() = runBlocking {
    println("Starting...")
    
    // TODO: Use launch to fetch user (don't wait for result)
    
    
    // TODO: Use async to fetch posts and await the result
    
    
    println("Done")
}`,
    practicePrompt: "Create two suspend functions: fetchWeather() (delays 1s, returns 'Sunny') and fetchNews() (delays 2s, returns '10 articles'). Use async to call both in parallel and print results. Measure total time (should be ~2s, not 3s).",
    expectedOutputDescription: "Both results printed with parallel execution proven by total time ~2 seconds."
  },

  // --- STEP 12: File I/O ---
  {
    id: 'kotlin-file-io',
    title: '12. File Operations',
    category: TopicCategory.KOTLIN,
    difficulty: 'Intermediate',
    description: 'Read and write files. Essential for data persistence and configuration.',
    contentMarkdown: `
# Working with Files

Apps often need to save data, read config files, or process logs.

### Reading Files
\`\`\`kotlin
import java.io.File

val content = File("data.txt").readText()
val lines = File("data.txt").readLines()
\`\`\`

### Writing Files
\`\`\`kotlin
File("output.txt").writeText("Hello, File!")
File("log.txt").appendText("New log entry\\n")
\`\`\`

### Checking Existence
\`\`\`kotlin
if (File("config.json").exists()) {
    println("Config found")
}
\`\`\`

### Use with Try-Catch
File operations can fail (file not found, permission denied).

\`\`\`kotlin
try {
    val data = File("data.txt").readText()
} catch (e: IOException) {
    println("Error reading file: \${e.message}")
}
\`\`\`
    `,
    starterCode: `import java.io.File

fun main() {
    // TODO: Create a file "notes.txt" and write 3 lines to it
    
    
    // TODO: Read the file back and print each line
    
    
    // TODO: Append a new line to the file
    
    
    // TODO: Count total lines and print
    
}`,
    practicePrompt: "Create a simple log system: a function writeLog(message: String) that appends '[TIMESTAMP] message' to 'app.log'. A function readLogs() that returns all log entries as a list. Test by writing 3 logs and reading them back.",
    expectedOutputDescription: "Log file created with timestamped entries, successfully read back."
  },

  // --- STEP 13: Mini Project ---
  {
    id: 'kotlin-mini-project',
    title: '13. Mini Project: Task Manager CLI',
    category: TopicCategory.KOTLIN,
    difficulty: 'Advanced',
    description: 'Build a complete CLI task manager using everything learned so far.',
    contentMarkdown: `
# Final Project: Task Manager

Time to combine everything! Build a command-line task manager.

### Requirements
1. **Data Model**: Task (id, title, completed, priority)
2. **Features**:
   - Add task
   - List all tasks
   - Mark as complete
   - Filter by priority
   - Save to file
   - Load from file
3. **Use**:
   - Data classes
   - Collections (filter, map)
   - File I/O
   - Error handling
   - Sealed classes for commands

### Example Flow
\`\`\`
> add Buy milk
Task added: #1

> add Fix bug priority:HIGH
Task added: #2

> list
1. [ ] Buy milk (NORMAL)
2. [ ] Fix bug (HIGH)

> complete 1
Task #1 marked complete

> save
Tasks saved to tasks.json
\`\`\`
    `,
    starterCode: `import java.io.File

data class Task(
    val id: Int,
    val title: String,
    val completed: Boolean = false,
    val priority: String = "NORMAL"
)

sealed class Command {
    data class Add(val title: String, val priority: String) : Command()
    object List : Command()
    data class Complete(val id: Int) : Command()
    object Save : Command()
    object Exit : Command()
}

class TaskManager {
    private val tasks = mutableListOf<Task>()
    private var nextId = 1
    
    fun execute(command: Command) {
        when (command) {
            is Command.Add -> {
                // TODO: Add task
            }
            Command.List -> {
                // TODO: Print all tasks
            }
            is Command.Complete -> {
                // TODO: Mark task complete
            }
            Command.Save -> {
                // TODO: Save to file
            }
            Command.Exit -> println("Goodbye!")
        }
    }
}

fun main() {
    val manager = TaskManager()
    println("Task Manager - Type 'help' for commands")
    
    // TODO: Implement command loop
    // Read user input, parse commands, execute
}`,
    practicePrompt: "Implement the full TaskManager: 1) Add tasks with priority, 2) List with formatting, 3) Complete tasks by updating the list, 4) Save/load using File I/O with JSON-like format. Make it interactive with a command loop.",
    expectedOutputDescription: "Fully functional CLI task manager with all features working and data persisting to file."
  },

  // --- CS BASICS (Kept as supplementary) ---
  {
    id: 'cs-basics-algos',
    title: 'Bonus: Big O & Algorithms',
    category: TopicCategory.CS_BASICS,
    difficulty: 'Advanced',
    description: 'Brief intro to how we measure code efficiency.',
    contentMarkdown: `
# Computer Science Basics

While Kotlin makes coding easy, writing *efficient* code requires understanding CS basics.

### Big O Notation
How does execution time grow as data grows?
*   **O(1)**: Instant. Accessing an array index.
*   **O(n)**: Linear. Looping through a list.
*   **O(n^2)**: Quadratic. Nested loops (avoid if possible!).
    `,
    starterCode: `fun main() {
    val list = (1..100).toList()
    
    // O(n) operation: Finding a value
    val hasFifty = list.contains(50)
    println("Contains 50? $hasFifty")
    
    // O(1) operation: Accessing index
    println("First item: \${list[0]}")
}`,
    practicePrompt: "Write a loop that prints numbers 1 to 5 (O(n)). Inside that loop, write another loop 1 to 5 (making it O(n^2)). Print the product of the inner and outer indices.",
    expectedOutputDescription: "25 lines of output showing the multiplication table logic."
  }
];

// Merge Japanese translations
export const TOPICS: Topic[] = TOPICS_BASE.map(topic => {
  const jaData = topicTranslationsJa[topic.id];
  if (jaData) {
    return {
      ...topic,
      titleJa: jaData.title,
      descriptionJa: jaData.description,
      contentMarkdownJa: jaData.contentMarkdown,
      practicePromptJa: jaData.practicePrompt,
      expectedOutputDescriptionJa: jaData.expectedOutputDescription
    };
  }
  return topic;
});
