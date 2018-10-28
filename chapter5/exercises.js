// 1
var Bank = (function () {
	/**
	 * "availableBanks" will help us to keep banks unique, according to their name,
	 * which is what make them unique withing the bank function constructor.
	 * At the same time, each bank property (from "availableBanks" object) will
	 * store the count of accounts created, just as a sort of high-level
	 * implementation of a system that generates unique account numbers, by
	 * assigning such value of each new account it creates and, after that,
	 * incrementing its counter.
	 */
	var availableBanks = {};
	return function (name) {
		var clients = {};

		function validateClient (account, nip) {
			var client = clients[account];
			if (!client) {
				throw 'Account does not exist.'
			} else if (client.nip !== nip) {
				throw 'Incorrect NIP';
			}
			return client;
		}

		// Name validation
		if (name === undefined || typeof name !== 'string') {
			throw 'Wrong name provided.';
		} else if (availableBanks[name]) {
			throw `Bank ${name} already exists`;
		} else if (!/^[a-zA-Z]{1,10}$/.test(name)) {
			throw 'The name should contain only letters ' +
				'and it can contain up to 10 characters.';
		}

		/* Initialize bank account's counter */
		availableBanks[name] = 1;
		/**
		 *  Getter for the name of the bank (not sure whether
		 * it can come in handy though)
		 */
		this.getName = function () {
			return name;
		};
		this.accountExist = function (account) {
			return !!clients[account];
		}
		this.createAccount = function (nip) {
			var account;
			if (!/^\d{4}$/.test(nip)) {
				throw 'Your "nip" should be a four-digits numeric value.';
			}
			/**
			 * Get counter value to use it as account number and
			 * increment it so that values can not be repeated.
			 */
			account = availableBanks[name]++;
			// Store the NIP of the just created account;
			clients[account] = { nip, balance: 0 };
			return account;
		};
		this.deposit =  function (account, amount) {
			// try to cast the value into number
			amount = +amount;
			if (!amount || amount < 0) {
				return;
			};
			clients[account].balance += amount;
		};
		this.getBalance = function (account, nip) {
			return validateClient(account, nip).balance;
		};
		this.withdraw = function (account, nip, amount) {
			var client = validateClient(account, nip);
			if (amount > client.balance) {
				throw 'Insufficient money to fulfill your transaction.'
			}
			// subtract the money that is being withdrawn
			client.balance -= amount;
			// return the request amount
			return amount;
		};
	};
})();
function Client (nip, bank) {
	if (bank.constructor !== Bank) {
		throw 'You need to provide a "Bank" object';
	}
	var accountNumber = bank.createAccount(nip);
	var _money = 0;
	// this.getBank the account belongs to
	this.getBankName = function () {
		bank.getName();
	};
	// Function for development environment only
	this.getAccountNumber = function () {
		return accountNumber;
	};
	this.save = function (money) {
		// try to cast the value into number
		money = +money;
		if (!money) {
			return;
		};
		_money += money;
	};
	this.spend = function (money) {
		// try to cast the value into number
		money = +money;
		if (!money) {
			return;
		};
		if (money > _money) {
			throw 'Not enough money';
		}
		_money -= money;
	};
	this.getSave = function () {
		return _money;
	};
	this.getBalance = function () {
		return bank.getBalance(accountNumber, nip);
	};
	this.deposit = function (amount, account) {
		// First, take away amount from client's savings
		this.spend(amount);
		// If an account to deposit to was not provided, then the amount
		// is deposited to the client's account.
		return bank.deposit(account || accountNumber, amount);
	};
}

// 2
function Equipment (name, floor, room) {
	this.name = name;
	this.floor = floor;
	this.room = room;
}
function User (name, floor, room, equipment) {
	this.name = name;
	this.floor = floor;
	this.room = room;
	this.equipment = equipment;
}
var building = [
	[],
	['', new User('Daniel', 1, 1), new User('Hector', 1, 2), new User('Sergio', 1, 3)],
	['', new User('Jesus', 2, 1), new User('Valeria', 2, 2, [3, 2]), new User('Aurora', 2, 3)],
	['', new User('Eduardo', 3, 1), new Equipment('satellite', 3, 2), new User('Esteban', 3, 3)]
];
function techGuy (toLook) {
	var equipment;
	var floor;
	var found;

	techGuy._values  = techGuy._values || {};
	found = techGuy._values[toLook];

	if (found) {
		return found;
	}

	for (var i = 0, l = building.length; i < l; i += 1) {
		floor = building[i];
		for (var j = 0, l2 = floor.length; j < l2; j +=1) {
			var user_equipment = floor[j];
			if (user_equipment.name === toLook) {
				return techGuy._values[toLook] = user_equipment;
			} else if (user_equipment.equipment) {
				equipment = user_equipment.equipment;
				equipment = building[equipment[0]][equipment[1]];

				if (equipment.name === toLook) {
					return techGuy._values[toLook] = equipment;
				}
			}
		}
	}
}

var t = techGuy('Daniel');
var t = techGuy('Hector');
var t = techGuy('Valeria');
var t = techGuy('Daniel');
var t = techGuy('Hector');
var t = techGuy('Valeria');
var t = techGuy('Daniel');
var t = techGuy('satellite');
var t = techGuy('satellite');
