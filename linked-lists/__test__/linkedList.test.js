import linkedList from '../linkedList';
import node from '../node';

describe('Assignment', () => {
    let testList;

    beforeEach(() => {
        testList = linkedList([2, 3, 7]);
    });

    it('should add new value to the end of the list', () => {
        testList.append('foo');
        expect(testList.size).toBe(4);
        expect(testList.toString()).toEqual(linkedList([2, 3, 7, 'foo']).toString());
    });

    it('should add new value to the start of the list', () => {
        testList.prepend('foo');
        expect(testList.size).toBe(4);
        expect(testList.toString()).toEqual(linkedList(['foo', 2, 3, 7]).toString());
    });

    it('should return 3 for a linked list of 3 values', () => {
        expect(testList.size).toBe(3);
    });

    it('should return node(2) as head of linked list', () => {
        expect(testList.head.value).toEqual(node(2).value);
    });

    it('should return node(7) as tail of linked list', () => {
        expect(testList.tail.value).toEqual(node(7).value);
    });

    it('should return node(3) for node at index of 1', () => {
        expect(testList.at(1).value).toBe(node(3).value);
    });

    it('should return 7 as last element from the list', () => {
        expect(testList.pop()).toBe(7);
    });

    it('should return true for contains(7) & false for contains(0)', () => {
        expect(testList.contains(7)).toBe(true);
        expect(testList.contains(0)).toBe(false);
    });

    it('should return 0 for find(2) & null for find(0)', () => {
        expect(testList.find(2)).toBe(0);
        expect(testList.find(0)).toBeNull();
    });

    it('should return ( 2 ) -> ( 3 ) -> ( 7 ) -> null', () => {
        expect(testList.toString()).toBe('( 2 ) -> ( 3 ) -> ( 7 ) -> null');
    });

    it('should return \'null\'', () => {
        const nullList = linkedList([]);
        expect(nullList.toString()).toBe('null');
    });
});

describe('Extra Credit', () => {
    let testList;

    beforeEach(() => {
        testList = linkedList([1, 2, 3, 7]);
    });

    it('should insert \'bar\' at index 1', () => {
        testList.insertAt('bar', 1);
        expect(testList.toString()).toBe(linkedList([1, 'bar', 2, 3, 7]).toString());
    });

    it("should insert 'bar' at the end", () => {
        testList.insertAt('bar', 4);
        expect(testList.toString()).toBe(linkedList([1, 2, 3, 7, 'bar']).toString());
    });

    it("should remove node at index 2", () => {
        testList.removeAt(2);
        expect(testList.toString()).toBe(linkedList([1, 2, 7]).toString());
    });
});