class Gameboard {
    constructor() {
        this.rows = 8;
        this.cols = 8;
        this.pieces = [];
    }
    movePiece = (pieceName, oldPosition, newPosition) => {
        if (newPosition.some(pos => pos > 7 || pos < 0)) {
            throw new Error('Out of range');
        }
        const pieceToMove = this.pieces.find((piece) => {
            return piece.name == pieceName && piece.position == oldPosition
        });

        pieceToMove.position = newPosition;
    }
};

class Knight {
    constructor() {
        this.name = 'knight';
        this.notation = 'N';
        this.position = '';
    }
    move = () => {
        
    }
}