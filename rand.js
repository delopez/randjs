//Implementations based on:
//https://de.wikipedia.org/wiki/Xorshift#Implementierung

//XORShift 32
function xorshift32( x32 ){
    x32 ^= x32 << 13;
    x32 ^= x32 >> 17;
    x32 ^= x32 << 5;
    return x32; 
}

//XORShif t128
function Xorshift128(seed){
    this.x = xorshift32(seed);
    this.y = xorshift32(this.x);
    this.z = xorshift32(this.y);
    this.w = xorshift32(this.z);
}

Xorshift128.prototype.xorshift128 = function(){
    var t = this.x ^ ( this.x << 11 );
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = (this.w >> 19) ^ t ^ (t >> 8);
    return this.w;
}

function Rand(seed){
    this.randAlg = new Xorshift128(seed);
}

Rand.prototype.nextInt = function(){
    return this.randAlg.xorshift128();
}

var two31 = Math.pow(2, 31);

Rand.prototype.nextDouble = function(){
    return ( (this.randAlg.xorshift128()>>>0) / two31);
}

Rand.prototype.nextInRange = function(a, b) {
    var r = this.nextDouble();
    return ((b - a) * r + a + 1) | 0;
}

module.exports = Rand;
