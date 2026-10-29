(function(root){
'use strict';
const methods=[{id:'ach',name:'ACH / Bank Payment',rate:.01,fixed:0,rateLabel:'1% per transaction',tag:'Lowest fees'},{id:'tap',name:'Tap to Pay / Card Reader',rate:.027,fixed:30,rateLabel:'2.7% + $0.30 per transaction',tag:'In person'},{id:'card',name:'Credit / Debit Card',rate:.029,fixed:30,rateLabel:'2.9% + $0.30 per transaction',tag:'Card payment'}];
function split(total,count){const deposit=Math.round(total*.2),rest=total-deposit,each=Math.floor(rest/(count-1));return [deposit,...Array(count-2).fill(each),rest-each*(count-2)];}
function cover(target,method,count){if(!Number.isSafeInteger(target)||target<=0||!Number.isInteger(count)||count<1||count>50)throw Error('Invalid calculation inputs');let total=Math.ceil((target+count*method.fixed)/(1-method.rate)-1e-7),payments,fees,net;do{payments=count===1?[total]:split(total,count);fees=payments.map(p=>Math.round(p*method.rate+method.fixed));net=total-fees.reduce((a,b)=>a+b,0);if(net<target)total++;}while(net<target);return {total,payments,fees,net,fee:fees.reduce((a,b)=>a+b,0)};}
root.RoofCalculator={methods,split,cover};
if(typeof module!=='undefined')module.exports=root.RoofCalculator;
})(typeof window!=='undefined'?window:globalThis);
