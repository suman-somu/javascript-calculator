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
    document.getElementById('display-text').innerHTML = '';
}
function clear_partial(){
    let x = document.getElementById('display-text').innerHTML.toString;
    document.getElementById('display-text').innerHTML = x.slice(0,x.length -1);
    console.log(x.substring(0,s.length -1));
}

function result(){
    exp = document.getElementById('display-text').textContent;
    console.log(exp);
    let mid = infixToPostfix(exp);
    console.log(mid);
    console.log(evaluatePostfix(mid));
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

    let st = []; 
    let result = "";

    for(let i = 0; i < s.length; i++) {
        let c = s[i];

        if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '9'))
            result += c;

        else if(c == '(')
            st.push('(');

        else if(c == ')') {
            while(st[st.length - 1] != '(')
            {
                result += st[st.length - 1];
                st.pop();
            }
            st.pop();
        }

        else {
            while(st.length != 0 && prec(s[i]) <= prec(st[st.length - 1])) {
                result += st[st.length - 1];
                st.pop();
            }
            st.push(c);
        }
    }

    while(st.length != 0) {
        result += st[st.length - 1];
        st.pop();
    }

    return result;
}
 
function evaluatePostfix(exp)
{
        let stack=[];
          
        for(let i=0;i<exp.length;i++)
        {
            let c=exp[i];
              
            if(! isNaN( parseInt(c) ))
            stack.push(c.charCodeAt(0) - '0'.charCodeAt(0));
              
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
        return stack.pop();  
}
