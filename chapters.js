// Chapter-based education content
const chapters = {
    typescript: {
        beginner: [
            {
                id: 1,
                title: "변수와 기본 타입",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>TypeScript의 기본 변수 선언 방법과 타입 지정을 배웁니다. const와 let의 차이점, 그리고 기본 타입인 string, number, boolean을 사용하는 방법을 익힙니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>타입을 명시하면 코드 작성 중에 오류를 미리 발견할 수 있습니다. 예를 들어, 숫자를 넣어야 하는 곳에 문자를 넣으면 바로 경고가 나타납니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 타입 없이 (JavaScript)
let age = 25;
age = "twenty-five";  // 오류 발생 안 함 😕

// 타입 있음 (TypeScript)
let age: number = 25;
age = "twenty-five";  // ❌ 오류! number에 string 대입 불가</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>const</code>: 값을 변경할 수 없는 상수</li>
            <li><code>let</code>: 값을 변경할 수 있는 변수</li>
            <li><code>string</code>: 문자열 타입</li>
            <li><code>number</code>: 숫자 타입</li>
            <li><code>boolean</code>: true/false 타입</li>
        </ul>
    </div>`,
                code: `const name: string = "Alice";
const age: number = 25;
const isStudent: boolean = true;
console.log(name);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "Alice"
                    ]
                },
                keyConcepts: [
                    "const로 변경 불가능한 상수 선언",
                    "let으로 변경 가능한 변수 선언",
                    "string, number, boolean 기본 타입 지정"
                ],
                canDoWith: [
                    "사용자 정보(이름, 나이)를 타입 안전하게 저장",
                    "컴파일 시점에 타입 오류 발견",
                    "코드 자동완성 및 문서화 향상"
                ]
            },
            {
                id: 2,
                title: "배열과 타입",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>배열을 선언하고 배열의 타입을 지정하는 방법을 배웁니다. 같은 타입의 값들을 모아서 관리할 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>배열에 타입을 지정하면 실수로 다른 타입의 값을 넣는 것을 방지할 수 있습니다. 숫자 배열에 문자를 넣으려고 하면 즉시 경고를 받습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 숫자 배열
const scores: number[] = [90, 85, 95];
scores.push(88);     // ✅ OK
scores.push("A+");   // ❌ 오류! 문자열 불가

// 문자열 배열
const names: string[] = ["Alice", "Bob"];
names.push("Charlie");  // ✅ OK
names.push(123);        // ❌ 오류! 숫자 불가</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>number[]</code>: 숫자만 담는 배열</li>
            <li><code>string[]</code>: 문자열만 담는 배열</li>
            <li>배열 인덱스는 0부터 시작</li>
            <li><code>.length</code>로 배열 길이 확인</li>
        </ul>
    </div>`,
                code: `const numbers: number[] = [1, 2, 3, 4, 5];
const fruits: string[] = ["apple", "banana"];
console.log(numbers[0]);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "1"
                    ]
                },
                keyConcepts: [
                    "number[], string[] 형식으로 배열 타입 지정",
                    "배열 인덱스로 요소 접근 (0부터 시작)",
                    ".length로 배열 길이 확인"
                ],
                canDoWith: [
                    "점수 목록, 이름 목록 등 데이터 관리",
                    "배열에 잘못된 타입 추가 방지",
                    "반복문과 함께 데이터 처리"
                ]
            },
            {
                id: 3,
                title: "객체 타입",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>객체의 타입을 정의하는 방법을 배웁니다. 인라인 타입 정의를 통해 객체의 구조를 명시적으로 선언하고, 각 속성의 타입을 지정할 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>객체의 구조를 미리 정의하면 잘못된 속성에 접근하거나 잘못된 타입의 값을 할당하는 것을 방지할 수 있습니다. 코드의 안정성이 높아집니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 타입 없이
const person = { name: "Bob", age: 30 };
person.emial = "bob@example.com";  // 오타! 하지만 오류 없음 😕

// 타입 있음
const person: { name: string; age: number } = {
    name: "Bob",
    age: 30
};
person.emial = "bob@example.com";  // ❌ 오류! 'emial' 속성 없음</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li>객체 타입은 중괄호 안에 속성과 타입을 나열</li>
            <li>각 속성은 세미콜론(;)으로 구분</li>
            <li>정의되지 않은 속성에 접근하면 오류 발생</li>
            <li>타입과 일치하지 않는 값 할당 불가</li>
        </ul>
    </div>`,
                code: `const person: { name: string; age: number } = {
    name: "Bob",
    age: 30
};
console.log(person.name);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "Bob"
                    ]
                },
                keyConcepts: [
                    "{ 속성명: 타입 } 형식으로 객체 타입 정의",
                    "점 표기법으로 속성 접근",
                    "여러 관련 데이터를 하나로 묶기"
                ],
                canDoWith: [
                    "사용자 프로필 객체 생성",
                    "API 응답 데이터 구조화",
                    "설정 값들을 객체로 관리"
                ]
            },
            {
                id: 4,
                title: "함수와 타입",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>함수의 매개변수와 반환값에 타입을 지정하는 방법을 배웁니다. 함수가 어떤 타입의 값을 받고 반환하는지 명확하게 선언할 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>함수에 타입을 지정하면 잘못된 타입의 인자를 전달하거나 반환값을 잘못 사용하는 실수를 방지할 수 있습니다. 함수 사용법이 더 명확해집니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 타입 지정
function add(a: number, b: number): number {
    return a + b;
}

add(5, 10);      // ✅ OK: 15
add("5", "10");  // ❌ 오류! string은 number가 아님

// 반환 타입도 체크됨
function getName(): string {
    return 123;  // ❌ 오류! number는 string이 아님
}</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li>매개변수 타입: <code>name: string</code></li>
            <li>반환 타입: <code>): string</code></li>
            <li>잘못된 타입 전달 시 즉시 오류</li>
            <li>함수의 계약(contract)을 명확히 정의</li>
        </ul>
    </div>`,
                code: `function greet(name: string): string {
    return \`Hello, \${name}!\`;
}
console.log(greet("World"));`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "Hello, World!"
                    ]
                },
                keyConcepts: [
                    "매개변수에 타입 지정: (name: string)",
                    "반환 타입 지정: ): string",
                    "템플릿 리터럴로 문자열 조합"
                ],
                canDoWith: [
                    "재사용 가능한 유틸리티 함수 작성",
                    "함수 호출 시 잘못된 인자 전달 방지",
                    "함수 반환값 타입 보장"
                ]
            },
            {
                id: 5,
                title: "인터페이스 기초",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>인터페이스를 사용하여 객체의 구조를 정의하는 방법을 배웁니다. 인터페이스는 재사용 가능한 타입 정의로, 여러 곳에서 같은 구조를 쉽게 사용할 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>인터페이스를 사용하면 객체 타입을 한 번 정의하고 여러 곳에서 재사용할 수 있습니다. 코드가 더 깔끔해지고 유지보수가 쉬워집니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 인라인 타입 (매번 작성해야 함)
const user1: { name: string; age: number } = { name: "Alice", age: 25 };
const user2: { name: string; age: number } = { name: "Bob", age: 30 };

// 인터페이스 (한 번 정의하고 재사용)
interface User {
    name: string;
    age: number;
}
const user1: User = { name: "Alice", age: 25 };
const user2: User = { name: "Bob", age: 30 };  // 훨씬 깔끔! ✨</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>interface</code> 키워드로 정의</li>
            <li>객체의 "청사진" 역할</li>
            <li>여러 곳에서 재사용 가능</li>
            <li>코드 가독성과 유지보수성 향상</li>
        </ul>
    </div>`,
                code: `interface User {
    name: string;
    age: number;
}

const user: User = {
    name: "Charlie",
    age: 28
};
console.log(user.name);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "Charlie"
                    ]
                },
                keyConcepts: [
                    "interface로 객체 구조 정의",
                    "타입 재사용으로 코드 중복 감소",
                    "명확한 계약(Contract) 정의"
                ],
                canDoWith: [
                    "API 요청/응답 타입 정의",
                    "컴포넌트 props 타입 정의",
                    "팀원 간 데이터 구조 공유"
                ]
            },
            {
                id: 6,
                title: "선택적 속성",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>인터페이스에서 선택적 속성(Optional Properties)을 정의하는 방법을 배웁니다. 물음표(?)를 사용하여 있어도 되고 없어도 되는 속성을 만들 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>모든 객체가 모든 속성을 가져야 하는 것은 아닙니다. 선택적 속성을 사용하면 유연한 타입 정의가 가능하며, 필수 속성과 선택 속성을 명확히 구분할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>interface Product {
    name: string;      // 필수
    price: number;     // 필수
    discount?: number; // 선택적
}

// discount 없어도 OK ✅
const laptop: Product = {
    name: "Laptop",
    price: 1000
};

// discount 있어도 OK ✅
const phone: Product = {
    name: "Phone",
    price: 500,
    discount: 50
};</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>속성?:</code> 형태로 선택적 속성 정의</li>
            <li>선택적 속성은 생략 가능</li>
            <li>있으면 타입 체크, 없으면 undefined</li>
            <li>필수와 선택 속성을 명확히 구분</li>
        </ul>
    </div>`,
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
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "Laptop"
                    ]
                },
                keyConcepts: [
                    "속성?: 타입 형태로 선택적 속성 정의",
                    "선택적 속성은 생략 가능",
                    "필수와 선택 속성을 명확히 구분"
                ],
                canDoWith: [
                    "유연한 설정 객체 정의",
                    "선택적 기능 파라미터 처리",
                    "API 요청 선택 필드 관리"
                ]
            },
            {
                id: 7,
                title: "읽기 전용 속성",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>readonly 키워드를 사용하여 읽기 전용 속성을 만드는 방법을 배웁니다. 읽기 전용 속성은 한 번 설정하면 변경할 수 없어 데이터의 불변성을 보장합니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>변경되면 안 되는 값을 보호할 수 있습니다. 예를 들어, 게임 캐릭터의 ID나 좌표계의 원점 같은 값은 실수로 변경되면 큰 문제가 발생할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>interface Point {
    readonly x: number;
    readonly y: number;
}

const origin: Point = { x: 0, y: 0 };
console.log(origin.x);  // ✅ 읽기는 OK

origin.x = 10;  // ❌ 오류! readonly 속성은 수정 불가

// 실제 활용 예시
interface Config {
    readonly apiKey: string;
    readonly maxRetries: number;
}  // 설정 값을 실수로 변경하는 것 방지</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>readonly</code> 키워드로 읽기 전용 지정</li>
            <li>초기화 후 수정 불가</li>
            <li>읽기는 자유롭게 가능</li>
            <li>데이터 불변성 보장</li>
        </ul>
    </div>`,
                code: `interface Point {
    readonly x: number;
    readonly y: number;
}

const point: Point = { x: 10, y: 20 };
console.log(point.x);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "10"
                    ]
                },
                keyConcepts: [
                    "readonly 키워드로 읽기 전용 지정",
                    "초기화 후 수정 불가",
                    "데이터 불변성 보장"
                ],
                canDoWith: [
                    "설정 값 보호",
                    "좌표계 원점 등 상수 객체 정의",
                    "실수로 값 변경하는 버그 방지"
                ]
            },
            {
                id: 8,
                title: "유니온 타입",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>유니온 타입을 사용하여 여러 타입 중 하나를 허용하는 방법을 배웁니다. 파이프(|) 기호를 사용하여 "이것 또는 저것" 형태의 타입을 정의할 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>실제 프로그래밍에서는 한 변수가 여러 타입의 값을 가질 수 있는 경우가 많습니다. 예를 들어, ID는 문자열일 수도 있고 숫자일 수도 있습니다. 유니온 타입으로 이를 안전하게 처리할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// ID는 문자열 또는 숫자
let userId: string | number;

userId = "user_123";    // ✅ OK
userId = 456;           // ✅ OK
userId = true;          // ❌ 오류! boolean은 허용 안 됨

// 함수에서도 사용 가능
function printId(id: string | number) {
    console.log(\`ID: \${id}\`);
}

printId("abc123");  // ✅ OK
printId(789);       // ✅ OK</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>타입1 | 타입2</code> 형태로 정의</li>
            <li>둘 중 하나의 타입이면 OK</li>
            <li>여러 개도 가능: <code>string | number | boolean</code></li>
            <li>타입 안정성을 유지하면서 유연성 확보</li>
        </ul>
    </div>`,
                code: `let value: string | number;
value = "hello";
console.log(value);
value = 42;
console.log(value);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "hello",
                        "42"
                    ]
                },
                keyConcepts: [
                    "타입1 | 타입2 형태로 정의",
                    "둘 중 하나의 타입이면 OK",
                    "여러 개도 가능: string | number | boolean"
                ],
                canDoWith: [
                    "문자열/숫자 ID 둘 다 허용",
                    "타입 안정성 유지하면서 유연성 확보",
                    "여러 형태의 입력값 처리"
                ]
            },
            {
                id: 9,
                title: "타입 별칭",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>type 키워드를 사용하여 타입에 이름을 붙이는 방법을 배웁니다. 복잡한 타입을 간단한 이름으로 재사용할 수 있어 코드가 더 읽기 쉬워집니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>긴 타입 정의를 매번 반복해서 쓰는 것은 비효율적입니다. 타입 별칭을 사용하면 한 번 정의하고 여러 곳에서 재사용할 수 있어 코드 유지보수가 쉬워집니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 타입 별칭 없이 (반복적)
let userId: string | number = "user123";
let orderId: string | number = 456;
let productId: string | number = "prod789";

// 타입 별칭 사용 (깔끔!)
type ID = string | number;

let userId: ID = "user123";
let orderId: ID = 456;
let productId: ID = "prod789";

// 복잡한 타입도 가능
type Point = { x: number; y: number };
type User = { name: string; age: number; location: Point };</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>type 이름 = 타입</code> 형태로 정의</li>
            <li>유니온, 객체 등 모든 타입 가능</li>
            <li>재사용성과 가독성 향상</li>
            <li>인터페이스와 유사하지만 더 유연함</li>
        </ul>
    </div>`,
                code: `type ID = string | number;

const userId: ID = "user123";
const productId: ID = 456;
console.log(userId);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "user123"
                    ]
                },
                keyConcepts: [
                    "type 이름 = 타입 형태로 정의",
                    "유니온, 객체 등 모든 타입 가능",
                    "재사용성과 가독성 향상"
                ],
                canDoWith: [
                    "복잡한 타입에 의미 있는 이름 부여",
                    "타입 정의 한 곳에서 관리",
                    "코드 일관성 유지"
                ]
            },
            {
                id: 10,
                title: "배열 메서드와 타입",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>배열의 map 메서드를 사용하여 배열의 각 요소를 변환하는 방법을 배웁니다. TypeScript는 자동으로 결과 배열의 타입을 추론합니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>배열 변환은 프로그래밍에서 매우 자주 사용됩니다. TypeScript는 map의 결과 타입을 자동으로 추론하여 타입 안정성을 유지하면서도 편리하게 코딩할 수 있게 합니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 숫자 배열을 2배로
const numbers: number[] = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
// doubled의 타입은 자동으로 number[]

// 숫자를 문자열로 변환
const numbers: number[] = [1, 2, 3];
const strings = numbers.map(n => \`숫자 \${n}\`);
// strings의 타입은 자동으로 string[]

// 객체 배열도 가능
const users = [{ name: "Alice" }, { name: "Bob" }];
const names = users.map(user => user.name);
// names의 타입은 자동으로 string[]</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>map</code>은 새로운 배열 반환</li>
            <li>원본 배열은 변경되지 않음</li>
            <li>TypeScript가 결과 타입 자동 추론</li>
            <li>타입 안정성을 유지하며 배열 변환</li>
        </ul>
    </div>`,
                code: `const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "[ 2, 4, 6, 8, 10 ]"
                    ]
                },
                keyConcepts: [
                    "map은 새로운 배열 반환",
                    "원본 배열은 변경되지 않음",
                    "TypeScript가 결과 타입 자동 추론"
                ],
                canDoWith: [
                    "데이터 변환 파이프라인 구성",
                    "API 응답 데이터 가공",
                    "UI용 데이터 포맷팅"
                ]
            },
            {
                id: 11,
                title: "클래스 기초",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>클래스를 정의하고 인스턴스를 생성하는 방법을 배웁니다. 클래스는 관련된 데이터(속성)와 기능(메서드)을 하나로 묶는 객체 지향 프로그래밍의 핵심 개념입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>클래스를 사용하면 비슷한 구조를 가진 여러 객체를 쉽게 만들 수 있습니다. 예를 들어, 게임의 여러 캐릭터나 쇼핑몰의 여러 상품을 효율적으로 관리할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 클래스 정의 (템플릿)
class Person {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    greet(): string {
        return \`Hello, I'm \${this.name}\`;
    }
}

// 인스턴스 생성 (실제 객체)
const alice = new Person("Alice");
const bob = new Person("Bob");

console.log(alice.greet());  // Hello, I'm Alice
console.log(bob.greet());    // Hello, I'm Bob</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>class</code> 키워드로 정의</li>
            <li><code>constructor</code>로 초기화</li>
            <li><code>new</code>로 인스턴스 생성</li>
            <li>속성과 메서드를 함께 관리</li>
        </ul>
    </div>`,
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
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "Hello, I'm Alice"
                    ]
                }
            },
            {
                id: 12,
                title: "접근 제어자",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>public, private, protected 접근 제어자를 사용하여 클래스의 속성과 메서드에 대한 접근 권한을 제어하는 방법을 배웁니다. 캡슐화를 통해 데이터를 보호할 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>은행 계좌의 잔액처럼 중요한 데이터는 외부에서 마음대로 변경하면 안 됩니다. private을 사용하면 클래스 내부에서만 접근 가능하도록 보호할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>class BankAccount {
    private balance: number;  // 외부 접근 불가

    constructor(initial: number) {
        this.balance = initial;
    }

    // 안전하게 잔액 확인
    getBalance(): number {
        return this.balance;
    }

    // 안전하게 입금
    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
        }
    }
}

