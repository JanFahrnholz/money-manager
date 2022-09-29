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

    public withdraw = (amount: number) => {
        const balance = this.vault + amount;

        this.setVault(balance);
    };

    public deposit = (amount: number) => {
        const balance = this.vault + amount;

        this.setVault(balance);
    };
}

export default Wallet;
