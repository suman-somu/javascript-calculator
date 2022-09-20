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