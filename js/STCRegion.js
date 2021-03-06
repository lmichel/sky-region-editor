function STCRegion(stcString) {
    this.stcString = stcString;
    this.size = 0.0;
    this.raCenter = 0.0;
    this.decCenter = 0.0;           
    this.points = [];
    this.coords = [];

    this.init();
}
STCRegion.prototype = {
        init: function(){
            var elements  = this.stcString.split(" ");
            var coords = [];
            /*
             * Extract coordinates from STC string
             */
            for( var i=0 ; i<elements.length ; i++){
                if( isNumber(elements[i])) {
                    coords.push(parseFloat(elements[i]));
                }
            }
            if((coords.length %2) ){
                Modalinfo.error("STC Region " + this.stcString + " is not valid");
            } else {
                /*
                 * Get the coords extrema
                 */
                var raMin = 360, raMax = 0;
                var decMin = 90, decMax = -90;
                for( var i=0 ; i<(coords.length/2) ; i++){
                    var ra = coords[2*i];
                    var dec = coords[(2*i) + 1];
                    if( ra > raMax ) raMax = ra;
                    if( ra < raMin ) raMin = ra;
                    if( dec > decMax ) decMax = dec;
                    if( dec < decMin ) decMin = dec;
                }
                /*
                 * Get size and center
                 */
                var width = Math.abs(raMin - raMax);
                var height = Math.abs(decMin - decMax);
                this.size = (width > height) ? width: height;
                this.raCenter = raMin + width/2;
                if( this.raCenter > 360 ) this.raCenter -= 360;
                this.decCenter = decMin + height/2;
                if( this.decCenter > 90 ) this.decCenter -= 90;
                /*
                 * Build the point array for Aladin Lite
                 */
                for( var i=0 ; i<(coords.length/2) ; i++){
                    this.points.push([coords[2*i], coords[(2*i) + 1]]);
                    this.coords.push(coords[2*i]);
                    this.coords.push(coords[(2*i) + 1]);

                }
                this.points.push([coords[0], coords[1]]);
                this.coords.push(coords[0]);
                this.coords.push(coords[1]);
            }

        },
        getAladinScript : function(list){
            return this.stcString + ";sync; " 
            + this.raCenter.toFixed(6) + " " + this.decCenter.toFixed(6) + ";sync;" 
            + " zoom " + 2*this.size + " deg;";
        }
}