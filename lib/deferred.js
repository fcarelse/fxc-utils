export const Deferred = function(){
	var fails = [];
	var dones = [];
	var thens = [];
	var nexts = [];
	var context = this;
	var resolution, rejection;
	var promise = {
		isResolved: function(){ return (resolution !== undefined); },
		isRejected: function(){ return (rejection !== undefined); },
		isDone: function(){ return (resolution !== undefined || rejection !== undefined); },
		resolve: function(result){
			if(resolution !== undefined || rejection !== undefined) return;
			resolution = result==undefined?null:result;
			var i;
			for(i=0;i<thens.length;i++) thens[i](rejection, resolution);
			for(i=0;i<dones.length;i++) dones[i](resolution);
			for(i=0;i<nexts.length;i++) nexts[i]();
			return promise;
		},
		reject: function(result){
			if(resolution !== undefined || rejection !== undefined) return;
			rejection = result==undefined?null:result;
			var i;
			for(i=0;i<thens.length;i++) thens[i](rejection, resolution);
			for(i=0;i<fails.length;i++) fails[i](rejection);
			for(i=0;i<nexts.length;i++) nexts[i]();
			return promise;
		},
		fail: function(cb){
			if(rejection !== undefined || resolution !== undefined){
				if(rejection !== undefined) cb(rejection);
			}else if(rejection !== undefined)
				for(var i=0;i<fails.length;i++) fails[i](rejection);
			return promise;
		},
		then: function(cb){
			if(rejection !== undefined || resolution !== undefined){
				if(rejection !== undefined) cb(rejection);
				else cb(resolution);
			}else thens.push(cb);
			return promise;
		},
		done: function(cb){
			if(rejection !== undefined || resolution !== undefined){
				if(resolution !== undefined) cb(resolution);
			}else dones.push(cb);
			return promise;
		},
		next: function(cb){
			if(rejection !== undefined || resolution !== undefined){
				if(rejection !== undefined) cb(rejection);
				else cb(resolution);
			}else nexts.push(cb);
			return promise;
		},
	};
	promise.promise = promise;
	return promise;
};

export default Deferred;