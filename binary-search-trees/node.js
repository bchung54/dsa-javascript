export default class Node {
    constructor(data, leftValue=null, rightValue=null) {
        this.data = data;
        this.left = leftValue;
        this.right = rightValue;
    }
}