const createNode = (value=null, next=null) => {
    function setNext(node) {
        this.next = node;
    };

    return ({
        value,
        next,
        setNext
    })
}
export default createNode;