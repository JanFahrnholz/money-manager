class Wallet {
    private vault: number;
    private setVault: Function;
    private balance: number;
    private setBalance: Function;

    constructor(vault: [number, Function], balance: [number, Function]) {
        this.vault = vault[0];
        this.setVault = vault[1];
        this.balance = balance[0];
        this.setBalance = balance[1];
    }
}

export default Wallet;
