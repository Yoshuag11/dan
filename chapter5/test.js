var result;
var message;
// 1
assert(true, 'BANK TEST');
var bancomer = new Bank('Bancomer');
var nip = 1234;
var account = bancomer.createAccount(nip);
// Bank test
assert(bancomer.getName() === 'Bancomer', 'Bancomer bank.');
assert(bancomer.accountExist(account), 'Account successfully created.');
assert(bancomer.getBalance(account, nip) === 0,
	'Retrieve balance.');
bancomer.deposit(account, 1000);
assert(bancomer.getBalance(account, nip) === 1000, 'Deposit.');
bancomer.withdraw(account, nip, 900);
assert(bancomer.getBalance(account, nip) === 100, 'Withdraw money.');
message = 'Forbid withdrawing more money than available.'
try {
	bancomer.withdraw(account, nip, 900);
	assert(false, message);
} catch (e) {
	assert(true, message);
}
// Client test
assert(true, 'CLIENT TEST');
var c1 = new Client(nip, bancomer);
assert(c1.getSave() === 0, 'Successfully retrieved the savings.');
c1.save(1000);
assert(c1.getSave() === 1000, 'Saved money correctly.');
c1.save('5');
assert(c1.getSave() === 1005, 'Saved correctly even with numeric strings.');
c1.save('po');
assert(c1.getSave() === 1005, 'Save handles correctly no numeric values.');
account = c1.getAccountNumber();
assert(bancomer.accountExist(account), 'Successfully retrieved the account number.');
c1.spend(5);
assert(c1.getSave() === 1000, 'Correctly spent the money.');
c1.spend('5');
assert(c1.getSave() === 995, 'Correctly spent the money, even when the amount ' +
	'was specified with a numeric string.');
message = 'Forbid client from spending beyond his savings.'
try {
	c1.spend(1000);
	assert(false, message);
} catch (e) {
	assert(true, message);
}
assert(c1.getBalance() === 0, 'Successfully retrieved bank balance.');
c1.deposit(995);
assert(c1.getBalance() === 995, 'Transference successfully (AKA deposit to bank).');
message = 'Forbidden to deposit more money of what client has saved.'
try {
	c1.deposit(1);
	assert(false, message);
} catch (e) {
	assert(true, message);
}