const account = new BankAccount(1000);
account.balance = 9999999;  // ❌ 오류! private 속성 접근 불가
account.deposit(500);       // ✅ OK: 메서드를 통한 안전한 접근</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>private</code>: 클래스 내부에서만 접근</li>
            <li><code>public</code>: 어디서나 접근 (기본값)</li>
            <li><code>protected</code>: 클래스와 자식 클래스에서 접근</li>
            <li>데이터 보호와 안전한 인터페이스 제공</li>
        </ul>
    </div>`,
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
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "1000"
                    ]
                }
            },
            {
                id: 13,
                title: "제네릭 기초",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>제네릭을 사용하여 여러 타입에서 동작하는 재사용 가능한 함수를 만드는 방법을 배웁니다. 제네릭은 타입을 "변수"처럼 사용할 수 있게 해줍니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>같은 로직을 여러 타입에 적용하고 싶을 때 코드를 반복하지 않고도 타입 안정성을 유지할 수 있습니다. 예를 들어, 배열의 첫 번째 요소를 반환하는 함수를 모든 타입에서 사용할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 제네릭 없이 (타입마다 함수 작성)
function getFirstString(arr: string[]): string {
    return arr[0];
}
function getFirstNumber(arr: number[]): number {
    return arr[0];
}  // 반복적! 😕

// 제네릭 사용 (하나로 해결)
function getFirst<T>(arr: T[]): T {
    return arr[0];
}

const firstStr = getFirst<string>(["a", "b"]);    // "a"
const firstNum = getFirst<number>([1, 2, 3]);     // 1
// 타입 안정성 유지하며 재사용 가능! ✨</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>&lt;T&gt;</code> 형태로 제네릭 타입 정의</li>
            <li>T는 타입 변수 (Type variable)</li>
            <li>호출 시 구체적인 타입 지정</li>
            <li>코드 재사용성과 타입 안정성 모두 확보</li>
        </ul>
    </div>`,
                code: `function identity<T>(arg: T): T {
    return arg;
}

const result1 = identity<string>("hello");
const result2 = identity<number>(42);
console.log(result1);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "hello"
                    ]
                }
            },
            {
                id: 14,
                title: "열거형 (Enum)",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>Enum(열거형)을 정의하고 사용하는 방법을 배웁니다. Enum은 관련된 상수들을 그룹화하여 의미 있는 이름으로 관리할 수 있게 해줍니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>숫자나 문자열 대신 의미 있는 이름을 사용하면 코드가 더 읽기 쉽고 실수를 줄일 수 있습니다. 예를 들어, 방향을 0, 1, 2, 3 대신 Direction.North, Direction.South로 표현할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 숫자로 관리 (의미 파악 어려움)
const status = 0;  // 이게 무슨 상태? 🤔
if (status === 0) { /* ... */ }

// Enum 사용 (명확함!)
enum OrderStatus {
    Pending,    // 0
    Shipped,    // 1
    Delivered   // 2
}

const status = OrderStatus.Pending;  // 대기 중이구나! ✨
if (status === OrderStatus.Pending) { /* ... */ }

// 게임 방향 예시
enum Direction {
    Up = "UP",
    Down = "DOWN",
    Left = "LEFT",
    Right = "RIGHT"
}</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>enum</code> 키워드로 정의</li>
            <li>기본적으로 0부터 자동 할당</li>
            <li>명시적으로 값 지정 가능</li>
            <li>코드 가독성과 유지보수성 향상</li>
        </ul>
    </div>`,
                code: `enum Color {
    Red,
    Green,
    Blue
}

const favorite: Color = Color.Blue;
console.log(favorite);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "2"
                    ]
                }
            },
            {
                id: 15,
                title: "인터페이스 확장",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>인터페이스 상속을 사용하여 기존 인터페이스를 확장하는 방법을 배웁니다. extends 키워드로 기존 속성을 유지하면서 새로운 속성을 추가할 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>공통 속성을 반복해서 작성하지 않아도 됩니다. 예를 들어, 모든 동물이 가진 공통 속성을 Animal 인터페이스에 정의하고, 각 동물 종류는 이를 확장하여 고유한 속성만 추가하면 됩니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 기본 인터페이스
interface Animal {
    name: string;
    age: number;
}

// 확장된 인터페이스
interface Dog extends Animal {
    breed: string;
    bark(): void;
}

interface Cat extends Animal {
    color: string;
    meow(): void;
}

// Dog는 name, age, breed 속성을 모두 가짐
const dog: Dog = {
    name: "Buddy",
    age: 3,
    breed: "Golden Retriever",
    bark: () => console.log("Woof!")
};</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>extends</code> 키워드로 상속</li>
            <li>부모의 모든 속성 자동 포함</li>
            <li>새로운 속성 추가 가능</li>
            <li>코드 중복 제거와 구조화</li>
        </ul>
    </div>`,
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
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ ts-node example.ts",
                        "Buddy"
                    ]
                }
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
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>JavaScript의 세 가지 변수 선언 방식(const, let, var)을 배웁니다. 각 키워드의 특징과 언제 사용하는지 이해합니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>변수는 프로그래밍의 가장 기본이 되는 개념입니다. 적절한 변수 선언 방식을 선택하면 버그를 예방하고 코드를 더 안전하게 만들 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// const: 재할당 불가 (상수)
const PI = 3.14;
PI = 3.14159;  // ❌ 오류! 재할당 불가

