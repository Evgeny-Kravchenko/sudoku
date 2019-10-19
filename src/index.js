module.exports = function solveSudoku(matrix) {
  //Функция для поиска координат пустых ячеек
  function saveEmptyPositions(matrix) {
    //Хранилище координат пустых ячеек
    let emptyPositions = [];

    /*Проход по всем ячейкам массива и если в ячейке ноль,
    то записываем координаты в emptyPositions*/
    for(let i = 0; i < matrix.length; i++) {
      for(let j = 0; j < matrix[i].length; j++) {
        // If a zero is found, so that position
        if(matrix[i][j] === 0) {
          emptyPositions.push([i, j]);
        }
      }
    }

     return emptyPositions;
  }

  //Функция для проверки value в row на конфликт
  function checkRow(matrix, row, value) {
    for(let i = 0; i < matrix[row].length; i++) {
      // если такое значение есть, return false
      if(matrix[row][i] === value) {
        return false;
      }
    }
    // Если такого значения нет, return true
    return true;
  };
   
   //Функция для проверки value в column на конфликт
   function checkColumn(board, column, value) {
    for(let i = 0; i < board.length; i++) {
      // если такое значение есть, return false
      if(board[i][column] === value) {
        return false;
      }
    }
    // Если такого значения нет, return true
    return true;
  };

  //Функция для проверки value в своём квадрате
   function check3x3Square(matrix, column, row, value) {
    let edgeColumn = 0;
    let edgeRow = 0;
    let squareSize = 3;

    // Самый левый column для квадрата
    while(column >= edgeColumn + squareSize) {
      edgeColumn += squareSize;
    }

    // Самая верхняя row для строки
    while(row >= edgeRow + squareSize) {
      edgeRow += squareSize;
    }

    /*Итерируем каждую ячейку в квадрате и если value совпадает 
    со значением какой-либо из 9 ячеек, return false*/
    for(let i = edgeRow; i < edgeRow + squareSize; i++) {
      for(let j = edgeColumn; j < edgeColumn + squareSize; j++) {
        if(matrix[i][j] === value) {        
          return false;
        }
      }
    }
    // Если такого значения в квадрате нет, то return true
    return true;
  }

  //Собираем все три функции проверки value на конфликт в одну функцию
  function checkValue(board, column, row, value) {
    /*Если итог проверки всех возможных конфликтов
     true (нет совпадений), то вернуть true, в противном
     случае такого число уже встречается в одном из 3-х
     вариантов и поэтому возвращаем false*/
    if(checkRow(board, row, value) &&
      checkColumn(board, column, value) &&
      check3x3Square(board, column, row, value)) {
      return true;
    } else {
      return false;
    }
  };

  /*Функция решения: подставляем последовательно числа от 1 до 9
  в каждую пустую позицию, пока не будет найдено дейсьвительное число.
  Если число не найдено, то возвращаемся на позицию назад и ищем новое
  действительное число. Таким образом проходим по всем пустым позициям поля,
  пока всё поле не будет заполнено*/
  function solvePuzzle(matrix, emptyPositions) {
    // Крайнее возможное значение
    let maxValue = 9;
    // Переменная для прохода по всей строке и всему столбцу
    let i;
    // Переменная для хранения колл-ва пустых ячеек
    let row;
    // Переменная для хранения столбца относительно пустой ячейки
    let column;
    // Переменная для подстановки в пустую ячейку значений от 0 до 9
    let value;

    let found;
    //Проходим циклом по массиву пустых ячеек
    for(i = 0; i < emptyPositions.length;) {
      //Получаем строку пустой позиции
      row = emptyPositions[i][0];
      //Получаем столбец пустой позиции
      column = emptyPositions[i][1];
      // Записываем в value следующее значение за пустой ячейкой
      value = matrix[row][column] + 1;
      // Проверка было ли найдено правильное value
      found = false;
      /* Продолжаем пробовать новые значения, пока не достигнем maxValue (9)
      или было найдено действительное знаяение*/
      while(!found && value <= maxValue) {
        /* Если действительное value найдено (проверка функцией checkValue),
           то отмечем это как found = true.
           Ставим на место пустой ячейки действительное значение
           и переходим на следующую пустую позицию*/
        if(checkValue(matrix, column, row, value)) {
          found = true;
          matrix[row][column] = value;
          i++;
        } 
        // Иначе пробуем новое значение
        else {
          value++;
        }
      }
      /*Если действительное значение не было найдено и значение
      достигло maxValue, то возвращаемся на предыдущую пустую ячейку,
      оставив на данной позиции 0*/
      if(!found) {
        matrix[row][column] = 0;
        i--;
      }
    }
    return matrix;
  }

  let emptyPositions = saveEmptyPositions(matrix);
  return solvePuzzle(matrix, emptyPositions);
}