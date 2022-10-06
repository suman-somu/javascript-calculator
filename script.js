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



let exp = "a+b*(c^d-e)^(f+g*h)-i";

function display(x){
    var prev = document.getElementById('display-text').innerHTML;
    document.getElementById('display-text').innerHTML = prev + x ;
    // console.log(prev+x);
}

function cleaR(){
    document.getElementById('display-text').innerHTML = '';
}
function clear_partial(){
    let x = document.getElementById('display-text').textContent;
    document.getElementById('display-text').innerHTML = x.substring(0,x.length -1);
    console.log(x.substring(0,x.length -1));
}

function result(){
    exp = document.getElementById('display-text').textContent;
    // console.log(exp);
    exp = formatString(exp);
    // console.log(exp);
    let mid = infixToPostfix(exp);
    // console.log(mid);
    console.log(evaluatePostfix(mid));
    document.getElementById('display-text').innerHTML = evaluatePostfix(mid);

}

function formatString(exp){

    let result= "";

    var substring;
    for(var i =0;i<exp.length;i+=substring.length){

        // if(isAfuntion(exp[i]))
        //     result.push(exp[i]);
        // else
        
        substring = exp.substring(i, howLong(exp,i));

        result += substring + " ";
        
    }

    return result;

}

function howLong(exp, i){
    if(  exp[i]==' ' || exp[i]=='-' || exp[i]=='+' || exp[i]=='*' || exp[i]=='/')
        return i+1;
    
    var j;
    for(j=i;j<exp.length;j++){
        if(!(exp[j]>='0'&&exp[j]<='9'))
            break;

    }
    return j;
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
    let c="";

    for(let i = 0; i < s.length; i+=c.length) {
        c = s.substring(i, howLong(s,i));
        if(c==' ')
            continue;
        
        if((c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || (c >= '0' && c <= '999'))
            result += c+" ";

        else if(c == '(')
            st.push('(');

        else if(c == ')') {
            while(st[st.length - 1] != '(')
            {
                result += st[st.length - 1]+" ";
                st.pop();
            }
            st.pop();
        }

        else {
            while(st.length != 0 && prec(c) <= prec(st[st.length - 1])) {
                result += st[st.length - 1]+" ";
                st.pop();
            }
            st.push(c);
        }
    }

    while(st.length != 0) {
        result += st[st.length - 1]+" ";
        st.pop();
    }
    return result;

}

 function totalUni(c){
    var result=0;
    for(var i=0;i<c.length;i++){
        result+=c.charCodeAt(i);
    }
    return result;
 }

function evaluatePostfix(exp)
{
    let stack=[];
    let c=""; 
    for(let i=0;i<exp.length;i+=c.length+1)
    {
        c = exp.substring(i, howLong(exp,i));
            
        if(! isNaN( parseFloat(c) ))
        stack.push(parseFloat(c));
            
        else
        {
            let val1 = parseFloat(stack.pop());
            let val2 = parseFloat(stack.pop());
                
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

                case '%':
                    stack.push(val2%val1);
                    break;
            }
        }
    }
    return stack.pop();  
}
