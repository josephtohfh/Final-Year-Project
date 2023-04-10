/* -- 1. Generate random equation of 3-5 inputs -- */
function generateCMOSEquation() {
  let inputs = ["A", "B", "C", "D", "E"];
  let numInputs = Math.floor(Math.random() * 3 + 3);
  let openBracket = 0; // flag for open bracket added
  let equation = ""; // start building the equation
  let inputInv = 0, inputInv2 = 0;
  let inverter = 0;
  if (Math.random() < 0.5) { // add open bracket with probability of 0.5
    equation += "(";
    openBracket++; // set flag
  }

  // build equation of 3 inputs
  if (numInputs == 3) {
    for (let i = 0; i < numInputs; i++) {
      equation += inputs[i]; // add input
      let operator = (Math.random() < 0.5) ? "+" : "*";

      if (i < numInputs - 1) { // randomly add operator after input except for last input
        equation += operator;
        if (operator == "*" && openBracket == 0 && Math.random() < 0.5) { // add open bracket with probability of 0.5 
          equation += "(";
          openBracket++; // set flag
        }
      }
    }
    // add close brackets for the deserved cases
    if (openBracket == 1) {
      if (equation[0] == "(") {
        equation = equation.replace("(", "");
      } else if (equation[4] == "+") { // add close bracket for case A*(B+C
        equation += ")";
      } else {
        equation = equation.replace("(", "");
      }
    }
  }

  // build equation with 4 inputs
  if (numInputs == 4) {
    for (let i = 0; i < numInputs; i++) {
      equation += inputs[i]; // add input
      let operator = (Math.random() < 0.5) ? "+" : "*";

      if (i < numInputs - 1) { // randomly add operator after input except for last input
        equation += operator;
        if (operator == "*") {
          if (openBracket == 0 && i != numInputs - 2 && Math.random() < 0.5) { // add open bracket with probability of 0.5 
            equation += "(";
            openBracket++; // set flag
          }
        }
      }
    }
    // add close brackets for deserved cases
    if (openBracket == 1) {
      if (equation[0] == "(") { // add close bracket for case (A?B?C?D
        if (equation[2] == "*" && equation[4] == "+" && equation[6] == "*") {
          equation = equation.slice(0, 6) + ")" + equation.slice(6); // (A*B+C)*D 
        }
        else if (equation[2] == "+" && equation[4] == "*" && equation[6] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 4) + ")" + equation.slice(4); // (A+B)*C*D
          } else {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // (A+B*C)*D
          }
        }
        else if (equation[2] == "+" && equation[4] == "*" && equation[6] == "+") {
          equation = equation.slice(0, 4) + ")" + equation.slice(4); // (A+B)*C+D
        }
        else if (equation[2] == "+" && equation[4] == "+" && equation[6] == "*") {
          equation = equation.slice(0, 6) + ")" + equation.slice(6); // (A+B+C)*D
        }
        else {
          equation = equation.replace("(", "");
        }
      } else if (equation[2] == "(") { // add close bracket for case A*(B?C?D
        if (equation[4] == "*" && equation[6] == "+") {
          equation += ")"; // A*(B*C+D)
        }
        else if (equation[4] == "+" && equation[6] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // A*(B+C)*D
          } else {
            equation += ")"; // A*(B+C*D)
          }
        }
        else if (equation[4] == "+" && equation[6] == "+") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // A*(B+C)+D
          } else {
            equation += ")"; // A*(B+C+D)
          }
        }
        else {
          equation = equation.replace("(", "");
        }
      } else if (equation[4] == "(") { // add close bracket for case A?B*(C?D
        if (equation[6] == "+") {
          equation += ")"; // A?B*(C+D)
        }
        else {
          equation = equation.replace("(", "");
        }
      }
    }
  }

  // build equation with 5 inputs
  if (numInputs == 5) {
    for (let i = 0; i < numInputs; i++) {
      equation += inputs[i]; // add input
      let operator = (Math.random() < 0.5) ? "+" : "*";

      if (i < numInputs - 1) { // randomly add operator after input except for last input
        equation += operator;
        if (operator == "*") {
          if (openBracket == 0 && i != numInputs - 2 && Math.random() < 0.5) { // add open bracket with probability of 0.5 
            equation += "(";
            openBracket++; // set flag
          }
        }
      }
    }
    // add close brackets for deserved cases
    if (openBracket == 1) {
      if (equation[0] == "(") { // add close bracket for case (A?B?C?D?E
        if (equation[2] == "*" && equation[4] == "*" && equation[6] == "+" && equation[8] == "*") {
          equation = equation.slice(0, 8) + ")" + equation.slice(8); // (A*B*C+D)*E 
        }
        else if (equation[2] == "*" && equation[4] == "+" && equation[6] == "*" && equation[8] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // (A*B+C)*D*E
          } else {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // (A*B+C*D)*E
          }
        }
        else if (equation[2] == "*" && equation[4] == "+" && equation[6] == "*" && equation[8] == "+") {
          equation = equation.slice(0, 6) + ")" + equation.slice(6); // (A*B+C)*D+E 
        }
        else if (equation[2] == "*" && equation[4] == "+" && equation[6] == "+" && equation[8] == "*") {
          equation = equation.slice(0, 8) + ")" + equation.slice(8); // (A*B+C+D)*E 
        }
        else if (equation[2] == "+" && equation[4] == "*" && equation[6] == "*" && equation[8] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 4) + ")" + equation.slice(4); // (A+B)*C*D*E
          } else if (Math.random() < 0.5) {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // (A+B*C)*D*E
          } else {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // (A+B*C*D)*E
          }
        }
        else if (equation[2] == "+" && equation[4] == "*" && equation[6] == "*" && equation[8] == "+") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 4) + ")" + equation.slice(4); // (A+B)*C*D+E
          } else {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // (A+B*C)*D+E
          }
        }
        else if (equation[2] == "+" && equation[4] == "*" && equation[6] == "+" && equation[8] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 4) + ")" + equation.slice(4); // (A+B)*C+D*E
          } else {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // (A+B*C+D)*E
          }
        }
        else if (equation[2] == "+" && equation[4] == "*" && equation[6] == "+" && equation[8] == "+") {
          equation = equation.slice(0, 4) + ")" + equation.slice(4); // (A+B)*C+D+E
        }
        else if (equation[2] == "+" && equation[4] == "+" && equation[6] == "*" && equation[8] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // (A+B+C)*D*E
          } else {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // (A+B+C*D)*E
          }
        }
        else if (equation[2] == "+" && equation[4] == "+" && equation[6] == "*" && equation[8] == "+") {
          equation = equation.slice(0, 6) + ")" + equation.slice(6); // (A+B+C)*D+E
        }
        else if (equation[2] == "+" && equation[4] == "+" && equation[6] == "+" && equation[8] == "*") {
          equation = equation.slice(0, 8) + ")" + equation.slice(8); // (A+B+C+D)*E
        }
        else {
          equation = equation.replace("(", "");
        }
      } else if (equation[2] == "(") { // add close bracket for case A?(B?C?D?E
        if (equation[4] == "*" && equation[6] == "+" && equation[8] == "+") {
          equation += ")"; // A*(B*C*D+E)
        }
        else if (equation[4] == "*" && equation[6] == "+" && equation[8] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // A*(B*C+D)*E
          } else {
            equation += ")"; // A*(B*C+D*E)
          }
        }
        else if (equation[4] == "*" && equation[6] == "+" && equation[8] == "+") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // A*(B*C+D)+E
          } else {
            equation += ")"; // A*(B*C+D+E)
          }
        }
        else if (equation[4] == "+" && equation[6] == "*" && equation[8] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // A*(B+C)*D*E
          } else if (Math.random() < 0.5) {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // A*(B+C*D)*E
          } else {
            equation += ")"; // A*(B+C*D*E)
          }
        }
        else if (equation[4] == "+" && equation[6] == "*" && equation[8] == "+") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // A*(B+C)*D+E
          } else if (Math.random() < 0.5) {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // A*(B+C*D)+E
          } else {
            equation += ")"; // A*(B+C*D+E)
          }
        }
        else if (equation[4] == "+" && equation[6] == "+" && equation[8] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // A*(B+C)+D*E
          } else if (Math.random() < 0.5) {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // A*(B+C+D)*E
          } else {
            equation += ")"; // A*(B+C+D*E)
          }
        }
        else if (equation[4] == "+" && equation[6] == "+" && equation[8] == "+") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 6) + ")" + equation.slice(6); // A*(B+C)+D+E
          } else if (Math.random() < 0.5) {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // A*(B+C+D)+E
          } else {
            equation += ")"; // A*(B+C+D+E)
          }
        }
        else {
          equation = equation.replace("(", "");
        }
      } else if (equation[4] == "(") { // add close bracket for case A?B?(C?D?E 
        if (equation[6] == "+" && equation[8] == "+") {
          equation += ")"; // A?B*(C*D+E)
        }
        else if (equation[6] == "+" && equation[8] == "*") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // A?B*(C+D)*E
          } else {
            equation += ")";  // A?B*(C+D*E)
          }
        }
        else if (equation[6] == "+" && equation[8] == "+") {
          if (Math.random() < 0.5) {
            equation = equation.slice(0, 8) + ")" + equation.slice(8); // A?B*(C+D)+E
          } else {
            equation += ")";  // A?B*(C+D+E)
          }
        }
        else {
          equation = equation.replace("(", "");
        }
      } else if (equation[6] == "(") { // add close bracket for case A?B?C?(D?E 
        if (equation[8] == "+") {
          equation += ")"; // A?B*(C*D+E)
        }
        else {
          equation = equation.replace("(", "");
        }
      }
    }

  }

  // some probability of producing some special & +(+)* cases
  special = ["(A+B)*(C+D)", "(A+B)*(C+D+E)", "(A+B+C)*(D+E)", "(A+B)*(C+D)+E", "(A+B)*(C+D)*E", "A+(B+C)*(D+E)",
    "A*(B+C)*(D+E)", "(A+B)*(C*D+E)", "(A+B)*(C+D*E)", "(A*B+C)*(D+E)",
    "A+(B+C)*D", "A+(B+C+D)*E", "A+B+(C+D)*E", "A+(B+C*D)*E", "A+(B*C+D)*E", "A*B+(C+D)*E"];
  if (Math.random() < 0.05) {
    equation = special[Math.floor(Math.random() * 16)];
  }

  // add inversion to input with probability of 0.5
  if (Math.random() < 0.5) {
    inputInv = inputs[Math.floor(Math.random() * numInputs)];
    equation = equation.replace(inputInv, inputInv + "'");
    // add second inversion to input with probability of 0.5
    if (Math.random() < 0.5) {
      inputInv2 = inputs[Math.floor(Math.random() * numInputs)];
      if (inputInv2 != inputInv) {
        equation = equation.replace(inputInv2, inputInv2 + "'");
      } else {
        inputInv2 = 0;
      }
    }
  }

  // add inversion to the entire logic function with probability of 0.5
  if (Math.random() < 0.5) {
    inverter = 1;
    equation = "(" + equation + ")'";
  }

  return { equation: equation, inputInv: inputInv, inputInv2: inputInv2, inverter: inverter };
}

