const operators = {
  '+': 1,
  '*': 2,
  '-': 1,
  '/': 2,
  '%': 3,
  '^': 3,
}

function isOperator (token) {
  return Object.keys(operators).indexOf(token) !== -1
}

////////////////////////////////////////
/////////////// IN /////////////////////
////////////////////////////////////////
function InToPost(equat) {
  let operations = [];
  let output = [];
  let stack = [];

  const str = equat.replace(/\s+/g, '').split('');

  for (let i=0, l=str.length; i<l; ++i) {
    if (str[i] === ' ') {
        continue;
    } else if (str[i] === '(') {
      stack.push(str[i]);
    } else if (str[i] === ')') {
      let operator;
      while ((operator = stack.pop()) && operator !== '(') {
        output.push(operator + ' ');
      }
    } else if (!isOperator(str[i])) {
      output.push(str[i] + ' ');
    } else if (isOperator(str[i])) {
      let stackSize = stack.length;
      while (stackSize > 0 && operators[stack[stackSize-1]] > operators[str[i]]) {
        output.push(stack.pop() + ' ');
        --stackSize;
      }
      stack.push(str[i]);
    }

    operations.push({
      id: i,
      expression: str[i],
      stack: stack.map((el) => el).join(''),
      output: output.map((el) => el).join(''),
    });
  }

  while(stack.length) {
    output.push(stack.pop());
  }

  // console.log(operations);
  return { value: output.join('').trim(), operations };
}

function InToPre(equat) {
  let operations = [];
  let output = [];
  let stack = [];

  const str = equat.replace(/\s+/g, '').split('').reverse();

  for (let i=0, l=str.length; i<l; ++i) {
    if (str[i] === ' ') {
      continue;
    } else if (str[i] === ')') {
      stack.push(str[i]);
    } else if (str[i] === '(') {
      let operator;
      while ((operator = stack.pop()) && operator !== ')') {
        output.push(operator + ' ');
      }
    } else if (!isOperator(str[i])) {
      output.push(str[i] + ' ');
    } else if (isOperator(str[i])) {
      let stackSize = stack.length;
      while (stackSize > 0 && operators[stack[stackSize-1]] > operators[str[i]]) {
        output.push(stack.pop() + ' ');
        --stackSize;
      }
      stack.push(str[i]);
    }

    operations.push({
      id: i,
      expression: str[i],
      stack: stack.map((el) => el).join(''),
      output: output.map((el) => el).reverse().join(''),
    });
  }

  while(stack.length) {
    output.push(stack.pop()+ ' ');
  }
  
  // console.log(operations);
  return { value: output.reverse().join(''), operations };
}
////////////////////////////////////////
/////////////// POST ///////////////////
////////////////////////////////////////

// Post to In
function PostToIn(equat) {
  let operations = [];
  let stack = [];
  
  const str = equat.split(" ");

  str.forEach( (el, index) => {
    if (!isOperator(el)) {
      stack.push(el);
    } else {
      let op1 = stack.pop();
      let op2 = stack.pop();
      stack.push('(' + op2 + el + op1 + ')');
    }
    operations.push({
      id: index,
      expression: el,
      stack: stack.map(el => el),
    });
  });

  // console.log(operations);
  return { value: stack[0], operations };
}

// Post to Pre
function PostToPre(equat) {
  let operations = [];
  let stack = [];
  
  const str = equat.split(" ");

  str.forEach( (el, index) => {
    if (isOperator(el)) {
      let op1 = stack.pop();
      let op2 = stack.pop();
      stack.push(el+ ' ' + op2 + ' ' + op1);
    } else {
      stack.push(el);
    }
    operations.push({
      id: index,
      expression: el,
      stack: stack.map(el => el),
    });
  });

  // console.log(operations);
  return { value: stack[0], operations };
}

////////////////////////////////////////
/////////////// PRE ////////////////////
////////////////////////////////////////

// Pre to Post
function PreToPost(equat) {
  let operations = [];
  let stack = [];
  
  const str = equat.trim().split(" ").reverse();

  str.forEach( (el, index) => {
    if (isOperator(el)) {
      let op1 = stack.pop();
      let op2 = stack.pop();
      stack.push(op1+ ' ' + op2 + ' ' + el);
    } else {
      stack.push(el);
    }
    operations.push({
      id: index,
      expression: el,
      stack: stack.map(el => el),
    });
  });

  // console.log(operations);
  return {value: stack[0], operations };
}

// Post to In
function PreToIn(equat) {
  let operations = [];
  let stack = [];
  
  const str = equat.trim().split(" ").reverse();

  str.forEach( (el, index) => {
    if (!isOperator(el)) {
      stack.push(el);
    } else {
      let op1 = stack.pop();
      let op2 = stack.pop();
      stack.push('(' + op1 + el + op2 + ')');
    }
    operations.push({
      id: index,
      expression: el,
      stack: stack.map(el => el),
    });
  });

  return {value: stack[0], operations };
}

const op = [
  { 
    id: 0,
    name: 'Postfix',
    operation: 'InToPost',
  },
  { 
    id: 1,
    name: 'Prefix',
    operation: 'InToPre',
  },
  { 
    id: 2,
    name: 'Infix',
    operation: 'PostToIn',
  },
  { 
    id: 3,
    name: 'Prefix',
    operation: 'PostToPre',
  },
  { 
    id: 4,
    name: 'Postfix',
    operation: 'PreToPost',
  },
  { 
    id: 5,
    name: 'Infix',
    operation: 'PreToIn',
  },
];

export {
  PostToIn,
  PostToPre,
  InToPost,
  InToPre,
  PreToIn,
  PreToPost,
  isOperator,
  op
};