// let: 재할당 가능
let score = 100;
score = 95;    // ✅ OK

// var: 옛날 방식 (요즘은 잘 안 씀)
var oldStyle = "legacy";</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>const</code>: 재할당 불가, 기본적으로 사용 권장</li>
            <li><code>let</code>: 재할당 필요할 때 사용</li>
            <li><code>var</code>: 옛날 방식, 사용 지양</li>
            <li>변수명은 의미 있게 작성</li>
        </ul>
    </div>`,
                code: `const name = "Alice";
let age = 25;
var city = "Seoul";
console.log(name);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "Alice"
                    ]
                }
            },
            {
                id: 2,
                title: "기본 연산",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>JavaScript의 기본 산술 연산을 배웁니다. 덧셈, 뺄셈, 곱셈, 나눗셈 등 숫자를 계산하는 방법을 익힙니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>산술 연산은 모든 프로그램의 기초입니다. 게임 점수 계산, 쇼핑몰 가격 계산, 통계 처리 등 거의 모든 프로그램에서 사용됩니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>const a = 10;
const b = 3;

console.log(a + b);  // 13 (덧셈)
console.log(a - b);  // 7  (뺄셈)
console.log(a * b);  // 30 (곱셈)
console.log(a / b);  // 3.333... (나눗셈)
console.log(a % b);  // 1  (나머지)</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>+</code> : 덧셈</li>
            <li><code>-</code> : 뺄셈</li>
            <li><code>*</code> : 곱셈</li>
            <li><code>/</code> : 나눗셈</li>
            <li><code>%</code> : 나머지</li>
        </ul>
    </div>`,
                code: `const a = 10;
const b = 5;
const sum = a + b;
console.log(sum);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "15"
                    ]
                }
            },
            {
                id: 3,
                title: "문자열 연결",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>더하기 연산자(+)를 사용하여 문자열을 연결하는 방법을 배웁니다. 여러 문자열을 하나로 합칠 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>프로그램에서 메시지를 만들거나 데이터를 조합할 때 자주 사용됩니다. 예를 들어, "안녕하세요, 홍길동님!"처럼 이름을 포함한 인사말을 만들 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>const greeting = "안녕하세요";
const name = "홍길동";
const message = greeting + ", " + name + "님!";
console.log(message);  // 안녕하세요, 홍길동님!

// 여러 개 연결 가능
const a = "JavaScript";
const b = "is";
const c = "awesome";
console.log(a + " " + b + " " + c);  // JavaScript is awesome</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>+</code> 연산자로 문자열 연결</li>
            <li>공백도 문자열로 추가 가능</li>
            <li>여러 개를 연속으로 연결 가능</li>
            <li>숫자 + 문자열 = 문자열</li>
        </ul>
    </div>`,
                code: `const firstName = "John";
const lastName = "Doe";
const fullName = firstName + " " + lastName;
console.log(fullName);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "John Doe"
                    ]
                }
            },
            {
                id: 4,
                title: "템플릿 리터럴",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>백틱(\`)과 \${}를 사용하여 문자열에 변수를 쉽게 삽입하는 방법을 배웁니다. 템플릿 리터럴은 문자열 작성을 훨씬 편리하게 만들어줍니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>+ 연산자로 문자열을 연결하는 것보다 훨씬 읽기 쉽고 편리합니다. 특히 여러 변수를 포함할 때 코드가 깔끔해집니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// + 연산자 사용 (복잡함)
const name = "Alice";
const age = 25;
const msg1 = "My name is " + name + " and I'm " + age + " years old";

// 템플릿 리터럴 사용 (깔끔!)
const msg2 = \`My name is \${name} and I'm \${age} years old\`;

// 계산도 가능
const price = 10000;
console.log(\`총 가격: \${price * 2}원\`);  // 총 가격: 20000원</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li>백틱(\`) 사용 (작은따옴표 아님!)</li>
            <li>\${변수명}으로 변수 삽입</li>
            <li>\${표현식}으로 계산 결과도 삽입 가능</li>
            <li>여러 줄 문자열도 쉽게 작성</li>
        </ul>
    </div>`,
                code: `const name = "Alice";
const age = 25;
const message = \`My name is \${name} and I'm \${age} years old\`;
console.log(message);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "My name is Alice and I'm 25 years old"
                    ]
                }
            },
            {
                id: 5,
                title: "배열 기초",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>배열을 생성하고 요소에 접근하는 방법을 배웁니다. 배열은 여러 값을 순서대로 저장하는 자료구조입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>관련된 데이터를 하나로 묶어서 관리할 수 있습니다. 예를 들어, 학생들의 점수 목록, 쇼핑 카트의 상품 목록 등을 효율적으로 다룰 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 배열 생성
const colors = ["red", "green", "blue"];

// 인덱스로 접근 (0부터 시작!)
console.log(colors[0]);  // red
console.log(colors[1]);  // green
console.log(colors[2]);  // blue

// 배열 길이 확인
console.log(colors.length);  // 3

// 마지막 요소 접근
console.log(colors[colors.length - 1]);  // blue</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li>대괄호 <code>[]</code>로 배열 생성</li>
            <li>인덱스는 0부터 시작</li>
            <li><code>.length</code>로 배열 길이 확인</li>
            <li>쉼표로 요소 구분</li>
        </ul>
    </div>`,
                code: `const fruits = ["apple", "banana", "orange"];
console.log(fruits[0]);
console.log(fruits.length);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "apple",
                        "3"
                    ]
                }
            },
            {
                id: 6,
                title: "배열 메서드 - push",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>push 메서드를 사용하여 배열의 끝에 새로운 요소를 추가하는 방법을 배웁니다. 배열은 필요에 따라 크기가 자동으로 늘어납니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>프로그램 실행 중에 데이터를 추가해야 하는 경우가 많습니다. 예를 들어, 쇼핑 카트에 상품 추가, 할 일 목록에 새 항목 추가 등에 사용됩니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>const todos = ["공부하기", "운동하기"];
console.log(todos);  // ["공부하기", "운동하기"]

// 새로운 할 일 추가
todos.push("책 읽기");
console.log(todos);  // ["공부하기", "운동하기", "책 읽기"]

// 여러 개 한번에 추가
todos.push("저녁 먹기", "산책하기");
console.log(todos);  // 5개 항목

// 숫자도 가능
const scores = [90, 85];
scores.push(95);
console.log(scores);  // [90, 85, 95]</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>.push(값)</code>으로 끝에 추가</li>
            <li>원본 배열이 변경됨</li>
            <li>여러 개 한번에 추가 가능</li>
            <li>추가 후 배열의 새 길이 반환</li>
        </ul>
    </div>`,
                code: `const numbers = [1, 2, 3];
numbers.push(4);
console.log(numbers);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "[ 1, 2, 3, 4 ]"
                    ]
                }
            },
            {
                id: 7,
                title: "객체 기초",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>객체를 생성하고 속성에 접근하는 방법을 배웁니다. 객체는 관련된 데이터를 키-값 쌍으로 구조화하여 저장합니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>실제 세계의 사물이나 개념을 코드로 표현할 때 객체를 사용합니다. 예를 들어, 사용자 정보(이름, 나이, 이메일)를 하나의 객체로 관리하면 훨씬 편리합니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 여러 변수로 관리 (불편함)
const userName = "홍길동";
const userAge = 30;
const userCity = "서울";

// 객체로 관리 (편리함!)
const user = {
    name: "홍길동",
    age: 30,
    city: "서울"
};

// 점 표기법으로 접근
console.log(user.name);  // 홍길동
console.log(user.age);   // 30

// 대괄호 표기법도 가능
console.log(user["city"]);  // 서울</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li>중괄호 <code>{}</code>로 객체 생성</li>
            <li><code>키: 값</code> 형태로 데이터 저장</li>
            <li><code>객체.키</code>로 값 접근</li>
            <li>관련된 데이터를 하나로 묶어 관리</li>
        </ul>
    </div>`,
                code: `const person = {
    name: "Bob",
    age: 30,
    city: "Seoul"
};
console.log(person.name);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "Bob"
                    ]
                }
            },
            {
                id: 8,
                title: "함수 선언",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>함수를 선언하고 호출하는 방법을 배웁니다. 함수는 특정 작업을 수행하는 재사용 가능한 코드 블록입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>같은 코드를 반복해서 작성하지 않고 함수로 만들어 재사용할 수 있습니다. 코드가 깔끔해지고 수정도 쉬워집니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 함수 정의
function sayHello(name) {
    return "안녕하세요, " + name + "님!";
}

// 함수 호출
console.log(sayHello("홍길동"));  // 안녕하세요, 홍길동님!
console.log(sayHello("김철수"));  // 안녕하세요, 김철수님!

// 계산 함수
function add(a, b) {
    return a + b;
}

const result = add(5, 3);
console.log(result);  // 8</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>function</code> 키워드로 정의</li>
            <li>괄호 안에 매개변수 선언</li>
            <li><code>return</code>으로 값 반환</li>
            <li>함수명()으로 호출</li>
        </ul>
    </div>`,
                code: `function greet(name) {
    return "Hello, " + name;
}
const message = greet("World");
console.log(message);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "Hello, World"
                    ]
                }
            },
            {
                id: 9,
                title: "화살표 함수",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>화살표 함수(=>)를 사용하여 함수를 더 간결하게 작성하는 방법을 배웁니다. 최신 JavaScript의 편리한 문법입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>짧은 함수를 작성할 때 코드가 훨씬 깔끔해집니다. 특히 배열 메서드(map, filter 등)와 함께 사용하면 매우 편리합니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 일반 함수
function add1(a, b) {
    return a + b;
}

// 화살표 함수 (간결!)
const add2 = (a, b) => a + b;

// 둘 다 같은 동작
console.log(add1(5, 3));  // 8
console.log(add2(5, 3));  // 8

// 매개변수가 하나면 괄호 생략 가능
const double = n => n * 2;
console.log(double(5));  // 10

// 본문이 여러 줄이면 중괄호 사용
const greet = name => {
    const message = "Hello, " + name;
    return message;
};</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>=></code> 기호 사용 (화살표)</li>
            <li>한 줄이면 자동으로 return</li>
            <li>매개변수 하나면 괄호 생략 가능</li>
            <li>더 간결한 문법</li>
        </ul>
    </div>`,
                code: `const add = (a, b) => a + b;
const result = add(5, 3);
console.log(result);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "8"
                    ]
                }
            },
            {
                id: 10,
                title: "if 조건문",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>if-else 조건문을 사용하여 조건에 따라 다른 코드를 실행하는 방법을 배웁니다. 프로그램의 흐름을 제어하는 핵심 개념입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>프로그램은 상황에 따라 다르게 동작해야 합니다. 예를 들어, 로그인 여부에 따라 다른 페이지를 보여주거나, 점수에 따라 등급을 다르게 매길 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>const score = 85;

// 단순 if
if (score >= 90) {
    console.log("A등급");
} else if (score >= 80) {
    console.log("B등급");  // 이것이 실행됨
} else if (score >= 70) {
    console.log("C등급");
} else {
    console.log("F등급");
}

// 비교 연산자
const age = 20;
if (age >= 18) {
    console.log("성인입니다");
}

// 논리 연산자
const hasTicket = true;
const hasId = true;
if (hasTicket && hasId) {
    console.log("입장 가능");
}</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>if (조건)</code>: 조건이 true면 실행</li>
            <li><code>else if</code>: 추가 조건 검사</li>
            <li><code>else</code>: 모든 조건이 false일 때</li>
            <li>비교: <code>==, !=, >, <, >=, <=</code></li>
        </ul>
    </div>`,
                code: `const age = 20;
if (age >= 18) {
    console.log("Adult");
} else {
    console.log("Minor");
}`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "Adult"
                    ]
                }
            },
            {
                id: 11,
                title: "for 반복문",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>for 반복문을 사용하여 코드를 여러 번 자동으로 실행하는 방법을 배웁니다. 반복 작업을 효율적으로 처리할 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>같은 코드를 수십, 수백 번 복사-붙여넣기 하는 대신 반복문 하나로 처리할 수 있습니다. 예를 들어, 1부터 100까지 출력하거나 배열의 모든 요소를 처리할 때 사용합니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 0부터 4까지 출력
for (let i = 0; i < 5; i++) {
    console.log(i);
}
// 출력: 0, 1, 2, 3, 4

// 1부터 10까지의 합
let sum = 0;
for (let i = 1; i <= 10; i++) {
    sum += i;
}
console.log(sum);  // 55

// 배열 순회
const fruits = ["apple", "banana", "orange"];
for (let i = 0; i < fruits.length; i++) {
    console.log(fruits[i]);
}</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>for (초기화; 조건; 증감)</code> 구조</li>
            <li>조건이 true인 동안 반복</li>
            <li><code>i++</code>는 i를 1 증가</li>
            <li>배열 순회에 자주 사용</li>
        </ul>
    </div>`,
                code: `for (let i = 0; i < 5; i++) {
    console.log(i);
}`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "0",
                        "1",
                        "2",
                        "3",
                        "4"
                    ]
                }
            },
            {
                id: 12,
                title: "while 반복문",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>while 반복문을 사용하여 조건이 참인 동안 코드를 계속 반복 실행하는 방법을 배웁니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>반복 횟수를 미리 알 수 없을 때 유용합니다. 예를 들어, 사용자가 올바른 비밀번호를 입력할 때까지 계속 물어보거나, 특정 조건이 충족될 때까지 작업을 반복할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 기본 while 문
let count = 0;
while (count < 3) {
    console.log("count:", count);
    count++;
}
// 출력: count: 0, count: 1, count: 2

// 조건이 충족될 때까지 반복
let num = 1;
while (num < 100) {
    num = num * 2;
}
console.log(num);  // 128 (2의 거듭제곱 중 100 이상인 첫 수)

// for vs while
// for: 반복 횟수를 알 때
// while: 조건에 따라 반복할 때</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>while (조건)</code> 구조</li>
            <li>조건이 true인 동안 계속 실행</li>
            <li>조건을 false로 만들 방법 필요</li>
            <li>무한 루프 주의!</li>
        </ul>
    </div>`,
                code: `let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "0",
                        "1",
                        "2"
                    ]
                }
            },
            {
                id: 13,
                title: "배열 map",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>map 메서드를 사용하여 배열의 각 요소를 변환하여 새로운 배열을 만드는 방법을 배웁니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>배열의 모든 요소에 같은 작업을 적용할 때 for 문보다 훨씬 간결하고 읽기 쉬운 코드를 작성할 수 있습니다. 데이터 변환 작업에서 매우 자주 사용됩니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// for 문 사용 (번거로움)
const numbers = [1, 2, 3, 4];
const doubled1 = [];
for (let i = 0; i < numbers.length; i++) {
    doubled1.push(numbers[i] * 2);
}

// map 사용 (간결!)
const doubled2 = numbers.map(n => n * 2);
console.log(doubled2);  // [2, 4, 6, 8]

// 문자열 변환
const names = ["alice", "bob", "charlie"];
const upperNames = names.map(name => name.toUpperCase());
console.log(upperNames);  // ["ALICE", "BOB", "CHARLIE"]

// 객체 배열 변환
const users = [{age: 20}, {age: 25}, {age: 30}];
const ages = users.map(user => user.age);
console.log(ages);  // [20, 25, 30]</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>.map(함수)</code>로 각 요소 변환</li>
            <li>새로운 배열 반환 (원본 유지)</li>
            <li>화살표 함수와 자주 사용</li>
            <li>배열 길이는 동일</li>
        </ul>
    </div>`,
                code: `const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2);
console.log(doubled);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "[ 2, 4, 6, 8 ]"
                    ]
                }
            },
            {
                id: 14,
                title: "배열 filter",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>filter 메서드를 사용하여 조건에 맞는 요소만 선택하여 새로운 배열을 만드는 방법을 배웁니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>데이터에서 원하는 것만 추출할 때 매우 유용합니다. 예를 들어, 모든 상품 중 가격이 10,000원 이하인 것만, 또는 성인 사용자만 필터링할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 짝수만 선택
const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);  // [2, 4, 6]

// 특정 조건의 객체 선택
const products = [
    { name: "노트북", price: 1000000 },
    { name: "마우스", price: 30000 },
    { name: "키보드", price: 80000 }
];
const affordable = products.filter(p => p.price <= 100000);
console.log(affordable);  // 마우스, 키보드

// 문자열 필터링
const words = ["apple", "banana", "avocado", "cherry"];
const aWords = words.filter(word => word.startsWith("a"));
console.log(aWords);  // ["apple", "avocado"]</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>.filter(조건함수)</code>로 요소 선택</li>
            <li>조건이 true인 요소만 포함</li>
            <li>새로운 배열 반환 (원본 유지)</li>
            <li>배열 길이가 줄어들 수 있음</li>
        </ul>
    </div>`,
                code: `const numbers = [1, 2, 3, 4, 5, 6];
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "[ 2, 4, 6 ]"
                    ]
                }
            },
            {
                id: 15,
                title: "객체 메서드",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>객체 내부에 함수를 정의하여 메서드를 만드는 방법을 배웁니다. 메서드는 객체가 수행할 수 있는 동작을 정의합니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>데이터와 그 데이터를 처리하는 기능을 함께 묶어서 관리할 수 있습니다. 예를 들어, 계산기 객체에 더하기, 빼기 등의 기능을 함께 포함시킬 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>// 메서드가 있는 객체
const person = {
    name: "홍길동",
    age: 30,
    // 메서드 정의
    greet: function() {
        return "안녕하세요, " + this.name + "입니다!";
    },
    // 축약 문법
    introduce() {
        return \`저는 \${this.age}살입니다.\`;
    }
};

console.log(person.greet());      // 안녕하세요, 홍길동입니다!
console.log(person.introduce());  // 저는 30살입니다.

// 계산기 예시
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b
};
console.log(calculator.add(10, 5));  // 15</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li>객체 속성에 함수 할당</li>
            <li><code>this</code>로 자신의 속성 접근</li>
            <li>축약 문법: <code>메서드명() {}</code></li>
            <li>데이터와 기능을 함께 관리</li>
        </ul>
    </div>`,
                code: `const calculator = {
    add: function(a, b) {
        return a + b;
    }
};
const result = calculator.add(10, 5);
console.log(result);`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ node example.js",
                        "15"
                    ]
                }
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
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>GodotScript의 변수 선언 방법을 배웁니다. var 키워드를 사용하여 변수를 선언하고 값을 할당하는 기본을 익힙니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임을 만들 때 캐릭터의 체력, 점수, 이름 등 다양한 정보를 저장하고 관리해야 합니다. 변수는 이러한 데이터를 담는 그릇 역할을 합니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 게임 캐릭터 정보
var player_name = "용사"
var health = 100
var level = 1
var is_alive = true

