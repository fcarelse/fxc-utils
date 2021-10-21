/* RecordArray
 * Optional replacement for Array to operate as a array of records.
 * 
 * @author Francis Carelse
 * @version 0.4.3.23
 */

var _Array = Array;
export const RecordArray = function(){
	_Array.call(this);
	var a = arguments[0];
	if(a instanceof _Array) a.map(function(b){
		this.push(Object.assign({},b));
	});
};
RecordArray.prototype = Object.create(Array.prototype);
RecordArray.prototype.constructor = RecordArray;
export default RecordArray;

RecordArray.isRecordArray = true;

RecordArray.overwriteArray = function(){
	Array = RecordArray;
};

RecordArray.revertArray = function(){
	Array = _Array;
};

RecordArray.prototype.toArray = function(){};

RecordArray.prototype.sortBy = function(field, order){
	if(typeof(field)!='string') throw new TypeError('String expected for first parameter.');
	if(typeof(order)!='string' || !(order.toLowerCase() == 'asc' || order.toLowerCase() == 'desc'))
		throw new TypeError('\'ASC\' or \'DESC\' String expected for second parameter.');
	return this.sort((order.toLowerCase() == 'asc')? sortASC: sortDESC);
	function sortASC(a,b){return a[field]-b[field];}
	function sortDESC(a,b){return b[field]-a[field];}
};

RecordArray.prototype.sortASC = function(){
	var fields = Array.prototype.split.apply(arguments);
	return this.sort(function(a,b){
		for(var i=0;i<fields.length;i++)
			if(a[fields[i]]!=b[fields[i]])
				return a[fields[i]]-b[fields[i]];
		return 0;
	});
};

RecordArray.prototype.sortDESC = function(){
	var fields = Array.prototype.split.apply(arguments);
	return this.sort(function(a,b){
		for(var i=0;i<fields.length;i++)
			if(b[fields[i]]!=a[fields[i]])
				return b[fields[i]]-a[fields[i]];
		return 0;
	});
};

RecordArray.prototype.read = function(options, filters){};
RecordArray.prototype.list = function(options, filters){};
RecordArray.prototype.create = function(options, filters){};
RecordArray.prototype.update = function(options, filters){};
RecordArray.prototype.delete = function(options, filters){};

RecordArray.prototype.findOne = function(key, value){
	var arr = this;
	if(value === null) return false;
	if(value === undefined) return false;
	for(var i = 0; i < arr.length; i++)
		if(arr[i][key] && arr[i][key].toString() === value.toString()) return arr[i];
	return false;
};

RecordArray.prototype.find = function(key, values, anyType){
	var arr = this;
	var bones = [];
	//if(!(key instanceof String)) return bones;
	if(!(values instanceof Array)) values = [values];
	for(var i = 0; i < arr.length; i++)
		if(anyType && values.indexOf(''+arr[i][key]) != -1) bones.push(arr[i]);
		else if(anyType && values.indexOf(0+arr[i][key]) != -1) bones.push(arr[i]);
		else if(values.indexOf(arr[i][key]) != -1) bones.push(arr[i]);
	return bones;
};

RecordArray.prototype.getName = function(id){
	var records = this.find('id',id)
	if(records.length == 0) return false;
	else if(records.length > 0) return records[0].name;
};

/*	Purpose: Creates a duplicate set of records.
	No Deep cloning as if a record has a RecordArray in a field then
	that record is supposed to point to that set of records and if
	those records are changed then those changes are supposed to be
	consistent whereever the sub record is used.
*/
RecordArray.prototype.clone = function(){
	var arr = this; // 
	var clone = [];
	for(var i = 0; i < arr.length; i++)
		clone.push( Object.assign({}, arr[i]) );
	return clone;
};

RecordArray.prototype.extend = function(arr){
	Object.assign(this, arr);
	return this;
};