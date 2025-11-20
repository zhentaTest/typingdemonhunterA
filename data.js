// Code samples database
const codeSamples = {
    typescript: {
        beginner: [
            {
                id: 'ts-b-1',
                code: `const greeting: string = "Hello";
const age: number = 25;
console.log(greeting);`
            },
            {
                id: 'ts-b-2',
                code: `function add(a: number, b: number): number {
    return a + b;
}`
            },
            {
                id: 'ts-b-3',
                code: `interface User {
    name: string;
    age: number;
}`
            },
            {
                id: 'ts-b-4',
                code: `let isActive: boolean = true;
let count: number = 0;
count++;`
            },
            {
                id: 'ts-b-5',
                code: `type Status = "active" | "inactive";
const status: Status = "active";`
            }
        ],
        intermediate: [
            {
                id: 'ts-i-1',
                code: `interface Product {
    id: number;
    name: string;
    price: number;
}

function getProduct(id: number): Product | null {
    return { id, name: "Item", price: 100 };
}`
            },
            {
                id: 'ts-i-2',
                code: `class Calculator {
    add(a: number, b: number): number {
        return a + b;
    }

    subtract(a: number, b: number): number {
        return a - b;
    }
}`
            },
            {
                id: 'ts-i-3',
                code: `const numbers: number[] = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log(doubled, sum);`
            },
            {
                id: 'ts-i-4',
                code: `type Response<T> = {
    data: T;
    error: string | null;
};

function fetchData<T>(url: string): Response<T> {
    return { data: {} as T, error: null };
}`
            },
            {
                id: 'ts-i-5',
                code: `enum Color {
    Red = "RED",
    Green = "GREEN",
    Blue = "BLUE"
}

function getColorCode(color: Color): string {
    return color;
}`
            }
        ],
        master: [
            {
                id: 'ts-m-1',
                code: `interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
}

async function fetchUser(id: number): Promise<ApiResponse<User>> {
    const response = await fetch(\`/api/users/\${id}\`);
    const data = await response.json();
    return {
        data,
        status: response.status,
        message: "Success"
    };
}`
            },
            {
                id: 'ts-m-2',
                code: `class EventEmitter<T extends Record<string, any>> {
    private listeners: Map<keyof T, Set<Function>> = new Map();

    on<K extends keyof T>(event: K, callback: (data: T[K]) => void): void {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, new Set());
        }
        this.listeners.get(event)!.add(callback);
    }

    emit<K extends keyof T>(event: K, data: T[K]): void {
        this.listeners.get(event)?.forEach(cb => cb(data));
    }
}`
            },
            {
                id: 'ts-m-3',
                code: `type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

function mergeDeep<T extends object>(
    target: T,
    source: DeepPartial<T>
): T {
    const result = { ...target };
    for (const key in source) {
        if (source[key] instanceof Object) {
            result[key] = mergeDeep(result[key], source[key]);
        } else {
            result[key] = source[key] as T[Extract<keyof T, string>];
        }
    }
    return result;
}`
            },
            {
                id: 'ts-m-4',
                code: `abstract class Repository<T extends { id: number }> {
    protected items: Map<number, T> = new Map();

    abstract validate(item: T): boolean;

    create(item: T): T {
        if (!this.validate(item)) {
            throw new Error("Invalid item");
        }
        this.items.set(item.id, item);
        return item;
    }

    findById(id: number): T | undefined {
        return this.items.get(id);
    }
}`
            },
            {
                id: 'ts-m-5',
                code: `function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function(...args: Parameters<T>) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func(...args);
        }, wait);
    };
}`
            }
        ]
    },
    javascript: {
        beginner: [
            {
                id: 'js-b-1',
                code: `const name = "Alice";
const age = 30;
console.log(name);`
            },
            {
                id: 'js-b-2',
                code: `function greet(name) {
    return "Hello, " + name;
}`
            },
            {
                id: 'js-b-3',
                code: `const numbers = [1, 2, 3, 4, 5];
const sum = numbers[0] + numbers[1];`
            },
            {
                id: 'js-b-4',
                code: `let isValid = true;
if (isValid) {
    console.log("Valid");
}`
            },
            {
                id: 'js-b-5',
                code: `const user = {
    name: "Bob",
    age: 25
};`
            }
        ],
        intermediate: [
            {
                id: 'js-i-1',
                code: `function filterEven(numbers) {
    return numbers.filter(num => num % 2 === 0);
}

const result = filterEven([1, 2, 3, 4, 5, 6]);
console.log(result);`
            },
            {
                id: 'js-i-2',
                code: `class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    introduce() {
        return \`I'm \${this.name}, \${this.age} years old\`;
    }
}`
            },
            {
                id: 'js-i-3',
                code: `const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 30 }
];

const names = users.map(u => u.name);
const adults = users.filter(u => u.age >= 18);`
            },
            {
                id: 'js-i-4',
                code: `function asyncOperation(callback) {
    setTimeout(() => {
        callback(null, "Success");
    }, 1000);
}

asyncOperation((err, data) => {
    console.log(data);
});`
            },
            {
                id: 'js-i-5',
                code: `const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b
};

const result = calculator.add(5, 3);`
            }
        ],
        master: [
            {
                id: 'js-m-1',
                code: `async function fetchUsers() {
    try {
        const response = await fetch('/api/users');
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }
}

fetchUsers().then(users => console.log(users));`
            },
            {
                id: 'js-m-2',
                code: `class EventBus {
    constructor() {
        this.events = new Map();
    }

    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(callback);
    }

    off(event, callback) {
        this.events.get(event)?.delete(callback);
    }

    emit(event, data) {
        this.events.get(event)?.forEach(cb => cb(data));
    }
}`
            },
            {
                id: 'js-m-3',
                code: `function createStore(initialState) {
    let state = initialState;
    const listeners = new Set();

    return {
        getState: () => state,
        setState: (newState) => {
            state = { ...state, ...newState };
            listeners.forEach(listener => listener(state));
        },
        subscribe: (listener) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        }
    };
}`
            },
            {
                id: 'js-m-4',
                code: `const compose = (...fns) => x =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const pipe = (...fns) => x =>
    fns.reduce((acc, fn) => fn(acc), x);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const result = pipe(addOne, double, square)(3);`
            },
            {
                id: 'js-m-5',
                code: `function memoize(fn) {
    const cache = new Map();

    return function(...args) {
        const key = JSON.stringify(args);

        if (cache.has(key)) {
            return cache.get(key);
        }

        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}`
            }
        ]
    },
    godotscript: {
        beginner: [
            {
                id: 'gs-b-1',
                code: `extends Node

var speed = 100
var health = 10`
            },
            {
                id: 'gs-b-2',
                code: `func _ready():
    print("Hello, Godot!")
    position = Vector2(0, 0)`
            },
            {
                id: 'gs-b-3',
                code: `var player_name = "Hero"
var score = 0
score += 10`
            },
            {
                id: 'gs-b-4',
                code: `func add(a, b):
    return a + b

var result = add(5, 3)`
            },
            {
                id: 'gs-b-5',
                code: `const MAX_HEALTH = 100
var current_health = MAX_HEALTH`
            }
        ],
        intermediate: [
            {
                id: 'gs-i-1',
                code: `extends KinematicBody2D

var velocity = Vector2.ZERO
const SPEED = 200

func _physics_process(delta):
    velocity.x = Input.get_axis("left", "right") * SPEED
    move_and_slide(velocity)`
            },
            {
                id: 'gs-i-2',
                code: `class_name Player extends Node2D

var health = 100
var max_health = 100

func take_damage(amount):
    health -= amount
    if health <= 0:
        die()

func die():
    queue_free()`
            },
            {
                id: 'gs-i-3',
                code: `signal player_died
signal health_changed(new_health)

func _ready():
    connect("player_died", self, "_on_player_died")

func emit_health_change():
    emit_signal("health_changed", health)`
            },
            {
                id: 'gs-i-4',
                code: `var inventory = []

func add_item(item):
    inventory.append(item)

func remove_item(item):
    var index = inventory.find(item)
    if index != -1:
        inventory.remove(index)`
            },
            {
                id: 'gs-i-5',
                code: `enum State { IDLE, RUNNING, JUMPING, FALLING }

var current_state = State.IDLE

func change_state(new_state):
    current_state = new_state`
            }
        ],
        master: [
            {
                id: 'gs-m-1',
                code: `extends CharacterBody2D

const SPEED = 300.0
const JUMP_VELOCITY = -400.0
var gravity = ProjectSettings.get_setting("physics/2d/default_gravity")

func _physics_process(delta):
    if not is_on_floor():
        velocity.y += gravity * delta

    if Input.is_action_just_pressed("jump") and is_on_floor():
        velocity.y = JUMP_VELOCITY

    var direction = Input.get_axis("move_left", "move_right")
    velocity.x = direction * SPEED

    move_and_slide()`
            },
            {
                id: 'gs-m-2',
                code: `class_name StateMachine extends Node

var states = {}
var current_state = null

func add_state(state_name, state_node):
    states[state_name] = state_node
    state_node.state_machine = self

func change_state(state_name):
    if current_state:
        current_state.exit()

    current_state = states.get(state_name)
    if current_state:
        current_state.enter()

func _process(delta):
    if current_state:
        current_state.update(delta)`
            },
            {
                id: 'gs-m-3',
                code: `extends Node

signal item_collected(item)
signal inventory_full

const MAX_ITEMS = 20
var items = []

func add_item(item):
    if items.size() >= MAX_ITEMS:
        emit_signal("inventory_full")
        return false

    items.append(item)
    emit_signal("item_collected", item)
    return true

func get_items_by_type(type):
    return items.filter(func(item): return item.type == type)`
            },
            {
                id: 'gs-m-4',
                code: `class_name SaveManager extends Node

const SAVE_PATH = "user://savegame.json"

func save_game(data: Dictionary) -> void:
    var file = FileAccess.open(SAVE_PATH, FileAccess.WRITE)
    if file:
        file.store_string(JSON.stringify(data))
        file.close()

func load_game() -> Dictionary:
    if not FileAccess.file_exists(SAVE_PATH):
        return {}

    var file = FileAccess.open(SAVE_PATH, FileAccess.READ)
    var content = file.get_as_text()
    file.close()
    return JSON.parse_string(content)`
            },
            {
                id: 'gs-m-5',
                code: `extends Node2D

var tween: Tween

func _ready():
    tween = create_tween()
    animate_movement()

func animate_movement():
    tween.tween_property(self, "position", Vector2(500, 300), 2.0)
    tween.set_trans(Tween.TRANS_ELASTIC)
    tween.set_ease(Tween.EASE_OUT)
    tween.tween_callback(on_animation_complete)

func on_animation_complete():
    print("Animation finished!")`
            }
        ]
    }
};
