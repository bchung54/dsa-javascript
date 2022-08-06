import createNode from './node';

const linkedList = (arr) => {
    let head = null;
    let tail = null;
    let size = 0;
    let string = '';

    if (arr.length >= 1) {
        head = createNode(arr[0]);
        tail = head;
        size = 1;
        string = `( ${arr[0]} )`;
    }
    for (let i = 1; i < arr.length; i++) {
        const newTail = createNode(arr[i]);
        tail.setNext(newTail);
        tail = newTail;
        size++;
        string = string.concat(` -> ( ${arr[i]} )`);
    }
    
    return ({
        head,
        tail,
        size,
        string,
        append: function(value) {
            const newTail = createNode(value);
            this.tail.setNext(newTail);
            this.tail = newTail;
            this.size++;
            this.string = this.string + ` -> ( ${value} )`;
        },
        prepend: function(value) {
            this.head = createNode(value, this.head);
            this.size++;
            this.string = `( ${value} ) -> `.concat(this.string);
        },
        at: function(index) {
            let counter = 0;
            let currentNode = this.head;
            while ( counter < index ) {
                currentNode = currentNode.next;
                counter++;
            }
            return currentNode;
        },
        pop: function() {
            const output = this.tail.value;
            let currentNode =this.head;
            let prevNode = null;
            while (currentNode !== this.tail) {
                prevNode = currentNode;
                currentNode = currentNode.next;
            }
            this.tail = prevNode;
            this.size--;
            this.string = this.string.split(' -> ').slice(0, -1).join(' -> ');
            return output;
        },
        contains: function(value) {
            let currentNode = this.head;
            while (currentNode !== null) {
                if (currentNode.value == value){
                    return true;
                }
                currentNode = currentNode.next;
            }
            return false;

        },
        find: function(value) {
            let index = 0;
            let currentNode = this.head;
            while (currentNode !== null) {
                if (currentNode.value == value) {
                    return index;
                }
                currentNode = currentNode.next;
                index++;
            }
            return null;
        },
        toString: function() {
            return (this.size > 0 ? this.string.concat(' -> null') : 'null');
        },
        insertAt: function(value, index) {
            if (index == 0) {
                this.prepend(value);
            } else if (index == this.size) {
                this.append(value);
            } else if (index < this.size) {
                let counter = 0;
                let currentNode = this.head;
                let prevNode = null;
                while (counter !== index) {
                    prevNode = currentNode;
                    currentNode = currentNode.next;
                    counter++;
                }
                prevNode.setNext(createNode(value, currentNode));
                this.size++;
                const stringArr = this.string.split(' -> ');
                stringArr.splice(index, 0, `( ${value} )`);
                this.string = stringArr.join(' -> ');
            }
        },
        removeAt: function(index) {
            if (index == 0) {
                this.head = this.head.next;
            }
            let counter = 0;
            let currentNode = this.head;
            let prevNode = null;
            while (counter !== index) {
                prevNode = currentNode;
                currentNode = currentNode.next;
                counter++;
            }
            prevNode.setNext(currentNode.next);
            this.size--;
            const stringArr = this.string.split(' -> ');
            stringArr.splice(index, 1);
            this.string = stringArr.join(' -> ');
        }
    })
}

export default linkedList;