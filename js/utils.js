function isNumber(val) {
    var exp = new RegExp("^[+-]?[0-9]*[.]?[0-9]*([eE][+-]?[0-9]+)?$","m"); 
    return exp.test(val);
}

/**
 * return the last node of file pathname
 */
if(!String.prototype.xtractFilename){
    String.prototype.xtractFilename = function(){
        var re = new RegExp(/(\w:)?([\/\\].*)*([\/\\](.*))/);
        var m = this.match(re);
        if( m == null ) {
            return {path: "", filename: this};
        }
        else {
            return {path: m[1], filename: m[m.length-1]};
        }
    } ;
}
