const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("shefi");
    await domainContract.deployed();

    console.log("Contract deployed to:", domainContract.address);

    let txn = await domainContract.register("jas", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain jas.shefi");

    txn = await domainContract.setRecord("jas", "Deployed SheFi name service smart contract");
    await txn.wait();
    console.log("Set record for jas.shefi");

    // const address = await domainContract.getAddress("jas");
    // console.log("Owner of domain jas:", address);

    // const balance = await hre.ethers.provider.getBalance(domainContract.address);
    // console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();