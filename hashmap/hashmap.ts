class Entry<K, V> {
    key: K;
    value: V;
    next: Entry<K, V> | null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class HashMap<K, V> {
    private static readonly INITIAL_SIZE: number = 1 << 4 // i.e 16
    private static readonly MAX_CAPACITY: number = 1 << 30 // i.e 2^30
    private size: number = 0;

    private hashTable: Array<Entry<K, V> | null>;

    constructor(capacity?: number) {
        const tableSize = this.tableSizeFor(capacity || HashMap.INITIAL_SIZE);
        this.hashTable = new Array<Entry<K, V>>(tableSize);
    }

    private tableSizeFor(cap: number): number {
        let n = cap - 1;
        n |= n >>> 1;
        n |= n >>> 2;
        n |= n >>> 4;
        n |= n >>> 8;
        n |= n >>> 16;
        return (n < 0) ? 1 : (n >= HashMap.MAX_CAPACITY) ? HashMap.MAX_CAPACITY : n + 1;
    }

    put(key: K, value: V): void {
        const hashCode = this.hashCode(key) % this.hashTable.length;
        let node: Entry<K, V> | null = this.hashTable[hashCode];

        if (!node) {
            const newNode = new Entry(key, value);
            this.hashTable[hashCode] = newNode;
            this.size++;
        }
        else {
            let previousNode: Entry<K, V> | null = null;
            while (node) {
                if (node.key === key) {
                    node.value = value;
                    return;
                }
                previousNode = node;
                node = node.next;
            }
            const newNode = new Entry(key, value);
            if (previousNode) {
                previousNode.next = newNode;
                this.size++;
            }
        }

        if (this.loadFactor() > 0.75) {
            this.resize();
        }
    }

    private loadFactor(): number {
        return this.size / this.hashTable.length;
    }

    private resize(): void | Error {
        const newCap = this.hashTable.length * 2; // getting new capacity
        if (newCap > HashMap.MAX_CAPACITY) {
            return new Error("Exceedes the max hashmap size!");
        }
        const newHashTable: Array<Entry<K, V> | null> = new Array<Entry<K, V>>(newCap);

        this.hashTable.forEach((node) => {
            while (node) {
                const hashCode = this.hashCode(node.key) % newCap;
                const newNode = new Entry(node.key, node.value);
                newNode.next = newHashTable[hashCode];
                newHashTable[hashCode] = newNode;
                node = node.next;
            }
        })

        this.hashTable = newHashTable;
    }

    get(key: K): V | null {
        const hashCode = this.hashCode(key) % this.hashTable.length;

        let node: Entry<K, V> | null = this.hashTable[hashCode];

        while (node) {
            if (node.key === key) {
                return node.value;
            }
            node = node.next;
        }
        return null;
    }


    private hashCode(key: K): number {
        return typeof key === 'string' ? this.stringHashCode(key) : this.defaultHashCode(key);
    }

    private stringHashCode(key: string): number {
        let hash = 0;
        for (let i = 0; i < key.length; i++) {
            hash = (hash << 5) - hash + key.charCodeAt(i);
            hash |= 0; // Convert to 32-bit integer
        }
        return hash;
    }

    private defaultHashCode(key: K): number {
        return this.stringHashCode(String(key));
    }
}

// Example 

const map = new HashMap<number, string>();
map.put(1, "hi");
map.put(2, "my");
map.put(3, "name");
map.put(4, "is");
map.put(5, "Suresh");


const value = map.get(4);
console.log(value);
