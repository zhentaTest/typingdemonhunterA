// Chapter-based education content
const chapters = {
    typescript: {
        beginner: [
            {
                id: 1,
                title: "변수와 기본 타입",
                description: "TypeScript의 기본 변수 선언과 타입 지정 방법을 배웁니다. const와 let의 차이, 그리고 기본 타입(string, number, boolean)을 익힙니다.",
                code: `const name: string = "Alice";
const age: number = 25;
const isStudent: boolean = true;
console.log(name);`,
                expectedOutput: "Alice",
                hints: "타입을 명시하면 코드의 안정성이 높아집니다."
            },
            {
                id: 2,
                title: "배열과 타입",
                description: "TypeScript에서 배열을 선언하고 타입을 지정하는 방법을 배웁니다. 배열의 요소에 접근하는 방법도 익힙니다.",
                code: `const numbers: number[] = [1, 2, 3, 4, 5];
const fruits: string[] = ["apple", "banana"];
console.log(numbers[0]);`,
                expectedOutput: "1",
                hints: "배열 타입은 타입[] 또는 Array<타입> 형식으로 지정합니다."
            },
            {
                id: 3,
                title: "객체 타입",
                description: "객체의 타입을 정의하는 방법을 배웁니다. 인라인 타입 정의를 통해 객체의 구조를 명시적으로 선언합니다.",
                code: `const person: { name: string; age: number } = {
    name: "Bob",
    age: 30
};
console.log(person.name);`,
                expectedOutput: "Bob",
                hints: "객체 타입은 중괄호 안에 속성과 타입을 나열합니다."
            },
            {
                id: 4,
                title: "함수와 타입",
                description: "함수의 매개변수와 반환값에 타입을 지정하는 방법을 배웁니다. 타입이 지정된 함수는 더 안전하고 예측 가능합니다.",
                code: `function greet(name: string): string {
    return \`Hello, \${name}!\`;
}
console.log(greet("World"));`,
                expectedOutput: "Hello, World!",
                hints: "함수의 반환 타입은 괄호 뒤에 콜론과 함께 지정합니다."
            },
            {
                id: 5,
                title: "인터페이스 기초",
                description: "인터페이스를 사용하여 객체의 구조를 정의하는 방법을 배웁니다. 인터페이스는 코드의 재사용성과 가독성을 높입니다.",
                code: `interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "Charlie",
    age: 28
};
console.log(user.name);`,
                expectedOutput: "Charlie",
                hints: "인터페이스는 객체의 '청사진'입니다."
            },
            {
                id: 6,
                title: "선택적 속성",
                description: "인터페이스에서 선택적 속성(Optional Properties)을 정의하는 방법을 배웁니다. 물음표(?)를 사용하여 속성을 선택적으로 만듭니다.",
                code: `interface Product {
    name: string;
    price: number;
    discount?: number;
}

const item: Product = {
    name: "Laptop",
    price: 1000
};
console.log(item.name);`,
                expectedOutput: "Laptop",
                hints: "선택적 속성은 물음표(?)로 표시합니다."
            },
            {
                id: 7,
                title: "읽기 전용 속성",
                description: "readonly 키워드를 사용하여 읽기 전용 속성을 만드는 방법을 배웁니다. 읽기 전용 속성은 초기화 후 변경할 수 없습니다.",
                code: `interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };
console.log(point.x);`,
                expectedOutput: "10",
                hints: "readonly 속성은 생성 후 수정할 수 없습니다."
            },
            {
                id: 8,
                title: "유니온 타입",
                description: "유니온 타입을 사용하여 여러 타입 중 하나를 허용하는 방법을 배웁니다. 파이프(|)를 사용하여 타입을 결합합니다.",
                code: `let value: string | number;
value = "hello";
console.log(value);
value = 42;
console.log(value);`,
                expectedOutput: "hello\n42",
                hints: "유니온 타입은 | 기호로 여러 타입을 결합합니다."
            },
            {
                id: 9,
                title: "타입 별칭",
                description: "type 키워드를 사용하여 타입 별칭을 정의하는 방법을 배웁니다. 복잡한 타입을 간단한 이름으로 재사용할 수 있습니다.",
                code: `type ID = string | number;

const userId: ID = "user123";
const productId: ID = 456;
console.log(userId);`,
                expectedOutput: "user123",
                hints: "타입 별칭은 복잡한 타입을 간단하게 만듭니다."
            },
            {
                id: 10,
                title: "배열 메서드와 타입",
                description: "배열의 map 메서드를 사용하여 배열을 변환하는 방법을 배웁니다. TypeScript는 자동으로 타입을 추론합니다.",
                code: `const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
                expectedOutput: "[2, 4, 6, 8, 10]",
                hints: "map 메서드는 배열의 각 요소를 변환합니다."
            },
            {
                id: 11,
                title: "클래스 기초",
                description: "클래스를 정의하고 인스턴스를 생성하는 방법을 배웁니다. 클래스는 객체 지향 프로그래밍의 핵심 개념입니다.",
                code: `class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet(): string {
        return \`Hello, I'm \${this.name}\`;
    }
}

const person = new Person("Alice");
console.log(person.greet());`,
                expectedOutput: "Hello, I'm Alice",
                hints: "클래스는 객체의 템플릿입니다."
            },
            {
                id: 12,
                title: "접근 제어자",
                description: "public, private, protected 접근 제어자를 사용하는 방법을 배웁니다. 캡슐화를 통해 데이터를 보호할 수 있습니다.",
                code: `class BankAccount {
    private balance: number;

    constructor(initial: number) {
        this.balance = initial;
    }

    getBalance(): number {
        return this.balance;
    }
}

const account = new BankAccount(1000);
console.log(account.getBalance());`,
                expectedOutput: "1000",
                hints: "private 속성은 클래스 외부에서 접근할 수 없습니다."
            },
            {
                id: 13,
                title: "제네릭 기초",
                description: "제네릭 타입을 사용하여 재사용 가능한 함수를 만드는 방법을 배웁니다. 제네릭은 타입의 유연성을 제공합니다.",
                code: `function identity<T>(arg: T): T {
    return arg;
}

const result1 = identity<string>("hello");
const result2 = identity<number>(42);
console.log(result1);`,
                expectedOutput: "hello",
                hints: "제네릭은 <T>와 같은 형태로 표시합니다."
            },
            {
                id: 14,
                title: "열거형 (Enum)",
                description: "Enum을 정의하고 사용하는 방법을 배웁니다. Enum은 관련된 상수들을 그룹화하는 데 유용합니다.",
                code: `enum Color {
    Red,
    Green,
    Blue
}

const favorite: Color = Color.Blue;
console.log(favorite);`,
                expectedOutput: "2",
                hints: "Enum은 자동으로 0부터 시작하는 숫자를 할당합니다."
            },
            {
                id: 15,
                title: "인터페이스 확장",
                description: "인터페이스 상속을 사용하여 기존 인터페이스를 확장하는 방법을 배웁니다. 코드 재사용성이 향상됩니다.",
                code: `interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

const dog: Dog = {
    name: "Buddy",
    breed: "Golden Retriever"
};
console.log(dog.name);`,
                expectedOutput: "Buddy",
                hints: "extends 키워드로 인터페이스를 확장합니다."
            }
        ],
        intermediate: [],
        master: []
    },
    javascript: {
        beginner: [
            {
                id: 1,
                title: "변수 선언",
                description: "JavaScript의 세 가지 변수 선언 방식(const, let, var)을 배웁니다. 각각의 차이점과 사용 시기를 이해합니다.",
                code: `const name = "Alice";
let age = 25;
var city = "Seoul";
console.log(name);`,
                expectedOutput: "Alice",
                hints: "const는 재할당 불가, let은 재할당 가능합니다."
            },
            {
                id: 2,
                title: "기본 연산",
                description: "JavaScript의 기본 산술 연산을 배웁니다. 덧셈, 뺄셈, 곱셈, 나눗셈 등을 수행할 수 있습니다.",
                code: `const a = 10;
const b = 5;
const sum = a + b;
console.log(sum);`,
                expectedOutput: "15",
                hints: "JavaScript는 자동으로 타입을 추론합니다."
            },
            {
                id: 3,
                title: "문자열 연결",
                description: "더하기 연산자(+)를 사용하여 문자열을 연결하는 방법을 배웁니다. 문자열 조합은 매우 자주 사용됩니다.",
                code: `const firstName = "John";
const lastName = "Doe";
const fullName = firstName + " " + lastName;
console.log(fullName);`,
                expectedOutput: "John Doe",
                hints: "+ 연산자로 문자열을 이어붙일 수 있습니다."
            },
            {
                id: 4,
                title: "템플릿 리터럴",
                description: "백틱(`)과 ${}를 사용하여 문자열에 변수를 삽입하는 방법을 배웁니다. 템플릿 리터럴은 문자열 조합을 더 쉽게 만듭니다.",
                code: `const name = "Alice";
const age = 25;
const message = \`My name is \${name} and I'm \${age} years old\`;
console.log(message);`,
                expectedOutput: "My name is Alice and I'm 25 years old",
                hints: "템플릿 리터럴은 백틱(`)으로 감싸고 ${}로 변수를 삽입합니다."
            },
            {
                id: 5,
                title: "배열 기초",
                description: "배열을 생성하고 요소에 접근하는 방법을 배웁니다. 배열의 length 속성도 함께 배웁니다.",
                code: `const fruits = ["apple", "banana", "orange"];
console.log(fruits[0]);
console.log(fruits.length);`,
                expectedOutput: "apple\n3",
                hints: "배열의 인덱스는 0부터 시작합니다."
            },
            {
                id: 6,
                title: "배열 메서드 - push",
                description: "push 메서드를 사용하여 배열의 끝에 요소를 추가하는 방법을 배웁니다. 배열은 동적으로 크기가 변경됩니다.",
                code: `const numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers);`,
                expectedOutput: "[1, 2, 3, 4]",
                hints: "push 메서드는 배열의 끝에 요소를 추가합니다."
            },
            {
                id: 7,
                title: "객체 기초",
                description: "객체를 생성하고 속성에 접근하는 방법을 배웁니다. 객체는 키-값 쌍으로 데이터를 저장합니다.",
                code: `const person = {
    name: "Bob",
    age: 30,
    city: "Seoul"
};
console.log(person.name);`,
                expectedOutput: "Bob",
                hints: "점(.) 표기법으로 객체의 속성에 접근합니다."
            },
            {
                id: 8,
                title: "함수 선언",
                description: "함수를 선언하고 호출하는 방법을 배웁니다. 함수는 재사용 가능한 코드 블록입니다.",
                code: `function greet(name) {
    return "Hello, " + name;
}
const message = greet("World");
console.log(message);`,
                expectedOutput: "Hello, World",
                hints: "함수는 return 키워드로 값을 반환합니다."
            },
            {
                id: 9,
                title: "화살표 함수",
                description: "화살표 함수(=>)를 사용하여 함수를 더 간결하게 작성하는 방법을 배웁니다. 화살표 함수는 ES6의 새로운 기능입니다.",
                code: `const add = (a, b) => a + b;
const result = add(5, 3);
console.log(result);`,
                expectedOutput: "8",
                hints: "화살표 함수는 => 기호를 사용합니다."
            },
            {
                id: 10,
                title: "if 조건문",
                description: "if-else 조건문을 사용하여 조건에 따라 다른 코드를 실행하는 방법을 배웁니다. 조건문은 프로그램의 흐름을 제어합니다.",
                code: `const age = 20;
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}`,
                expectedOutput: "Adult",
                hints: "if 문은 조건이 true일 때 코드를 실행합니다."
            },
            {
                id: 11,
                title: "for 반복문",
                description: "for 반복문을 사용하여 코드를 여러 번 실행하는 방법을 배웁니다. 반복문은 반복 작업을 자동화합니다.",
                code: `for (let i = 0; i < 5; i++) {
    console.log(i);
}`,
                expectedOutput: "0\n1\n2\n3\n4",
                hints: "for 문은 초기화, 조건, 증감식으로 구성됩니다."
            },
            {
                id: 12,
                title: "while 반복문",
                description: "while 반복문을 사용하여 조건이 true인 동안 코드를 반복 실행하는 방법을 배웁니다.",
                code: `let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}`,
                expectedOutput: "0\n1\n2",
                hints: "while 문은 조건이 false가 될 때까지 반복합니다."
            },
            {
                id: 13,
                title: "배열 map",
                description: "map 메서드를 사용하여 배열의 각 요소를 변환하는 방법을 배웁니다. map은 새로운 배열을 반환합니다.",
                code: `const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
                expectedOutput: "[2, 4, 6, 8]",
                hints: "map 메서드는 각 요소에 함수를 적용합니다."
            },
            {
                id: 14,
                title: "배열 filter",
                description: "filter 메서드를 사용하여 조건에 맞는 요소만 선택하는 방법을 배웁니다. filter는 새로운 배열을 반환합니다.",
                code: `const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);`,
                expectedOutput: "[2, 4, 6]",
                hints: "filter는 조건이 true인 요소만 포함합니다."
            },
            {
                id: 15,
                title: "객체 메서드",
                description: "객체 내부에 함수를 정의하여 메서드를 만드는 방법을 배웁니다. 메서드는 객체의 동작을 정의합니다.",
                code: `const calculator = {
    add: function(a, b) {
        return a + b;
    }
};
const result = calculator.add(10, 5);
console.log(result);`,
                expectedOutput: "15",
                hints: "객체의 속성으로 함수를 할당할 수 있습니다."
            }
        ],
        intermediate: [],
        master: []
    },
    godotscript: {
        beginner: [
            {
                id: 1,
                title: "변수 선언",
                description: "GodotScript의 변수 선언 방법을 배웁니다. var 키워드를 사용하여 변수를 선언하고 값을 할당합니다.",
                code: `var player_name = "Hero"
var health = 100
print(player_name)`,
                expectedOutput: "Hero",
                hints: "GodotScript는 동적 타입 언어입니다."
            },
            {
                id: 2,
                title: "상수 선언",
                description: "const 키워드를 사용하여 상수를 선언하는 방법을 배웁니다. 상수는 값을 변경할 수 없습니다.",
                code: `const MAX_SPEED = 300
const JUMP_FORCE = 500
print(MAX_SPEED)`,
                expectedOutput: "300",
                hints: "상수는 대문자와 언더스코어로 명명하는 것이 관례입니다."
            },
            {
                id: 3,
                title: "기본 연산",
                description: "GodotScript의 기본 산술 연산을 배웁니다. 덧셈, 뺄셈, 곱셈, 나눗셈을 수행할 수 있습니다.",
                code: `var a = 10
var b = 5
var sum = a + b
print(sum)`,
                expectedOutput: "15",
                hints: "산술 연산자는 다른 언어와 동일합니다."
            },
            {
                id: 4,
                title: "문자열 연결",
                description: "더하기 연산자(+)를 사용하여 문자열을 연결하는 방법을 배웁니다.",
                code: `var first = "Hello"
var second = "Godot"
var message = first + " " + second
print(message)`,
                expectedOutput: "Hello Godot",
                hints: "+ 연산자로 문자열을 연결합니다."
            },
            {
                id: 5,
                title: "배열 기초",
                description: "배열을 생성하고 요소에 접근하는 방법을 배웁니다. size() 메서드로 배열의 크기를 확인합니다.",
                code: `var items = ["sword", "shield", "potion"]
print(items[0])
print(items.size())`,
                expectedOutput: "sword\n3",
                hints: "배열의 인덱스는 0부터 시작합니다."
            },
            {
                id: 6,
                title: "딕셔너리",
                description: "딕셔너리(Dictionary)를 생성하고 값에 접근하는 방법을 배웁니다. 딕셔너리는 키-값 쌍으로 데이터를 저장합니다.",
                code: `var player = {
    "name": "Hero",
    "level": 5,
    "health": 100
}
print(player["name"])`,
                expectedOutput: "Hero",
                hints: "딕셔너리는 중괄호{}로 생성합니다."
            },
            {
                id: 7,
                title: "함수 정의",
                description: "func 키워드를 사용하여 함수를 정의하는 방법을 배웁니다. 함수는 재사용 가능한 코드 블록입니다.",
                code: `func greet(name):
    return "Hello, " + name

var message = greet("Player")
print(message)`,
                expectedOutput: "Hello, Player",
                hints: "GodotScript는 들여쓰기로 코드 블록을 구분합니다."
            },
            {
                id: 8,
                title: "if 조건문",
                description: "if-else 조건문을 사용하여 조건에 따라 다른 코드를 실행하는 방법을 배웁니다.",
                code: `var health = 50
if health > 30:
    print("Healthy")
else:
    print("Low health")`,
                expectedOutput: "Healthy",
                hints: "조건문 뒤에는 콜론(:)을 붙입니다."
            },
            {
                id: 9,
                title: "for 반복문",
                description: "for 반복문과 range 함수를 사용하여 코드를 반복 실행하는 방법을 배웁니다.",
                code: `for i in range(5):
    print(i)`,
                expectedOutput: "0\n1\n2\n3\n4",
                hints: "range(5)는 0부터 4까지의 숫자를 생성합니다."
            },
            {
                id: 10,
                title: "while 반복문",
                description: "while 반복문을 사용하여 조건이 true인 동안 코드를 반복 실행하는 방법을 배웁니다.",
                code: `var count = 0
while count < 3:
    print(count)
    count += 1`,
                expectedOutput: "0\n1\n2",
                hints: "+= 연산자로 변수를 증가시킬 수 있습니다."
            },
            {
                id: 11,
                title: "Vector2 기초",
                description: "Vector2를 사용하여 2D 좌표를 표현하는 방법을 배웁니다. Vector2는 Godot의 핵심 데이터 타입입니다.",
                code: `var position = Vector2(100, 200)
print(position.x)
print(position.y)`,
                expectedOutput: "100\n200",
                hints: "Vector2는 x, y 속성을 가집니다."
            },
            {
                id: 12,
                title: "_ready 함수",
                description: "_ready 함수는 노드가 씬 트리에 추가될 때 호출됩니다. 초기화 코드를 작성하는 데 사용됩니다.",
                code: `func _ready():
    print("Node is ready!")
    var speed = 300
    print(speed)`,
                expectedOutput: "Node is ready!\n300",
                hints: "_ready는 Godot의 라이프사이클 함수입니다."
            },
            {
                id: 13,
                title: "노드 확장",
                description: "extends 키워드를 사용하여 기존 노드를 확장하는 방법을 배웁니다. 이것은 Godot 스크립트의 기본 구조입니다.",
                code: `extends Node2D

var speed = 200

func _ready():
    print("Speed: " + str(speed))`,
                expectedOutput: "Speed: 200",
                hints: "str() 함수로 숫자를 문자열로 변환합니다."
            },
            {
                id: 14,
                title: "입력 처리",
                description: "Input 클래스를 사용하여 사용자 입력을 처리하는 방법을 배웁니다. _process 함수는 매 프레임마다 호출됩니다.",
                code: `func _process(delta):
    if Input.is_action_pressed("ui_right"):
        print("Moving right")`,
                expectedOutput: "// 입력 시: Moving right",
                hints: "Input.is_action_pressed()로 키 입력을 확인합니다."
            },
            {
                id: 15,
                title: "시그널 기초",
                description: "signal 키워드를 사용하여 시그널을 정의하고 emit_signal로 발생시키는 방법을 배웁니다. 시그널은 이벤트 기반 프로그래밍에 사용됩니다.",
                code: `signal health_changed

func take_damage(amount):
    var health = 100
    health -= amount
    emit_signal("health_changed", health)
    print(health)

func _ready():
    take_damage(20)`,
                expectedOutput: "80",
                hints: "시그널은 객체 간 통신에 사용됩니다."
            }
        ],
        intermediate: [],
        master: []
    }
};