print(player_name)  # 용사
print(health)       # 100

# 변수값 변경 가능
health = 80
print(health)       # 80</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>var</code> 키워드로 변수 선언</li>
            <li>타입을 지정하지 않아도 됨 (동적 타입)</li>
            <li>언더스코어(_)로 단어 연결 (스네이크 케이스)</li>
            <li><code>print()</code>로 값 출력</li>
        </ul>
    </div>`,
                code: `var player_name = "Hero"
var health = 100
print(player_name)`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "Hero"
                    ]
                }
            },
            {
                id: 2,
                title: "상수 선언",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>const 키워드를 사용하여 상수를 선언하는 방법을 배웁니다. 상수는 한 번 설정하면 변경할 수 없는 값입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임에서 변하지 않아야 하는 값들이 있습니다. 예를 들어, 최대 속도, 중력 값, 점프 힘 등은 실수로 변경되면 게임이 망가질 수 있습니다. 상수를 사용하면 이를 방지할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 게임 설정값 (변경 불가)
const MAX_SPEED = 300
const GRAVITY = 980
const JUMP_FORCE = 500

print(MAX_SPEED)  # 300

# 상수는 변경 불가
# MAX_SPEED = 400  # ❌ 오류!

# 플레이어에 상수 적용
var player_speed = MAX_SPEED
var current_gravity = GRAVITY</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>const</code> 키워드로 상수 선언</li>
            <li>대문자와 언더스코어 사용 권장</li>
            <li>선언 후 값 변경 불가</li>
            <li>게임 설정값에 주로 사용</li>
        </ul>
    </div>`,
                code: `const MAX_SPEED = 300
const JUMP_FORCE = 500
print(MAX_SPEED)`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "300"
                    ]
                }
            },
            {
                id: 3,
                title: "기본 연산",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>GodotScript의 기본 산술 연산을 배웁니다. 덧셈, 뺄셈, 곱셈, 나눗셈 등 숫자 계산을 수행할 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임에서 수많은 계산이 필요합니다. 데미지 계산, 점수 합산, 거리 계산, 물리 연산 등 거의 모든 게임 로직에서 산술 연산을 사용합니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 데미지 계산
var base_damage = 50
var bonus_damage = 20
var total_damage = base_damage + bonus_damage
print(total_damage)  # 70

# 체력 감소
var health = 100
var damage = 30
health = health - damage
print(health)  # 70

# 크리티컬 데미지 (2배)
var critical = base_damage * 2
print(critical)  # 100

# 경험치 분배
var total_exp = 1000
var party_size = 4
var exp_per_player = total_exp / party_size
print(exp_per_player)  # 250</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>+</code>: 덧셈</li>
            <li><code>-</code>: 뺄셈</li>
            <li><code>*</code>: 곱셈</li>
            <li><code>/</code>: 나눗셈</li>
        </ul>
    </div>`,
                code: `var a = 10
var b = 5
var sum = a + b
print(sum)`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "15"
                    ]
                }
            },
            {
                id: 4,
                title: "문자열 연결",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>더하기 연산자(+)를 사용하여 문자열을 연결하는 방법을 배웁니다. 여러 문자열을 하나로 합칠 수 있습니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임에서 플레이어에게 메시지를 보여줄 때 자주 사용합니다. 예를 들어, "홍길동님이 레벨 5에 도달했습니다!"처럼 이름과 레벨을 포함한 메시지를 만들 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 인사 메시지
var player_name = "용사"
var greeting = "환영합니다, " + player_name + "님!"
print(greeting)  # 환영합니다, 용사님!

# 게임 상태 메시지
var score = 1500
var lives = 3
var status = "점수: " + str(score) + " 생명: " + str(lives)
print(status)  # 점수: 1500 생명: 3

# str() 함수로 숫자를 문자열로 변환
var level = 10
var message = "레벨 " + str(level) + " 달성!"
print(message)  # 레벨 10 달성!</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>+</code> 연산자로 문자열 연결</li>
            <li><code>str()</code>로 숫자를 문자열로 변환</li>
            <li>공백도 문자열로 추가</li>
            <li>게임 메시지 작성에 활용</li>
        </ul>
    </div>`,
                code: `var first = "Hello"
var second = "Godot"
var message = first + " " + second
print(message)`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "Hello Godot"
                    ]
                }
            },
            {
                id: 5,
                title: "배열 기초",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>배열을 생성하고 요소에 접근하는 방법을 배웁니다. 배열은 여러 아이템을 순서대로 저장하는 자료구조입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임에서 인벤토리 아이템, 적 목록, 점수 기록 등 여러 개의 데이터를 관리할 때 배열을 사용합니다. RPG 게임의 아이템 목록이 대표적인 예입니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 인벤토리 아이템
var inventory = ["검", "방패", "물약", "열쇠"]

# 첫 번째 아이템 (인덱스 0)
print(inventory[0])  # 검

# 두 번째 아이템 (인덱스 1)
print(inventory[1])  # 방패

# 배열 크기 확인
print(inventory.size())  # 4

# 마지막 아이템 접근
var last_item = inventory[inventory.size() - 1]
print(last_item)  # 열쇠

# 숫자 배열도 가능
var scores = [100, 250, 500, 1000]
print(scores[0])  # 100</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li>대괄호 <code>[]</code>로 배열 생성</li>
            <li>인덱스는 0부터 시작</li>
            <li><code>.size()</code>로 배열 크기 확인</li>
            <li>게임 아이템/데이터 관리에 활용</li>
        </ul>
    </div>`,
                code: `var items = ["sword", "shield", "potion"]
print(items[0])
print(items.size())`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "sword",
                        "3"
                    ]
                }
            },
            {
                id: 6,
                title: "딕셔너리",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>딕셔너리(Dictionary)를 생성하고 값에 접근하는 방법을 배웁니다. 딕셔너리는 키-값 쌍으로 관련된 데이터를 구조화하여 저장합니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>캐릭터 정보처럼 관련된 여러 데이터를 하나로 묶어서 관리할 때 매우 유용합니다. 예를 들어, 플레이어의 이름, 레벨, 체력, 마나를 하나의 딕셔너리로 관리할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 플레이어 정보
var player = {
    "name": "용사",
    "level": 10,
    "health": 100,
    "mana": 50,
    "gold": 1500
}

# 값 접근
print(player["name"])   # 용사
print(player["level"])  # 10

# 값 변경
player["health"] = 80
print(player["health"]) # 80

# 새 키 추가
player["experience"] = 5000
print(player["experience"])  # 5000

# 적 정보
var enemy = {
    "name": "고블린",
    "health": 50,
    "damage": 10
}
print(enemy["name"])  # 고블린</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li>중괄호 <code>{}</code>로 딕셔너리 생성</li>
            <li><code>"키": 값</code> 형태로 데이터 저장</li>
            <li><code>딕셔너리["키"]</code>로 값 접근</li>
            <li>게임 캐릭터/아이템 정보 관리에 활용</li>
        </ul>
    </div>`,
                code: `var player = {
    "name": "Hero",
    "level": 5,
    "health": 100
}
print(player["name"])`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "Hero"
                    ]
                }
            },
            {
                id: 7,
                title: "함수 정의",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>func 키워드를 사용하여 함수를 정의하는 방법을 배웁니다. 함수는 특정 작업을 수행하는 재사용 가능한 코드 블록입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임에서 같은 동작을 여러 번 수행해야 할 때 함수로 만들어 재사용합니다. 예를 들어, 데미지 계산, 아이템 획득, 사운드 재생 등을 함수로 만들면 코드가 깔끔해집니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 데미지 계산 함수
func calculate_damage(base_damage, defense):
    var final_damage = base_damage - defense
    if final_damage < 0:
        final_damage = 0
    return final_damage

# 함수 사용
var damage1 = calculate_damage(50, 20)
print(damage1)  # 30

var damage2 = calculate_damage(30, 40)
print(damage2)  # 0

# 레벨업 메시지 함수
func level_up_message(name, new_level):
    return name + "님이 레벨 " + str(new_level) + "에 도달했습니다!"

var msg = level_up_message("용사", 10)
print(msg)  # 용사님이 레벨 10에 도달했습니다!</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>func</code> 키워드로 함수 정의</li>
            <li>들여쓰기로 코드 블록 구분</li>
            <li><code>return</code>으로 값 반환</li>
            <li>게임 로직을 함수로 구조화</li>
        </ul>
    </div>`,
                code: `func greet(name):
    return "Hello, " + name

var message = greet("Player")
print(message)`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "Hello, Player"
                    ]
                }
            },
            {
                id: 8,
                title: "if 조건문",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>if-else 조건문을 사용하여 조건에 따라 다른 코드를 실행하는 방법을 배웁니다. 게임의 흐름을 제어하는 핵심 개념입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임은 상황에 따라 다르게 동작해야 합니다. 체력이 부족하면 경고를 표시하고, 점수가 높으면 보상을 주고, 적이 가까우면 공격하는 등 모든 게임 로직에서 조건문을 사용합니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 체력 상태 확인
var health = 50
if health > 70:
    print("건강합니다")
elif health > 30:
    print("주의하세요")  # 이것이 실행됨
else:
    print("위험합니다!")

# 아이템 사용 가능 여부
var gold = 100
var item_price = 50
if gold >= item_price:
    print("아이템을 구매할 수 있습니다")
    gold = gold - item_price
else:
    print("골드가 부족합니다")

# 레벨 체크
var level = 10
if level >= 10:
    print("새로운 지역 해금!")  # 출력됨</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>if 조건:</code> 형태 (콜론 필수)</li>
            <li><code>elif</code>: 추가 조건 (else if)</li>
            <li><code>else</code>: 모든 조건 불만족시</li>
            <li>들여쓰기로 블록 구분</li>
        </ul>
    </div>`,
                code: `var health = 50
if health > 30:
    print("Healthy")
else:
    print("Low health")`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "Healthy"
                    ]
                }
            },
            {
                id: 9,
                title: "for 반복문",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>for 반복문과 range 함수를 사용하여 코드를 자동으로 여러 번 실행하는 방법을 배웁니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임에서 반복 작업이 매우 많습니다. 여러 적에게 데미지 주기, 아이템 목록 표시하기, 파티클 생성하기 등 반복문 없이는 게임을 만들 수 없습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 0부터 4까지 출력
for i in range(5):
    print(i)
# 출력: 0, 1, 2, 3, 4

# 1부터 10까지
for i in range(1, 11):
    print(i)  # 1, 2, 3, ..., 10

# 배열 순회
var items = ["검", "방패", "물약"]
for item in items:
    print(item)
# 출력: 검, 방패, 물약

# 경험치 계산
var total_exp = 0
for i in range(1, 6):  # 레벨 1~5
    total_exp += i * 100
print(total_exp)  # 1500

# 적 생성
for i in range(3):
    print("적 " + str(i + 1) + " 생성")</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>for 변수 in 범위:</code> 형태</li>
            <li><code>range(n)</code>: 0부터 n-1까지</li>
            <li><code>range(시작, 끝)</code>: 시작부터 끝-1까지</li>
            <li>배열 순회에도 사용 가능</li>
        </ul>
    </div>`,
                code: `for i in range(5):
    print(i)`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "0",
                        "1",
                        "2",
                        "3",
                        "4"
                    ]
                }
            },
            {
                id: 10,
                title: "while 반복문",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>while 반복문을 사용하여 조건이 참인 동안 코드를 계속 반복하는 방법을 배웁니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>반복 횟수를 미리 알 수 없을 때 while문을 사용합니다. 예를 들어, 적의 체력이 0이 될 때까지 공격하거나, 플레이어가 특정 위치에 도달할 때까지 이동하는 등의 상황에서 유용합니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 기본 while 문
var count = 0
while count < 3:
    print("카운트: " + str(count))
    count += 1
# 출력: 카운트: 0, 카운트: 1, 카운트: 2

# 적 처치 시뮬레이션
var enemy_health = 100
var damage = 30
while enemy_health > 0:
    enemy_health -= damage
    print("적 체력: " + str(enemy_health))
# 적 체력이 0 이하가 될 때까지 반복

# 레벨업까지 경험치
var current_exp = 0
var required_exp = 100
var gain_per_kill = 25
while current_exp < required_exp:
    current_exp += gain_per_kill
    print("현재 경험치: " + str(current_exp))
print("레벨업!")</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>while 조건:</code> 형태</li>
            <li>조건이 true인 동안 계속 실행</li>
            <li><code>+=</code>로 변수 증가</li>
            <li>조건을 false로 만들 방법 필요</li>
        </ul>
    </div>`,
                code: `var count = 0
while count < 3:
    print(count)
    count += 1`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "0",
                        "1",
                        "2"
                    ]
                }
            },
            {
                id: 11,
                title: "Vector2 기초",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>Vector2를 사용하여 2D 좌표를 표현하는 방법을 배웁니다. Vector2는 Godot 2D 게임에서 가장 많이 사용되는 핵심 데이터 타입입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>2D 게임의 모든 위치, 방향, 속도는 Vector2로 표현됩니다. 캐릭터의 위치, 적의 이동 방향, 총알의 속도 등 거의 모든 것에 Vector2를 사용합니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 플레이어 위치
var player_pos = Vector2(100, 200)
print(player_pos.x)  # 100
print(player_pos.y)  # 200

# 이동 속도
var velocity = Vector2(50, 0)  # 오른쪽으로 이동
var new_pos = player_pos + velocity
print(new_pos)  # (150, 200)

# 방향 벡터
var direction_right = Vector2(1, 0)
var direction_up = Vector2(0, -1)
var direction_down = Vector2(0, 1)

# 거리 계산
var point_a = Vector2(0, 0)
var point_b = Vector2(100, 100)
var distance = point_a.distance_to(point_b)
print(distance)  # 약 141.42

# 벡터 연산
var vec1 = Vector2(10, 20)
var vec2 = Vector2(5, 10)
print(vec1 + vec2)  # (15, 30)
print(vec1 * 2)     # (20, 40)</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>Vector2(x, y)</code>로 생성</li>
            <li><code>.x</code>, <code>.y</code>로 좌표 접근</li>
            <li>벡터 연산 지원 (+, -, *)</li>
            <li>2D 게임의 모든 위치/방향 표현</li>
        </ul>
    </div>`,
                code: `var position = Vector2(100, 200)
print(position.x)
print(position.y)`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "100",
                        "200"
                    ]
                }
            },
            {
                id: 12,
                title: "_ready 함수",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>_ready 함수는 노드가 씬에 추가되어 준비되었을 때 자동으로 호출되는 특별한 함수입니다. 게임 시작 시 초기화 작업을 수행합니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임이 시작될 때 초기 설정이 필요합니다. 플레이어 위치 설정, 변수 초기화, 리소스 로딩 등을 _ready 함수에서 수행합니다. 마치 게임의 "시작" 버튼 같은 역할입니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 기본 _ready 함수
func _ready():
    print("게임이 시작되었습니다!")

# 초기 설정
func _ready():
    var player_health = 100
    var player_position = Vector2(0, 0)
    var game_score = 0

    print("체력: " + str(player_health))
    print("시작 위치: " + str(player_position))
    print("점수: " + str(game_score))

# 환영 메시지
func _ready():
    var player_name = "용사"
    var start_level = 1

    print("환영합니다, " + player_name + "님!")
    print("시작 레벨: " + str(start_level))
    print("모험을 시작합니다!")</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>func _ready():</code> 형태로 정의</li>
            <li>노드가 씬에 추가되면 자동 호출</li>
            <li>초기화 작업 수행</li>
            <li>한 번만 실행됨</li>
        </ul>
    </div>`,
                code: `func _ready():
    print("Node is ready!")
    var speed = 300
    print(speed)`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "Node is ready!",
                        "300"
                    ]
                }
            },
            {
                id: 13,
                title: "노드 확장",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>extends 키워드를 사용하여 Godot의 기본 노드를 확장하는 방법을 배웁니다. 이것은 모든 Godot 스크립트의 기본 구조입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>Godot의 모든 것은 노드로 이루어져 있습니다. extends를 사용하여 기본 노드(Node2D, Sprite 등)의 기능을 상속받고, 우리만의 기능을 추가할 수 있습니다. 이것이 Godot 게임 개발의 핵심입니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code># 2D 노드 확장
extends Node2D

var player_speed = 200
var player_health = 100

func _ready():
    print("2D 노드 준비 완료")
    print("속도: " + str(player_speed))

# 캐릭터 바디 확장
extends CharacterBody2D

var speed = 300
var jump_force = 500

func _ready():
    print("캐릭터 생성")
    print("이동 속도: " + str(speed))
    print("점프 힘: " + str(jump_force))

# 스프라이트 확장
extends Sprite2D

var rotation_speed = 2.0

func _ready():
    print("스프라이트 초기화")
    print("회전 속도: " + str(rotation_speed))</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>extends 노드타입</code> 형태</li>
            <li>스크립트 맨 위에 작성</li>
            <li>기본 노드의 모든 기능 상속</li>
            <li>Node2D, CharacterBody2D, Sprite2D 등 사용</li>
        </ul>
    </div>`,
                code: `extends Node2D

var speed = 200

func _ready():
    print("Speed: " + str(speed))`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "Speed: 200"
                    ]
                }
            },
            {
                id: 14,
                title: "입력 처리",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>Input 클래스를 사용하여 키보드, 마우스 등의 사용자 입력을 처리하는 방법을 배웁니다. _process 함수는 매 프레임마다 호출되어 실시간 입력을 감지합니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임은 플레이어의 입력에 반응해야 합니다. 캐릭터 이동, 점프, 공격 등 모든 플레이어 조작은 입력 처리를 통해 구현됩니다. 입력 처리 없이는 게임을 조작할 수 없습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>extends Node2D

var speed = 200

# 매 프레임 호출 (delta는 프레임 간격)
func _process(delta):
    # 방향키 입력 감지
    if Input.is_action_pressed("ui_right"):
        print("오른쪽 이동")
        # position.x += speed * delta

    if Input.is_action_pressed("ui_left"):
        print("왼쪽 이동")

    if Input.is_action_pressed("ui_up"):
        print("위로 이동")

    if Input.is_action_pressed("ui_down"):
        print("아래로 이동")

    # 스페이스 바 감지
    if Input.is_action_just_pressed("ui_select"):
        print("점프!")

# 실제 이동 구현 예시
var position = Vector2(0, 0)
func _process(delta):
    if Input.is_action_pressed("ui_right"):
        position.x += speed * delta</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>_process(delta)</code>: 매 프레임 호출</li>
            <li><code>is_action_pressed()</code>: 키가 눌려있는지</li>
            <li><code>is_action_just_pressed()</code>: 키를 막 눌렀는지</li>
            <li>delta로 프레임 독립적 이동</li>
        </ul>
    </div>`,
                code: `func _process(delta):
    if Input.is_action_pressed("ui_right"):
        print("Moving right")`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "// 입력 시: Moving right"
                    ]
                }
            },
            {
                id: 15,
                title: "시그널 기초",
                description: `
    <div class="lesson-intro">
        <h4>💡 무엇을 배우나요?</h4>
        <p>signal 키워드로 시그널(이벤트)을 정의하고 emit_signal로 발생시키는 방법을 배웁니다. 시그널은 다른 노드에게 "무언가 일어났다"고 알려주는 방법입니다.</p>
    </div>

    <div class="lesson-why">
        <h4>⭐ 왜 중요한가요?</h4>
        <p>게임의 여러 부분은 서로 통신해야 합니다. 예를 들어, 플레이어가 데미지를 받으면 UI에 체력바를 업데이트하고, 사운드를 재생해야 합니다. 시그널을 사용하면 이런 통신을 깔끔하게 구현할 수 있습니다.</p>
    </div>

    <div class="lesson-example">
        <h4>📝 간단한 예시</h4>
        <pre><code>extends Node2D

# 시그널 정의
signal health_changed
signal player_died
signal level_up

var health = 100

# 데미지 받기
func take_damage(amount):
    health -= amount
    emit_signal("health_changed", health)
    print("현재 체력: " + str(health))

    if health <= 0:
        emit_signal("player_died")
        print("플레이어 사망!")

# 레벨업
func gain_experience(exp):
    var total_exp = exp
    if total_exp >= 100:
        emit_signal("level_up")
        print("레벨업!")

func _ready():
    # 시그널 테스트
    take_damage(30)  # 체력: 70
    take_damage(50)  # 체력: 20

    gain_experience(150)  # 레벨업!</code></pre>
    </div>

    <div class="lesson-key">
        <h4>✨ 핵심 포인트</h4>
        <ul>
            <li><code>signal 이름</code>으로 시그널 정의</li>
            <li><code>emit_signal("이름", 데이터)</code>로 발생</li>
            <li>다른 노드가 시그널에 연결해 반응</li>
            <li>이벤트 기반 프로그래밍의 핵심</li>
        </ul>
    </div>`,
                code: `signal health_changed

func take_damage(amount):
    var health = 100
    health -= amount
    emit_signal("health_changed", health)
    print(health)

func _ready():
    take_damage(20)`,
                expectedOutput: {
                    type: "console",
                    commands: [
                        "$ godot --script example.gd",
                        "80"
                    ]
                }
            }
        ],
        intermediate: [],
        master: []
    }
};