/* -- 2. Convert equation from infix to postfix -- */
function infixToPostfix(infix) {
  let stack = [];
  let postfix = '';
  let prec = {};
  prec['*'] = 3;
  prec['+'] = 2;
  prec['('] = 1;

  for (let i = 0; i < infix.length; i++) {
    let token = infix[i];
    if (token === 'A' || token === 'B' || token === 'C' || token === 'D' || token === 'E') {
      postfix += token;
    } else if (token === '(') {
      stack.push(token);
    } else if (token === ')') {
      while (stack[stack.length - 1] !== '(') {
        postfix += stack.pop();
      }
      stack.pop();
    } else {
      while (stack.length > 0 && prec[stack[stack.length - 1]] >= prec[token]) {
        postfix += stack.pop();
      }
      stack.push(token);
    }
  }

  while (stack.length > 0) {
    postfix += stack.pop();
  }

  // Fix equation for unnecessary user bracket placements :( AND Re adjustments for 2 set of parenetheses
  if (postfix == "AB*CD++") { // case A*B+(C+D)
    postfix = "AB*C+D+";
  }
  if (postfix == "AB*C+DE++" || postfix == "AB*CD++E+" || postfix == "AB*CD+E++") { // case A*B+C+(D+E), A*B+(C+D)+E, A*B+(C+D+E)
    postfix = "AB*C+D+E+";
  }
  if (postfix == "ABC*+DE++" || postfix == "ABC*DE+++") { // case A+B*C+(D+E)
    postfix = "ABC*+D+E+";
  }
  if (postfix == "AB*C*DE++" || postfix == "ABC**DE++") { // case A*B*C+(D+E), A*(B*C)+(D+E)
    postfix = "AB*C*D+E+";
  }
  if (postfix == "AB*CDE*++") { // case A*B+(C+D*E) 
    postfix = "AB*C+DE*+";
  }
  if (postfix == "ABC**DE*+") { // case A*(B*C)+D*E
    postfix = "AB*C*DE*+";
  }
  if (postfix == "AB*CDE**+") { // case A*B+C*(D*E)
    postfix = "AB*CD*E*+";
  }
  if (postfix == "ABC*DE**+") { // case A+B*C*(D*E)
    postfix = "ABC*D*E*+";
  }
  if (postfix == "AB+CDE**+") { // case A+B+C*(D*E)
    postfix = "AB+CD*E*+";
  }
  if (postfix == "AB+CDE*++" || postfix == "ABC+DE*++") { // case A+B+(C+D*E), A+(B+C+D*E)
    postfix = "AB+C+DE*+";
  }
  if (postfix == "AB*CD*E++") { // case A*B+(C*D+E) 
    postfix = "AB*CD*+E+";
  }
  if (postfix == "AB*CD**E+") { // case A*B*(C*D)+E
    postfix = "AB*C*D*E+";
  }
  if (postfix == "AB*CDE+**" || postfix == "ABC*DE+**" || postfix == "ABC**DE+*") { // case A*B*(C*(D+E)), A*(B*C*(D+E)), A*(B*C)*(D+E)
    postfix = "AB*C*DE+*";
  }
  if (postfix == "AB*C+DE**") { // case (A*B+C)*(D*E)
    postfix = "AB*C+D*E*";
  }
  if (postfix == "ABC+*DE++") { // case A*(B+C)+(D+E)
    postfix = "ABC+*D+E+";
  }
  if (postfix == "AB+CD*E**" || postfix == "AB+C*DE**" || postfix == "AB+CD**E*") { // case (A+B)*(C*D*E), (A+B)*C*(D*E), (A+B)*(C*D)*E
    postfix = "AB+C*D*E*";
  }
  if (postfix == "ABC*+DE**") { // case (A+B*C)*(D*E)
    postfix = "ABC*+D*E*";
  }
  if (postfix == "AB+CD**") { // case (A+B)*(C*D)
    postfix = "AB+C*D*";
  }
  if (postfix == "AB+CD**E+") { // case (A+B)*(C*D)+E 
    postfix = "AB+C*D*E+";
  }
  if (postfix == "AB+C*DE++") { // case (A+B)*C+(D+E)
    postfix = "AB+C*D+E+";
  }
  if (postfix == "AB+C+DE**" || postfix == "ABC++DE**") { // case (A+B+C)*(D*E), (A+(B+C))*(D*E)
    postfix = "AB+C+D*E*";
  }
  if (postfix == "ABC+DE**+") { // case A+(B+C)*(D*E) 
    postfix = "ABC+D*E*+";
  }
  if (postfix == "AB+CDE++*") { // case (A+B)*(C+(D+E))
    postfix = "AB+CD+E+*"
  }
  if (postfix == "ABC++DE+*") { // case (A+(B+C))*(D+E)
    postfix = "AB+C+DE+*";
  }
  if (postfix == "AB+CD++E*") { // case (A+B+(C+D))*E
    postfix = "AB+C+D+E*";
  }
  return postfix;
}

