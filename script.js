class Calculator{

    add(x, y){
        return x+y;
    }
    subtract(x,y){
        return x-y;
    }
    multiply(x,y){
        return x*y;
    }
    divide(x,y){
        return x/y;
    }
}

// window.onload = ()=>(
//     start()
//     );


let exp = "a+b*(c^d-e)^(f+g*h)-i";

function display(x){
    var prev = document.getElementById('display-text').innerHTML;
    document.getElementById('display-text').innerHTML = prev + x ;
}

function cleaR(){
    document.getElementById('display-text').innerHTML = ' ';
}
function clear_partial(){
    let x = document.getElementById('display-text').innerHTML.toString;
    document.getElementById('display-text').innerHTML = x.slice(0,x.length -1);
    console.log(x.substring(0,s.length -1));
}

function result(){
    exp = document.getElementById('display-text').textContent;
    let mid = infixToPostfix(exp);
    document.getElementById('display-text').innerHTML = evaluatePostfix(mid);
}



function prec(c) {
    if(c == '^')
        return 3;
    else if(c == '/' || c=='*')
        return 2;
    else if(c == '+' || c == '-')
        return 1;
    else
        return -1;
}

function infixToPostfix(s) {

    let st = []; //For stack operations, we are using C++ built in stack
    let result = "";

    for(let i = 0; i < s.length; i++) {
        let c = s[i];

        // If the scanned character is
        // an operand, add it to output string.
        if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))
            result += c;

        // If the scanned character is an
        // ‘(‘, push it to the stack.
        else if(c == '(')
            st.push('(');

        // If the scanned character is an ‘)’,
        // pop and to output string from the stack
        // until an ‘(‘ is encountered.
        else if(c == ')') {
            while(st[st.length - 1] != '(')
            {
                result += st[st.length - 1];
                st.pop();
            }
            st.pop();
        }

        //If an operator is scanned
        else {
            while(st.length != 0 && prec(s[i]) <= prec(st[st.length - 1])) {
                result += st[st.length - 1];
                st.pop();
            }
            st.push(c);
        }
    }

    // Pop all the remaining elements from the stack
    while(st.length != 0) {
        result += st[st.length - 1];
        st.pop();
    }

    document.write(result + "</br>");
}
 
function evaluatePostfix(exp)
{
    //create a stack
        let stack=[];
          
        // Scan all characters one by one
        for(let i=0;i<exp.length;i++)
        {
            let c=exp[i];
              
            // If the scanned character is an operand (number here),
            // push it to the stack.
            if(! isNaN( parseInt(c) ))
            stack.push(c.charCodeAt(0) - '0'.charCodeAt(0));
              
            //  If the scanned character is an operator, pop two
            // elements from stack apply the operator
            else
            {
                let val1 = stack.pop();
                let val2 = stack.pop();
                  
                switch(c)
                {
                    case '+':
                    stack.push(val2+val1);
                    break;
                      
                    case '-':
                    stack.push(val2- val1);
                    break;
                      
                    case '/':
                    stack.push(val2/val1);
                    break;
                      
                    case '*':
                    stack.push(val2*val1);
                    break;
              }
            }
        }
        return stack.pop().toString;  
}
 
// Driver program to test above functions
// let exp="231*+9-";
// document.write("postfix evaluation: "+evaluatePostfix(infixToPostfix(exp)));