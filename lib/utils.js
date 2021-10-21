const Utils = {};

// Add more utilities here.
export const extend = Utils.extend = function(target){
	var i,j,k,o;
	for(i=1;i<arguments.length;i++){
		o=arguments[i];
		if(o !== undefined && o !== null){
			k=Object.keys(o);
			for(j=0;j<k.length;j++) target[k[j]] = o[k[j]];
		}
	}
	return target;
};



export default Utils;