/* -- 3. Arrange transistors in a matrix based on postfix -- */
function postfixToPMOS(postfix) {
  let stack = [];
  let matrix = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  let rank = 1;
  let row = 0;
  let col = 0;
  let prevOperator = 0;

  for (let i = 0; i < postfix.length; i++) {
    let token = postfix[i];

    if (token === 'A' || token === 'B' || token === 'C' || token === 'D' || token === 'E') {
      stack.push(token);
    } else {
      let a = stack.pop();
      let b = stack.pop();
      if (token === '*') {
        if (token != prevOperator && prevOperator != 0 && (b.length == 1 || a.length == 1)) {
          rank++;
          if (b.length == 1 && a.length == 1 && matrix[row][col] != 0) {
            row++;
          }
        } 
        else if (token == prevOperator && b.length == 1 && a.length == 1 && matrix[row][col] != 0) { 
          rank++;
          col++;
        }
        if (b.length == 1) {
          if (matrix[row][col] != 0) {
            col++;
            matrix[row][col] = b + ":" + rank
          } else {
            matrix[row][col] = b + ":" + rank
          }
        }
        if (a.length == 1) {
          if (matrix[row][col] != 0) {
            col++;
            matrix[row][col] = a + ":" + rank
          } else {
            matrix[row][col] = a + ":" + rank
          }
        }
        prevOperator = token;
        stack.push(b + "*" + a);
      } else if (token === '+') {
        if (token != prevOperator && prevOperator != 0 && (b.length == 1 || a.length == 1)) {
          rank++;
          if (b.length == 1 && a.length == 1 && matrix[row][col] != 0) {
            col++;
          }
        }
        else if (token == prevOperator && b.length == 1 && a.length == 1 && matrix[row][col] != 0) {
          rank++;
          row++;
        }
        if (b.length == 1) {
          if (matrix[row][col] != 0) {
            row++;
            matrix[row][col] = b + ":" + rank
          } else {
            matrix[row][col] = b + ":" + rank
          }
        }
        if (a.length == 1) {
          if (matrix[row][col] != 0) {
            row++;
            matrix[row][col] = a + ":" + rank
          } else {
            matrix[row][col] = a + ":" + rank
          }
        }
        prevOperator = token;
        stack.push(b + "+" + a);
      }
    }
  }

  // re adjusting positions for some cases
  if (postfix == "AB*CD*+") { // case A*B+C*D
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:2', 'D:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*C*DE*+") { // case A*B*C+D*E
    matrix = [['A:1', 'B:1', 'C:1', 0, 0], [0, 'D:2', 'E:2', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CD*E*+") { // case A*B+C*D*E
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:2', 'D:2', 'E:2', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CD*+E+") { // case A*B+C*D+E
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:2', 'D:2', 0, 0, 0], [0, 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC*+DE*+" || postfix == "ABC*DE*++") { // case  A+B*C+D*E or A+(B*C+D*E)
    matrix = [['A:1', 0, 0, 0, 0], ['B:2', 'C:2', 0, 0, 0], ['D:3', 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*C+DE*+") { // case A*B+C+D*E
    matrix = [['A:1', 'B:1', 0, 0, 0], [0, 'C:2', 0, 0, 0], ['D:3', 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC*DE*+*") { // case A*(B*C+D*E)
    matrix = [['B:1', 'C:1', 0, 0, 0], ['D:2', 'E:2', 'A:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CD*+E*") { // case (A*B+C*D)*E
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:2', 'D:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC+*DE*+") { // case A*(B+C)+D*E
    matrix = [['B:1', 0, 0, 0, 0], ['C:1', 'A:2', 0, 0, 0], ['D:3', 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+C*DE*+") { // case (A+B)*C+D*E
    matrix = [['A:1', 0, 0, 0, 0], ['B:1', 'C:2', 0, 0, 0], ['D:3', 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CD+*E+") { // case A*B*(C+D)+E
    matrix = [['C:1', 0, 0, 0, 0], ['D:1', 'A:2', 'B:2', 0, 0], [0, 0, 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD+*") { // case (A+B)*(C+D)
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC+*DE+*" || postfix == "ABC+DE+**") { // case A*(B+C)*(D+E), A*((B+C)*(D+E))
    matrix = [['A:1', 'B:2', 'D:3', 0, 0], [0, 'C:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD*E+*") { // case (A+B)*(C*D+E)
    matrix = [['A:1', 'E:3', 0, 0, 0], ['B:1', 'C:2', 'D:2', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+C*DE+*") { // case (A+B)*C*(D+E)
    matrix = [['A:1', 0, 'D:3', 0, 0], ['B:1', 'C:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD+*E*") { // case (A+B)*(C+D)*E
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CDE*+*") { // case (A+B)*(C+D*E)
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:3', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD+E+*") { // case (A+B)*(C+D+E)
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:2', 0, 0, 0], [0, 'E:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD+*E+") { // case (A+B)*(C+D)+E
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:2', 0, 0, 0], [0, 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC+DE+*+") { // case A+(B+C)*(D+E)
    matrix = [['B:1', 'D:2', 0, 0, 0], ['C:1', 'E:2', 0, 0, 0], [0, 'A:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+C+DE+*") { // case (A+B+C)*(D+E)
    matrix = [['A:1', 0, 0, 0, 0], ['B:1', 'D:2', 0, 0, 0], ['C:1', 'E:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC*+DE+*") { // case (A+B*C)*(D+E)
    matrix = [['B:1', 'C:1', 'D:3', 0, 0], [0, 'A:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*C+DE+*") { // case (A*B+C)*(D+E)
    matrix = [['A:1', 'B:1', 'D:3', 0, 0], [0, 'C:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CDE+*+") { // case A*B+C*(D+E)
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:3', 'D:2', 0, 0, 0], [0, 'E:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CD+E*+") { // case A*B+(C+D)*E
    matrix = [['A:1', 'B:1', 0, 0, 0], ['E:3', 'C:2', 0, 0, 0], [0, 'D:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }

  return matrix;
}

function postfixToNMOS(postfix) {
  let stack = [];
  let matrix = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  let rank = 1;
  let row = 0;
  let col = 0;
  let prevOperator = 0;

  for (let i = 0; i < postfix.length; i++) {
    let token = postfix[i];

    if (token === 'A' || token === 'B' || token === 'C' || token === 'D' || token === 'E') {
      stack.push(token);
    } else {
      let a = stack.pop();
      let b = stack.pop();
      if (token === '*') {
        if (token != prevOperator && prevOperator != 0 && (b.length == 1 || a.length == 1)) {
          rank++;
          if (b.length == 1 && a.length == 1 && matrix[row][col] != 0) {
            col++;
          }
        } 
        else if (token == prevOperator && b.length == 1 && a.length == 1 && matrix[row][col] != 0) {
          rank++;
          row++;
        }
        if (b.length == 1) {
          if (matrix[row][col] != 0) {
            row++;
            matrix[row][col] = b + ":" + rank
          } else {
            matrix[row][col] = b + ":" + rank
          }
        }
        if (a.length == 1) {
          if (matrix[row][col] != 0) {
            row++;
            matrix[row][col] = a + ":" + rank
          } else {
            matrix[row][col] = a + ":" + rank
          }
        }
        prevOperator = token;
        stack.push(b + "*" + a);
      } else if (token === '+') {
        if (token != prevOperator && prevOperator != 0 && (b.length == 1 || a.length == 1)) {
          rank++;
          if (b.length == 1 && a.length == 1 && matrix[row][col] != 0) {
            row++;
          }
        } 
        else if (token == prevOperator && b.length == 1 && a.length == 1 && matrix[row][col] != 0) {
          rank++;
          col++;
        }
        if (b.length == 1) {
          if (matrix[row][col] != 0) {
            col++;
            matrix[row][col] = b + ":" + rank
          } else {
            matrix[row][col] = b + ":" + rank
          }
        }
        if (a.length == 1) {
          if (matrix[row][col] != 0) {
            col++;
            matrix[row][col] = a + ":" + rank
          } else {
            matrix[row][col] = a + ":" + rank
          }
        }
        prevOperator = token;
        stack.push(b + "+" + a);
      }
    }
  }

  // re adjusting positions for some cases
  if (postfix == "AB*CD*+") { // case A*B+C*D 
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*C*DE*+") { // case A*B*C+D*E  
    matrix = [['A:1', 'D:2', 0, 0, 0], ['B:1', 'E:2', 0, 0, 0], ['C:1', 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CD*E*+") { // case A*B+C*D*E  
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:2', 0, 0, 0], [0, 'E:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CD*+E+") { // case A*B+C*D+E 
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC*+DE*+" || postfix == "ABC*DE*++") { // case  A+B*C+D*E or A+(B*C+D*E)
    matrix = [['A:1', 'B:2', 'D:3', 0, 0], [0, 'C:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*C+DE*+") { // case  A*B+C+D*E
    matrix = [['A:1', 0, 'D:3', 0, 0], ['B:1', 'C:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC*DE*+*") { // case A*(B*C+D*E) 
    matrix = [['B:1', 'D:2', 0, 0, 0], ['C:1', 'E:2', 0, 0, 0], [0, 'A:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CD*+E*") { // case (A*B+C*D)*E 
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:2', 0, 0, 0], [0, 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC+*DE*+") { // case A*(B+C)+D*E
    matrix = [['B:1', 'C:1', 'D:3', 0, 0], [0, 'A:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+C*DE*+") { // case (A+B)*C+D*E
    matrix = [['A:1', 'B:1', 'D:3', 0, 0], [0, 'C:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD*+E*") { // case (A+B+C*D)*E
    matrix = [['C:1', 0, 0, 0, 0], ['D:1', 'A:2', 'B:2', 0, 0], [0, 0, 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD*E*+") { // case A+B+C*D*E
    matrix = [['C:1', 0, 0, 0, 0], ['D:1', 0, 0, 0, 0], ['E:1', 'A:2', 'B:2', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD+*") { // case (A+B)*(C+D)
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:2', 'D:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC+*DE+*" || postfix == "ABC+DE+**") { // case A*(B+C)*(D+E), A*((B+C)*(D+E))
    matrix = [['A:1', 0, 0, 0, 0], ['B:2', 'C:2', 0, 0, 0], ['D:3', 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD*E+*") { // case (A+B)*(C*D+E)
    matrix = [['A:1', 'B:1', 0, 0, 0], ['E:3', 'C:2', 0, 0, 0], [0, 'D:2', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+C*DE+*") { // case (A+B)*C*(D+E)
    matrix = [['A:1', 'B:1', 0, 0, 0], [0, 'C:2', 0, 0, 0], ['D:3', 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD+*E*") { // case (A+B)*(C+D)*E
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:2', 'D:2', 0, 0, 0], [0, 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CDE*+*") { // case (A+B)*(C+D*E)
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:3', 'D:2', 0, 0, 0], [0, 'E:', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD+E+*") { // case (A+B)*(C+D+E)
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:2', 'D:2', 'E:2', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+CD+*E+") { // case (A+B)*(C+D)+E
    matrix = [['A:1', 'B:1', 0, 0, 0], ['C:2', 'D:2', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC+DE+*+") { // case A+(B+C)*(D+E)
    matrix = [['B:1', 'C:1', 0, 0, 0], ['D:2', 'E:2', 'A:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB+C+DE+*") { // case (A+B+C)*(D+E)
    matrix = [['A:1', 'B:1', 'C:1', 0, 0], [0, 'D:2', 'E:2', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "ABC*+DE+*") { // case (A+B*C)*(D+E)
    matrix = [['B:1', 0, 0, 0, 0], ['C:1', 'A:2', 0, 0, 0], ['D:3', 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*C+DE+*") { // case (A*B+C)*(D+E)
    matrix = [['A:1', 0, 0, 0, 0], ['B:1', 'C:2', 0, 0, 0], ['D:3', 'E:3', 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CDE+*+") { // case A*B+C*(D+E)
    matrix = [['A:1', 'C:2', 0, 0, 0], ['B:1', 'D:3', 'E:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  if (postfix == "AB*CD+E*+") { // case A*B+(C+D)*E
    matrix = [['A:1', 'E:2', 0, 0, 0], ['B:1', 'C:3', 'D:3', 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]];
  }
  return matrix;
}

/* -- 4. Draw transistors and join them -- */
function drawCircuit(matrixPMOS, matrixNMOS, postfix, inputInv, inputInv2, inverter) {
  var canvas = document.getElementById("myCanvas");
  canvas = document.querySelector('canvas');
  var myFont = new FontFace('myFont', 'url(fonts/SpaceGrotesk-Bold.ttf)');

  myFont.load().then(function (font) {

    // with canvas, if this is ommited won't work
    document.fonts.add(font);
    var g = canvas.getContext('2d');
    g.fillStyle = 'rgb(2,17,45)';
    g.fillRect(0, 0, canvas.width, canvas.height);
    g.font = "15px myFont";

    let x = 0; // dimensions of matrix PMOS
    let y = 0;
    let xN = 0; // dimensions of matrix NMOS
    let yN = 0;

    for (let row = 0; row < matrixPMOS.length; row++) {
      for (let col = 0; col < matrixPMOS[row].length; col++) {
        if (matrixPMOS[row][col] !== 0) {
          x = Math.max(x, col); // check dimension for PMOS matrix
          y = Math.max(y, row); //

          let parts = matrixPMOS[row][col].split(':');
          let letter = parts[0];
          if (letter == inputInv) {
            letter = inputMap[inputInv] + "'";
          } else if (letter == inputInv2) {
            letter = inputMap[inputInv2] + "'";
          } else {
            letter = inputMap[letter];
          }

          g.beginPath();
          g.lineWidth = 2;
          g.strokeStyle = 'rgb(59,148,240)';
          g.arc(col * 80 + 210, row * 60 + 79, 3.5, 0, 2 * Math.PI); // PMOS circle
          g.moveTo(col * 80 + 215, row * 60 + 68); // vertical line closest to circle
          g.lineTo(col * 80 + 215, row * 60 + 91); //
          g.moveTo(col * 80 + 225, row * 60 + 59); // vertical line after
          g.lineTo(col * 80 + 225, row * 60 + 101); //
          g.moveTo(col * 80 + 225, row * 60 + 72); // two horizontal lines
          g.lineTo(col * 80 + 235, row * 60 + 72); //
          g.moveTo(col * 80 + 225, row * 60 + 88); //
          g.lineTo(col * 80 + 235, row * 60 + 88); //
          g.moveTo(col * 80 + 235, row * 60 + 72); // top vertical line up
          g.lineTo(col * 80 + 235, row * 60 + 50); //
          g.moveTo(col * 80 + 235, row * 60 + 88); // bottom vertical line down
          g.lineTo(col * 80 + 235, row * 60 + 110); //
          g.moveTo(col * 80 + 206, row * 60 + 79); // input line
          g.lineTo(col * 80 + 184, row * 60 + 79); //
          g.fillStyle = "rgb(59,148,240)";
          g.fillText(letter, col * 80 + 170, row * 60 + 83);
          g.stroke();
        }
      }
    }

    // PMOS line drawing
    if (postfix == "AB*CDE+*+" || postfix == "AB*CD+E*+") { // case A*B+C*(D+E) or A*B+(C+D)*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(1 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 0 * 60 + 110);
      g.lineTo(0 * 80 + 235, 0 * 60 + 110);
      g.moveTo(1 * 80 + 235, 2 * 60 + 110);
      g.lineTo(0 * 80 + 235, 2 * 60 + 110);
      g.moveTo(0 * 80 + 235, 2 * 60 + 110);
      g.lineTo(0 * 80 + 235, 1 * 60 + 110);
      g.stroke();
    } else if (postfix == "AB*CD+*E*") { // case A*B*(C+D)*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(3 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 0 * 60 + 110);
      g.lineTo(0 * 80 + 235, 0 * 60 + 110);
      g.moveTo(3 * 80 + 235, 1 * 60 + 110);
      g.lineTo(1 * 80 + 235, 1 * 60 + 110);
      g.moveTo(1 * 80 + 235, 1 * 60 + 110);
      g.lineTo(1 * 80 + 235, 0 * 60 + 110);
      g.moveTo(3 * 80 + 235, 1 * 60 + 50);
      g.lineTo(3 * 80 + 235, 0 * 60 + 50);
      g.stroke();
    } else if (postfix == "AB+CDE+*+" || postfix == "AB+CD+E*+") { // case A+B+C*(D+E) or A+B+(C+D)*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(1 * 80 + 235, 2 * 60 + 50);
      g.lineTo(0 * 80 + 235, 2 * 60 + 50);
      g.moveTo(1 * 80 + 235, 3 * 60 + 110);
      g.lineTo(0 * 80 + 235, 3 * 60 + 110);
      g.moveTo(1 * 80 + 235, 2 * 60 + 110);
      g.lineTo(1 * 80 + 235, 1 * 60 + 110);
      g.stroke();
    } else if (postfix == "AB*CD*E+*" || postfix == "AB*CDE*+*") { // case A*B*(C*D+E) or A*B*(C+D*E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(3 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 0 * 60 + 110);
      g.lineTo(0 * 80 + 235, 0 * 60 + 110);
      g.moveTo(3 * 80 + 235, 0 * 60 + 110);
      g.lineTo(2 * 80 + 235, 0 * 60 + 110);
      g.moveTo(3 * 80 + 235, 1 * 60 + 110);
      g.lineTo(1 * 80 + 235, 1 * 60 + 110);
      g.moveTo(1 * 80 + 235, 0 * 60 + 110);
      g.lineTo(1 * 80 + 235, 1 * 60 + 110);
      g.stroke();
    } else if (postfix == "AB*CD+E+*") { // case A*B*(C+D+E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(2 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 0 * 60 + 110);
      g.lineTo(0 * 80 + 235, 0 * 60 + 110);
      g.moveTo(2 * 80 + 235, 2 * 60 + 110);
      g.lineTo(1 * 80 + 235, 2 * 60 + 110);
      g.moveTo(1 * 80 + 235, 0 * 60 + 110);
      g.lineTo(1 * 80 + 235, 2 * 60 + 110);
      g.stroke();
    }
    else if (postfix == "AB*C*DE+*") { // case A*B*C*(D+E) 
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(3 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(2 * 80 + 235, 0 * 60 + 110);
      g.lineTo(0 * 80 + 235, 0 * 60 + 110);
      g.moveTo(3 * 80 + 235, 1 * 60 + 110);
      g.lineTo(2 * 80 + 235, 1 * 60 + 110);
      g.moveTo(2 * 80 + 235, 1 * 60 + 110);
      g.lineTo(2 * 80 + 235, 0 * 60 + 110);
      g.stroke();
    }
    else if (postfix == "AB*CD+*") { // case A*B*(C+D)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(2 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 0 * 60 + 110);
      g.lineTo(0 * 80 + 235, 0 * 60 + 110);
      g.moveTo(2 * 80 + 235, 1 * 60 + 110);
      g.lineTo(1 * 80 + 235, 1 * 60 + 110);
      g.moveTo(1 * 80 + 235, 1 * 60 + 110);
      g.lineTo(1 * 80 + 235, 0 * 60 + 110);
      g.stroke();
    }
    else if (postfix == "ABC*DE+*+") { // case A+B*C*(D+E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(2 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 0 * 60 + 110);
      g.lineTo(0 * 80 + 235, 0 * 60 + 110);
      g.moveTo(2 * 80 + 235, 1 * 60 + 110);
      g.lineTo(1 * 80 + 235, 1 * 60 + 110);
      g.moveTo(1 * 80 + 235, 1 * 60 + 110);
      g.lineTo(1 * 80 + 235, 0 * 60 + 110);
      g.stroke();
    }
    else if (postfix == "AB+CD+*" || postfix == "AB+CD+*E+" || postfix == "ABC+DE+*+") { // case (A+B)*(C+D), (A+B)*(C+D)+E, A+(B+C)*(D+E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(1 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 1 * 60 + 110);
      g.lineTo(0 * 80 + 235, 1 * 60 + 110);
      g.stroke();
    }
    else if (postfix == "ABC+*DE+*" || postfix == "ABC+DE+**") { // case A*(B+C)*(D+E), A*((B+C)*(D+E))
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(2 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(2 * 80 + 235, 1 * 60 + 110);
      g.lineTo(0 * 80 + 235, 1 * 60 + 110);
      g.moveTo(0 * 80 + 235, 2 * 60 + 50);
      g.lineTo(0 * 80 + 235, 1 * 60 + 50);
      g.stroke();
    }
    else if (postfix == "AB+CD*E+*" || postfix == "AB+CDE*+*") { // case (A+B)*(C*D+E), (A+B)*(C+D*E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(1 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(2 * 80 + 235, 1 * 60 + 110);
      g.lineTo(0 * 80 + 235, 1 * 60 + 110);
      g.moveTo(2 * 80 + 235, 1 * 60 + 50);
      g.lineTo(1 * 80 + 235, 1 * 60 + 50);
      g.stroke();
    }
    else if (postfix == "AB+C*DE+*") { // case (A+B)*C*(D+E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(2 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(2 * 80 + 235, 1 * 60 + 110);
      g.lineTo(0 * 80 + 235, 1 * 60 + 110);
      g.moveTo(1 * 80 + 235, 1 * 60 + 50);
      g.lineTo(1 * 80 + 235, 0 * 60 + 50);
      g.stroke();
    } else if (postfix == "AB+CD+*E*") { // case (A+B)*(C+D)*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(2 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(2 * 80 + 235, 1 * 60 + 110);
      g.lineTo(0 * 80 + 235, 1 * 60 + 110);
      g.moveTo(2 * 80 + 235, 1 * 60 + 50);
      g.lineTo(2 * 80 + 235, 0 * 60 + 50);
      g.stroke();
    }
    else if (postfix == "AB+CD+E+*") { // case (A+B)*(C+D+E) 
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(1 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 2 * 60 + 110);
      g.lineTo(0 * 80 + 235, 2 * 60 + 110);
      g.moveTo(0 * 80 + 235, 2 * 60 + 110);
      g.lineTo(0 * 80 + 235, 1 * 60 + 110);
      g.stroke();
    }
    else if (postfix == "AB+C+DE+*") { // case (A+B+C)*(D+E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(1 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 2 * 60 + 110);
      g.lineTo(0 * 80 + 235, 2 * 60 + 110);
      g.moveTo(1 * 80 + 235, 1 * 60 + 50);
      g.lineTo(1 * 80 + 235, 0 * 60 + 50);
      g.stroke();
    }
    else if (postfix == "ABC*+DE+*" || postfix == "AB*C+DE+*") { // case (A+B*C)*(D+E), (A*B+C)*(D+E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(59,148,240)';
      g.moveTo(2 * 80 + 235, 0 * 60 + 50);
      g.lineTo(0 * 80 + 235, 0 * 60 + 50);
      g.moveTo(1 * 80 + 235, 1 * 60 + 50);
      g.lineTo(0 * 80 + 235, 1 * 60 + 50);
      g.moveTo(2 * 80 + 235, 1 * 60 + 110);
      g.lineTo(1 * 80 + 235, 1 * 60 + 110);
      g.stroke();
    } 
    else {
      for (let row = 0; row < matrixPMOS.length; row++) {
        let prevCol = 0;
        for (let col = 0; col < matrixPMOS[row].length; col++) {
          if (matrixPMOS[row][col] !== 0) {
            let parts = matrixPMOS[row][col].split(':');
            let number = parseInt(parts[1]);
            if (number == prevCol) {
              g.beginPath();
              g.lineWidth = 2;
              g.strokeStyle = 'rgb(59,148,240)';
              // draw parallel lines for same rank
              g.moveTo(col * 80 + 235, row * 60 + 50);
              g.lineTo((col - 1) * 80 + 235, row * 60 + 50);
              g.moveTo(col * 80 + 235, row * 60 + 110);
              g.lineTo((col - 1) * 80 + 235, row * 60 + 110);
              g.stroke();
            }

            if ((number - 1 == prevCol && number - 1 != 0)) {
              g.beginPath();
              g.lineWidth = 2;
              g.strokeStyle = 'rgb(59,148,240)';
              // draw parallel lines for same rank
              g.moveTo(col * 80 + 235, row * 60 + 50);
              g.lineTo(col * 80 + 235, 0 * 60 + 50);
              g.moveTo(col * 80 + 235, 0 * 60 + 50);
              g.lineTo(0 * 80 + 235, 0 * 60 + 50);
              g.moveTo(col * 80 + 235, row * 60 + 110);
              g.lineTo((col - 1) * 80 + 235, row * 60 + 110);
              g.stroke();
            }
            prevCol = number;
          }
        }
      }
    }

    x++; y++;

    for (let row = 0; row < matrixNMOS.length; row++) {
      for (let col = 0; col < matrixNMOS[row].length; col++) {
        if (matrixNMOS[row][col] !== 0) {
          xN = Math.max(xN, col); // check dimension for NMOS matrix
          yN = Math.max(yN, row); //

          let parts = matrixNMOS[row][col].split(':');
          let letter = parts[0];
          if (letter == inputInv) {
            letter = inputMap[inputInv] + "'";
          } else if (letter == inputInv2) {
            letter = inputMap[inputInv2] + "'";
          } else {
            letter = inputMap[letter];
          }

          g.beginPath();
          g.lineWidth = 2;
          g.strokeStyle = 'rgb(250,76,59)';
          g.moveTo(col * 80 + 215, (y + row) * 60 + 88); // leftmost vertical line 
          g.lineTo(col * 80 + 215, (y + row) * 60 + 111); //
          g.moveTo(col * 80 + 225, (y + row) * 60 + 79); // vertical line after
          g.lineTo(col * 80 + 225, (y + row) * 60 + 121); //
          g.moveTo(col * 80 + 225, (y + row) * 60 + 92); // two horizontal lines
          g.lineTo(col * 80 + 235, (y + row) * 60 + 92); //
          g.moveTo(col * 80 + 225, (y + row) * 60 + 108); //
          g.lineTo(col * 80 + 235, (y + row) * 60 + 108); //
          g.moveTo(col * 80 + 235, (y + row) * 60 + 92); // top vertical line up
          g.lineTo(col * 80 + 235, (y + row) * 60 + 70); //
          g.moveTo(col * 80 + 235, (y + row) * 60 + 108); // bottom vertical line down
          g.lineTo(col * 80 + 235, (y + row) * 60 + 130); //
          g.moveTo(col * 80 + 214, (y + row) * 60 + 99); // input line
          g.lineTo(col * 80 + 184, (y + row) * 60 + 99); //
          g.fillStyle = "rgb(250,76,59)";
          g.fillText(letter, col * 80 + 170, (y + row) * 60 + 103);
          g.stroke();
        }
      }
    }

    xN++; yN++;

    // NMOS line drawing
    if (postfix == "AB*CDE+*+" || postfix == "AB*CD+E*+") { // case A*B+C*(D+E) or A*B+(C+D)*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(1 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(2 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 1) * 60 + 130);
      g.moveTo(2 * 80 + 235, (y + 1) * 60 + 70);
      g.lineTo(1 * 80 + 235, (y + 1) * 60 + 70);
      g.stroke();
    } else if (postfix == "AB+CDE+*+" || postfix == "AB+CD+E*+") { // case A+B+C*(D+E) or A+B+(C+D)*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(3 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(1 * 80 + 235, y * 60 + 130);
      g.lineTo(0 * 80 + 235, y * 60 + 130);
      g.moveTo(3 * 80 + 235, y * 60 + 130);
      g.lineTo(2 * 80 + 235, y * 60 + 130);
      g.moveTo(3 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(1 * 80 + 235, (y + 1) * 60 + 130);
      g.moveTo(1 * 80 + 235, y * 60 + 110);
      g.lineTo(1 * 80 + 235, (y + 1) * 60 + 130);
      g.stroke();
    } else if (postfix == "AB*CD*E+*" || postfix == "AB*CDE*+*") { // case A*B*(C*D+E) or A*B*(C+D*E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(1 * 80 + 235, (y + 2) * 60 + 70);
      g.lineTo(0 * 80 + 235, (y + 2) * 60 + 70);
      g.moveTo(1 * 80 + 235, (y + 3) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 3) * 60 + 130);
      g.moveTo(1 * 80 + 235, (y + 2) * 60 + 130);
      g.lineTo(1 * 80 + 235, (y + 1) * 60 + 130);
      g.stroke();
    } else if (postfix == "AB*CD*+") { // case A*B+C*D 
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(1 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(1 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 1) * 60 + 130);
      g.stroke();
    } else if (postfix == "AB*C*DE*+") { // case A*B*C+D*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(1 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(1 * 80 + 235, (y + 2) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 2) * 60 + 130);
      g.moveTo(1 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(1 * 80 + 235, (y + 2) * 60 + 130);
      g.stroke();
    } else if (postfix == "AB*CD*E*+") { // case A*B+C*D*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(1 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(1 * 80 + 235, (y + 2) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 2) * 60 + 130);
      g.moveTo(0 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 2) * 60 + 130);
      g.stroke();
    } else if (postfix == "AB*CD*+E+") { // case A*B+C*D+E 
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(2 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(2 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 1) * 60 + 130);
      g.moveTo(2 * 80 + 235, (y + 1) * 60 + 70);
      g.lineTo(2 * 80 + 235, y * 60 + 70);
      g.stroke();
    } else if (postfix == "ABC*+DE*+" || postfix == "ABC*DE*++") { // case  A+B*C+D*E or A+(B*C+D*E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(2 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(2 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 1) * 60 + 130);
      g.moveTo(0 * 80 + 235, (y + 2) * 60 + 70);
      g.lineTo(0 * 80 + 235, (y + 1) * 60 + 70);
      g.stroke();
    } else if (postfix == "AB*C+DE*+") { // case A*B+C+D*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(2 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(2 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 1) * 60 + 130);
      g.moveTo(1 * 80 + 235, (y + 1) * 60 + 70);
      g.lineTo(1 * 80 + 235, y * 60 + 70);
      g.stroke();
    }
    else if (postfix == "ABC*DE*+*") { // case A*(B*C+D*E) 
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(1 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(1 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 1) * 60 + 130);
      g.stroke();
    } else if (postfix == "AB+CD*+E+" || postfix == "AB+CD*E++") { // case A+B+C*D+E, A+B+(C*D+E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(3 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(1 * 80 + 235, y * 60 + 130);
      g.lineTo(0 * 80 + 235, y * 60 + 130);
      g.moveTo(3 * 80 + 235, (y + 2) * 60 + 70);
      g.lineTo(1 * 80 + 235, (y + 2) * 60 + 70);
      g.moveTo(1 * 80 + 235, (y + 2) * 60 + 70);
      g.lineTo(1 * 80 + 235, (y + 1) * 60 + 70);
      g.moveTo(3 * 80 + 235, (y + 1) * 60 + 70);
      g.lineTo(3 * 80 + 235, y * 60 + 70);
      g.stroke();
    } else if (postfix == "ABC+*DE*+" || postfix == "AB+C*DE*+") { // case A*(B+C)+D*E or (A+B)*C+D*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(2 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(1 * 80 + 235, y * 60 + 130);
      g.lineTo(0 * 80 + 235, y * 60 + 130);
      g.moveTo(2 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(1 * 80 + 235, (y + 1) * 60 + 130);
      g.stroke();
    } else if (postfix == "AB+C+DE*+" || postfix == "ABC++DE*+") { // case A+B+C+D*E or A+(B+C)+D*E
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(3 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(2 * 80 + 235, y * 60 + 130);
      g.lineTo(0 * 80 + 235, y * 60 + 130);
      g.moveTo(3 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(2 * 80 + 235, (y + 1) * 60 + 130);
      g.moveTo(2 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(2 * 80 + 235, (y) * 60 + 130);
      g.stroke();
    }
    else if (postfix == "AB+CD*+" || postfix == "ABC+DE*+*") { // case A+B+C*D, A*(B+C+D*E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(2 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(1 * 80 + 235, y * 60 + 130);
      g.lineTo(0 * 80 + 235, y * 60 + 130);
      g.moveTo(2 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(1 * 80 + 235, (y + 1) * 60 + 130);
      g.moveTo(1 * 80 + 235, (y + 1) * 60 + 130);
      g.lineTo(1 * 80 + 235, (y) * 60 + 130);
      g.stroke();
    }
    else if (postfix == "AB+CD*E+*" || postfix == "AB+CDE*+*") { // case (A+B)*(C*D+E), (A+B)*(C+D*E)
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(1 * 80 + 235, y * 60 + 70);
      g.lineTo(0 * 80 + 235, y * 60 + 70);
      g.moveTo(1 * 80 + 235, y * 60 + 130);
      g.lineTo(0 * 80 + 235, y * 60 + 130);
      g.moveTo(1 * 80 + 235, (y + 2) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 2) * 60 + 130);
      g.moveTo(0 * 80 + 235, (y + 2) * 60 + 130);
      g.lineTo(0 * 80 + 235, (y + 1) * 60 + 130);
      g.stroke();
    }
    else {
      for (let row = 0; row < matrixNMOS.length; row++) {
        let prevCol = 0;
        for (let col = 0; col < matrixNMOS[row].length; col++) {
          if (matrixNMOS[row][col] !== 0) {
            let parts = matrixNMOS[row][col].split(':');
            let number = parseInt(parts[1]);
            if (number == prevCol) {
              g.beginPath();
              g.lineWidth = 2;
              g.strokeStyle = 'rgb(250,76,59)';
              // draw parallel lines for same rank
              g.moveTo(col * 80 + 235, (y + row) * 60 + 70);
              g.lineTo((col - 1) * 80 + 235, (y + row) * 60 + 70);
              g.moveTo(col * 80 + 235, (y + row) * 60 + 130);
              g.lineTo((col - 1) * 80 + 235, (y + row) * 60 + 130);
              g.stroke();
            }

            if ((number - 1 == prevCol && number - 1 != 0)) {
              g.beginPath();
              g.lineWidth = 2;
              g.strokeStyle = 'rgb(250,76,59)';
              // draw parallel lines for same rank
              g.moveTo(col * 80 + 235, (y + row) * 60 + 70);
              g.lineTo(col * 80 + 235, y * 60 + 70);
              g.moveTo(col * 80 + 235, y * 60 + 70);
              g.lineTo(0 * 80 + 235, y * 60 + 70);
              g.moveTo(col * 80 + 235, (y + row) * 60 + 130);
              g.lineTo((col - 1) * 80 + 235, (y + row) * 60 + 130);
              g.stroke();
            }

            prevCol = number;
          }
        }
      }
    }

    // Draw Vcc
    g.beginPath();
    g.lineWidth = 2;
    g.strokeStyle = 'rgb(255,202,51)';
    g.moveTo(235, 50);
    g.lineTo(235, 28);
    g.moveTo(225, 28);
    g.lineTo(245, 28);
    g.fillStyle = 'rgb(255,202,51)';
    g.fillText("V", 230, 17);
    g.fillText("cc", 240, 23);
    g.stroke();

    // Draw output inverter
    if (inverter == 0) {
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(255,202,51)';
      g.moveTo((x - 1) * 80 + 235, (y - 1) * 60 + 110);    // PMOS to output
      g.lineTo((x - 1) * 80 + 235, (y - 1) * 60 + 120);    //
      x = Math.max(x, xN);                                // adjusting output inverter to fit to rightmost transitor
      g.moveTo(235, (y - 1) * 60 + 120);                   // NMOS to output
      g.lineTo(235, (y - 1) * 60 + 130);                   //
      g.moveTo(235, (y - 1) * 60 + 120);                   // output to inverter
      g.lineTo((x - 1) * 80 + 263, (y - 1) * 60 + 120);   //
      g.stroke();
      // PMOS inverter
      g.beginPath();
      g.arc(x * 80 + 210, (y - 1) * 60 + 89, 3.5, 0, 2 * Math.PI); // PMOS circle
      g.moveTo(x * 80 + 215, (y - 1) * 60 + 78);                   // vertical line closest to circle
      g.lineTo(x * 80 + 215, (y - 1) * 60 + 101);                  // 
      g.moveTo(x * 80 + 225, (y - 1) * 60 + 69);                   // vertical line after
      g.lineTo(x * 80 + 225, (y - 1) * 60 + 111);                  // 
      g.moveTo(x * 80 + 225, (y - 1) * 60 + 82);                   // two horizontal lines
      g.lineTo(x * 80 + 235, (y - 1) * 60 + 82);                   // 
      g.moveTo(x * 80 + 225, (y - 1) * 60 + 98);                   //
      g.lineTo(x * 80 + 235, (y - 1) * 60 + 98);                   //
      g.moveTo(x * 80 + 235, (y - 1) * 60 + 82);                   // top vertical line up to Vcc level
      g.lineTo(x * 80 + 235, 40);                                  //
      g.moveTo(x * 80 + 235, 40);                                  // line back to Vcc
      g.lineTo(235, 40);                                           //
      g.moveTo(x * 80 + 235, (y - 1) * 60 + 98);                   // bottom vertical line down
      g.lineTo(x * 80 + 235, (y - 1) * 60 + 120);                  //
      g.moveTo(x * 80 + 206, (y - 1) * 60 + 89);                   // input line
      g.lineTo(x * 80 + 184, (y - 1) * 60 + 89);                   //
      g.stroke();
      //NMOS inverter 
      g.beginPath();
      g.moveTo(x * 80 + 215, (y - 1) * 60 + 138);              // vertical line closest to circle
      g.lineTo(x * 80 + 215, (y - 1) * 60 + 161);              // 
      g.moveTo(x * 80 + 225, (y - 1) * 60 + 129);              // vertical line after
      g.lineTo(x * 80 + 225, (y - 1) * 60 + 171);              // 
      g.moveTo(x * 80 + 225, (y - 1) * 60 + 142);              // two horizontal lines
      g.lineTo(x * 80 + 235, (y - 1) * 60 + 142);              // 
      g.moveTo(x * 80 + 225, (y - 1) * 60 + 158);              //
      g.lineTo(x * 80 + 235, (y - 1) * 60 + 158);              //
      g.moveTo(x * 80 + 235, (y - 1) * 60 + 142);              // top vertical line up
      g.lineTo(x * 80 + 235, (y - 1) * 60 + 120);              // 
      g.moveTo(x * 80 + 235, (y - 1) * 60 + 158);              // bottom vertical line down
      g.lineTo(x * 80 + 235, (y + yN - 1) * 60 + 140);         //
      g.moveTo(x * 80 + 235, (y + yN - 1) * 60 + 140);         // line to ground
      g.lineTo((xN - 1) * 80 + 235, (y + yN - 1) * 60 + 140);  //
      g.moveTo(x * 80 + 214, (y - 1) * 60 + 149);              // input line
      g.lineTo(x * 80 + 184, (y - 1) * 60 + 149);              //
      g.stroke();
      g.beginPath();
      g.moveTo(x * 80 + 184, (y - 1) * 60 + 89);               // joining inverters
      g.lineTo(x * 80 + 184, (y - 1) * 60 + 149);              //
      g.moveTo(x * 80 + 235, (y - 1) * 60 + 120);              // output line
      g.lineTo(x * 80 + 265, (y - 1) * 60 + 120);             // output line
      g.fillStyle = 'rgb(255,202,51)';
      g.fillText("Z", x * 80 + 273, (y - 1) * 60 + 125);      // output
      g.stroke();
    } else {
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(255,202,51)';
      g.moveTo((x - 1) * 80 + 235, (y - 1) * 60 + 110); // PMOS to output
      g.lineTo((x - 1) * 80 + 235, (y - 1) * 60 + 120); //
      x = Math.max(x, xN);                             // adjusting output inverter to fit to rightmost transitor
      g.moveTo(235, (y - 1) * 60 + 120);                // NMOS to output
      g.lineTo(235, (y - 1) * 60 + 130);                //
      g.moveTo(235, (y - 1) * 60 + 120);                // output to inverter
      g.lineTo((x - 1) * 80 + 265, (y - 1) * 60 + 120);//
      g.fillStyle = 'rgb(255,202,51)';
      g.fillText("Z", (x - 1) * 80 + 273, (y - 1) * 60 + 125); // output
      g.stroke();
    }

    // Draw Ground
    g.beginPath();
    g.lineWidth = 2;
    g.strokeStyle = 'rgb(255,202,51)';
    g.moveTo((xN - 1) * 80 + 235, (y + yN - 1) * 60 + 130); // line down
    g.lineTo((xN - 1) * 80 + 235, (y + yN - 1) * 60 + 152); // 
    g.moveTo((xN - 1) * 80 + 230, (y + yN - 1) * 60 + 152); // draw triangle horizontal side
    g.lineTo((xN - 1) * 80 + 240, (y + yN - 1) * 60 + 152); //
    g.moveTo((xN - 1) * 80 + 230, (y + yN - 1) * 60 + 152); // left side
    g.lineTo((xN - 1) * 80 + 235, (y + yN - 1) * 60 + 162); // 
    g.moveTo((xN - 1) * 80 + 240, (y + yN - 1) * 60 + 152); // right side
    g.lineTo((xN - 1) * 80 + 235, (y + yN - 1) * 60 + 162); // 
    g.stroke();

    // Draw Input Inverters
    if (inputInv != 0) {
      // Draw Vcc
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(255,202,51)';
      g.moveTo(105, 50);
      g.lineTo(105, 28);
      g.moveTo(95, 28);
      g.lineTo(115, 28);
      g.fillStyle = 'rgb(255,202,51)';
      g.fillText("V", 100, 17);
      g.fillText("cc", 110, 23);
      g.stroke();
      // PMOS inverter
      g.beginPath();
      g.strokeStyle = 'rgb(59,148,240)';
      g.arc(80, 79, 3.5, 0, 2 * Math.PI); // PMOS circle
      g.moveTo(85, 68);                   // vertical line closest to circle
      g.lineTo(85, 91);                  // 
      g.moveTo(95, 59);                   // vertical line after
      g.lineTo(95, 101);                  // 
      g.moveTo(95, 72);                   // two horizontal lines
      g.lineTo(105, 72);                   // 
      g.moveTo(95, 88);                   //
      g.lineTo(105, 88);                   //
      g.moveTo(105, 72);                   // top vertical line up to Vcc level
      g.lineTo(105, 50);                                  //
      g.moveTo(105, 88);                   // bottom vertical line down
      g.lineTo(105, 110);                  //
      g.moveTo(76, 79);                   // input line
      g.lineTo(54, 79);                   //
      g.stroke();
      //NMOS inverter 
      g.beginPath();
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(85, 128);              // vertical line closest to circle
      g.lineTo(85, 151);              // 
      g.moveTo(95, 119);              // vertical line after
      g.lineTo(95, 161);              // 
      g.moveTo(95, 132);              // two horizontal lines
      g.lineTo(105, 132);              // 
      g.moveTo(95, 148);              //
      g.lineTo(105, 148);              //
      g.moveTo(105, 132);              // top vertical line up
      g.lineTo(105, 110);              // 
      g.moveTo(105, 148);              // bottom vertical line down
      g.lineTo(105, 170);
      g.moveTo(84, 139);              // input line
      g.lineTo(54, 139);              //
      g.stroke();
      g.beginPath();
      g.strokeStyle = 'rgb(255,202,51)';
      g.moveTo(54, 79);               // joining inverters
      g.lineTo(54, 139);              //
      g.moveTo(105, 110);              // output line
      g.lineTo(135, 110);             // output line
      g.fillStyle = 'rgb(255,202,51)';
      g.fillText(inputMap[inputInv] + "'", 143, 115);      // output
      g.moveTo(54, 110);              // input line
      g.lineTo(24, 110);             // input line
      g.fillText(inputMap[inputInv], 10, 115);      // input
      g.stroke();
      // Draw Ground
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(255,202,51)';
      g.moveTo(105, 170); // line down
      g.lineTo(105, 192); // 
      g.moveTo(100, 192); // draw triangle horizontal side
      g.lineTo(110, 192); //
      g.moveTo(100, 192); // left side
      g.lineTo(105, 202); // 
      g.moveTo(110, 192); // right side
      g.lineTo(105, 202); // 
      g.stroke();
    }

    if (inputInv2 != 0) {
      // Draw Vcc
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(255,202,51)';
      g.moveTo(105, 300);
      g.lineTo(105, 278);
      g.moveTo(95, 278);
      g.lineTo(115, 278);
      g.fillStyle = 'rgb(255,202,51)';
      g.fillText("V", 100, 267);
      g.fillText("cc", 110, 273);
      g.stroke();
      // PMOS inverter
      g.beginPath();
      g.strokeStyle = 'rgb(59,148,240)';
      g.arc(80, 329, 3.5, 0, 2 * Math.PI); // PMOS circle
      g.moveTo(85, 318);                   // vertical line closest to circle
      g.lineTo(85, 341);                  // 
      g.moveTo(95, 309);                   // vertical line after
      g.lineTo(95, 351);                  // 
      g.moveTo(95, 322);                   // two horizontal lines
      g.lineTo(105, 322);                   // 
      g.moveTo(95, 338);                   //
      g.lineTo(105, 338);                   //
      g.moveTo(105, 322);                   // top vertical line up to Vcc level
      g.lineTo(105, 300);                                  //
      g.moveTo(105, 338);                   // bottom vertical line down
      g.lineTo(105, 360);                  //
      g.moveTo(76, 329);                   // input line
      g.lineTo(54, 329);                   //
      g.stroke();
      //NMOS inverter 
      g.beginPath();
      g.strokeStyle = 'rgb(250,76,59)';
      g.moveTo(85, 378);              // vertical line closest to circle
      g.lineTo(85, 401);              // 
      g.moveTo(95, 369);              // vertical line after
      g.lineTo(95, 411);              // 
      g.moveTo(95, 382);              // two horizontal lines
      g.lineTo(105, 382);              // 
      g.moveTo(95, 398);              //
      g.lineTo(105, 398);              //
      g.moveTo(105, 382);              // top vertical line up
      g.lineTo(105, 360);              // 
      g.moveTo(105, 398);              // bottom vertical line down
      g.lineTo(105, 420);
      // g.lineTo(235, (y + yN - 1) * 60 + 140);         //
      g.moveTo(84, 389);              // input line
      g.lineTo(54, 389);              //
      g.stroke();
      g.beginPath();
      g.strokeStyle = 'rgb(255,202,51)';
      g.moveTo(54, 329);               // joining inverters
      g.lineTo(54, 389);              //
      g.moveTo(105, 360);              // output line
      g.lineTo(135, 360);             // output line
      g.fillStyle = 'rgb(255,202,51)';
      g.fillText(inputMap[inputInv2] + "'", 143, 365);      // output
      g.moveTo(54, 360);              // input line
      g.lineTo(24, 360);             // input line
      g.fillText(inputMap[inputInv2], 10, 365);      // input
      g.stroke();
      // Draw Ground
      g.beginPath();
      g.lineWidth = 2;
      g.strokeStyle = 'rgb(255,202,51)';
      g.moveTo(105, 420); // line down
      g.lineTo(105, 442); // 
      g.moveTo(100, 442); // draw triangle horizontal side
      g.lineTo(110, 442); //
      g.moveTo(100, 442); // left side
      g.lineTo(105, 452); // 
      g.moveTo(110, 442); // right side
      g.lineTo(105, 452); // 
      g.stroke();
    }
  });
}


/* -- Test random circuit -- */
function randomCircuit() {
  let result = generateCMOSEquation();
  let equation = result.equation;
  console.log("Equation:" + equation);
  let inputInv = result.inputInv;
  console.log("Input Inverter:" + inputInv);
  let inputInv2 = result.inputInv;
  console.log("Input Inverter2:" + inputInv2);
  let inverter = result.inverter;
  console.log("Inverter:" + inverter);

  let postfix = infixToPostfix(equation);
  console.log("Postfix Equation:" + postfix);
  let matrixPMOS = postfixToPMOS(postfix);
  console.log(matrixPMOS);
  let matrixNMOS = postfixToNMOS(postfix);
  console.log(matrixNMOS);

  drawCircuit(matrixPMOS, matrixNMOS, postfix, inputInv, inputInv2, inverter);
}

/* -- 5. Practice random circuit MCQ (index.html) -- */
let correct, correctOption, selectedOption, classToApply;
inputs = ["A", "B", "C", "D", "E"];
const inputMap = {};

// Generate random question and shuffle options
function generateMCQ() {
  // Reset options
  if (selectedOption != undefined) {
    selectedOption.parentElement.classList.remove(classToApply);
    if (correctOption.parentElement.classList.item(1) == 'correct') {
      correctOption.parentElement.classList.remove('correct');
    }
  }

  let result = generateCMOSEquation();
  let equation = result.equation;
  console.log("Equation:" + equation);
  let inputInv = result.inputInv;
  console.log("Input Inverter:" + inputInv);
  let inputInv2 = result.inputInv2;
  console.log("Input Inverter2:" + inputInv2);
  let inverter = result.inverter;
  console.log("Inverter:" + inverter);

  // Insert correct equation first
  let correctAns = equation;
  options = [correctAns];

  // Remove overall inverter 
  if (inverter == 1) {
    equation = equation.slice(1, -2)
  }
  // Remove input inverter
  if (inputInv != 0) {
    equation = equation.replace("'", "")
  }
  // Remove second input inverter
  if (inputInv2 != 0) {
    equation = equation.replace("'", "")
  }
  filtered = equation.replaceAll("(", "").replaceAll(")", "").replaceAll("+", "").replaceAll("*", ""); // Replace all removes more than 1 instances!
  for (i = 0; i < filtered.length; i++) {
    inputMap[inputs[i]] = filtered[i];
    equation = equation.replace(filtered[i], inputs[i].toLowerCase()); // So we don't misreplace the inputs
  }
  equation = equation.toUpperCase();
  console.log(equation);

  let postfix = infixToPostfix(equation);
  console.log("Postfix Equation:" + postfix);
  let matrixPMOS = postfixToPMOS(postfix);
  console.log(matrixPMOS);
  let matrixNMOS = postfixToNMOS(postfix);
  console.log(matrixNMOS);

  drawCircuit(matrixPMOS, matrixNMOS, postfix, inputInv, inputInv2, inverter);

  // Generate options
  if (inverter == 0) {
    // Incorrect 1
    let incorrectOption = "(" + correctAns + ")'";
    options.push(incorrectOption);

    // Incorrect 2
    incorrectOption = incorrectOption.replaceAll("+", "or");
    incorrectOption = incorrectOption.replaceAll("*", "and");
    incorrectOption = incorrectOption.replaceAll("or", "*");
    incorrectOption = incorrectOption.replaceAll("and", "+");
    options.push(incorrectOption);

    // Incorrect 3
    incorrectOption = correctAns.replaceAll("+", "or");
    incorrectOption = incorrectOption.replaceAll("*", "and");
    incorrectOption = incorrectOption.replaceAll("or", "*")
    incorrectOption = incorrectOption.replaceAll("and", "+");
    options.push(incorrectOption);
  } else {
    //Incorrect 1
    let incorrectOption = correctAns.slice(1, -2);
    options.push(incorrectOption);

    // Incorrect 2
    incorrectOption = incorrectOption.replaceAll("+", "or");
    incorrectOption = incorrectOption.replaceAll("*", "and");
    incorrectOption = incorrectOption.replaceAll("or", "*")
    incorrectOption = incorrectOption.replaceAll("and", "+");
    options.push(incorrectOption);

    // Incorrect 3
    incorrectOption = correctAns.replaceAll("+", "or");
    incorrectOption = incorrectOption.replaceAll("*", "and");
    incorrectOption = incorrectOption.replaceAll("or", "*")
    incorrectOption = incorrectOption.replaceAll("and", "+");
    options.push(incorrectOption);
  }

  // Shuffle options
  options.sort(() => Math.random() - 0.5);

  // Assign options to buttons
  option1.innerHTML = "Z = " + options[0];
  option2.innerHTML = "Z = " + options[1];
  option3.innerHTML = "Z = " + options[2];
  option4.innerHTML = "Z = " + options[3];

  // Store the correct option
  correct = options.indexOf(correctAns) + 1;
  correct = "option" + correct;
  correctOption = document.getElementById(correct);

  // Attach the event listeners to the options
  option1.addEventListener("click", checkAnswer);
  option2.addEventListener("click", checkAnswer);
  option3.addEventListener("click", checkAnswer);
  option4.addEventListener("click", checkAnswer);
}

// Check selected option
function checkAnswer(e) {
  selectedOption = e.target;
  classToApply = e.target.id === correct ? 'correct' : 'incorrect'

  selectedOption.parentElement.classList.add(classToApply);

  if (classToApply == 'incorrect') {
    correctOption.parentElement.classList.add('correct');
  }

  // Remove the event listeners to prevent multiple submissions
  option1.removeEventListener("click", checkAnswer);
  option2.removeEventListener("click", checkAnswer);
  option3.removeEventListener("click", checkAnswer);
  option4.removeEventListener("click", checkAnswer);
}

/* -- 6. Draw circuit based on input equation (draw-cmos.html) -- */
function drawCMOS() {
  let equation = document.getElementById("draw-input").value;
  equation = equation.trim(); // Remove whitespaces
  console.log(equation);

  // Remove output inversion
  let inverter = 0;
  if (equation.slice(-2) == ")'") {
    inverter = 1;
    equation = equation.slice(1, -2);
  }

  // Check parentheses placement
  let bracketStack = [];
  let open = { '(': true };
  let close = { ')': '(' };
  let operators = { '+': true, '*': true };

  // Check for invalid input logic function
  for (let i = 0; i < equation.length; i++) {
    let char = equation[i];
    if (open[char]) {
      // Check if the next character is an operator
      let nextChar = equation[i + 1];
      if (nextChar && (operators[nextChar] || nextChar == "'")) {
        alert("Invalid format!");
        return;
      }
      bracketStack.push(char);
    } else if (close[char]) {
      if (bracketStack.pop() !== close[char]) {
        alert("Invalid format!");
        return;
      }
      // Check if the previous character is an operator
      let prevChar = equation[i - 1];
      if (prevChar && operators[prevChar]) {
        alert("Invalid format!");
        return;
      }
    }
  }
  if (bracketStack.length != 0) {
    alert("Invalid format!");
    return;
  }
  if (equation.includes("()")) {
    alert("Invalid format!");
    return;
  }

  // Loop to assign and remove input inversions
  let inputInv = 0, inputInv2 = 0, countLetter = -1;
  if (equation.includes("'") == true) {
    for (i = 0; i < equation.length; i++) {
      if ((/[a-yA-Y]/).test(equation[i]) == true) {
        countLetter++;
      }
      if (equation[i] == "'") {
        if (((/[a-yA-Y]/).test(equation[i - 1]) == true) && (inputInv == 0)) { // Check for first inversion
          inputInv = inputs[countLetter];
          equation = equation.replace("'", "");
        } else if (((/[a-yA-Y]/).test(equation[i - 1]) == true) && (inputInv2 == 0)) { // Check for second inversion
          inputInv2 = inputs[countLetter];
          equation = equation.replace("'", "");
        } else {
          alert("Invalid format!"); // Invalid input i.e. A''
          return
        }
      }
    }
  }

  // Filter and check regexp
  filtered = equation.replaceAll("(", "").replaceAll(")", ""); // Replace all removes more than 1 instances!
  var regexp = /^[a-yA-Y]([*+][a-yA-Y]){2,4}$/;  // Regex for A?B?C , A?B?C?D , A?B?C?D?E
  if (regexp.test(filtered) == false) {
    alert("Invalid format!");
    return;
  }

  // Store inputs in an array
  filtered = filtered.replaceAll("+", "").replaceAll("*", "");
  for (i = 0; i < filtered.length; i++) {
    inputMap[inputs[i]] = filtered[i];
    equation = equation.replace(filtered[i], i); // Replace with number first
  }

  for (i = 0; i < filtered.length; i++) {
    equation = equation.replace(i, inputs[i]); // Then replace with ABCDE in that order
  }

  let postfix = infixToPostfix(equation);
  console.log("Postfix Equation:" + postfix);
  let matrixPMOS = postfixToPMOS(postfix);
  console.log(matrixPMOS);
  let matrixNMOS = postfixToNMOS(postfix);
  console.log(matrixNMOS);

  drawCircuit(matrixPMOS, matrixNMOS, postfix, inputInv, inputInv2, inverter);
}







