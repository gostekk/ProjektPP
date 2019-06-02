const operators = {
  '+': 0,
  '*': 0,
  '-': 1,
  '/': 2,
  '%': 3,
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
  let sign;

  const str = equat.replace(/\s+/g, '').split('');

  for (let i=0, l=str.length; i<l; ++i) {
    if (str[i] === '(') {
      stack.push(str[i]);
      sign = undefined;
    } else if (str[i] === ')') {
      let operator;
      sign = undefined;
      while ((operator = stack.pop()) && operator !== '(') {
        output.push(operator + ' ');
      }
    } else if (isOperator(str[i])) {
      stack.push(str[i]);
      sign = str[i];
    } else {
      output.push(str[i] + ' ');
      if (sign) {
        output.push(stack.pop() + ' ');
        sign = undefined;
      }
    }

    operations.push({
      id: i,
      expression: str[i],
      stack: stack.map((el) => el),
      postfix: output.map((el) => el),
    });
  }

  while(stack.length) {
    output.push(stack.pop());
  }

  console.log(output.join(''));
  // console.log(operations);
}

function InToPre(equat) {
  let operations = [];
  let output = [];
  let stack = [];

  const str = equat.replace(/\s+/g, '').split('').reverse();

  for (let i=0, l=str.length; i<l; ++i) {
    if (str[i] === ')') {
      stack.push(str[i]);
    } else if (str[i] === '(') {
      let operator;
      while ((operator = stack.pop()) && operator !== ')') {
        output.push(operator + ' ');
      }
    } else if (isOperator(str[i])) {
      stack.push(str[i]);
    } else {
      output.push(str[i] + ' ');
    }
    operations.push({
      id: i,
      expression: str[i],
      stack: stack.map((el) => el),
      prefix: output.map((el) => el).reverse(),
    });
  }

  while(stack.length) {
    output.push(stack.pop()+ ' ');
  }
  
  console.log(output.reverse().join(''));
  // console.log(operations);
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
  console.log(stack[0]);
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
  console.log(stack[0]);
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
  console.log(stack[0]);
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

  // console.log(operations);
  console.log(stack[0]);
}

export {
  PostToIn,
  PostToPre,
  InToPost,
  InToPre,
  PreToIn,
  PreToPost,
  isOperator
};