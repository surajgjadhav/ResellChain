import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";
import hre from "hardhat";
import { expect } from "chai";
import { getAddress } from "viem";

describe("ResellNFT", () => {
  async function deployResellNFT() {
    const [owner, otherAccount] = await hre.viem.getWalletClients();

    const resellNFT = await hre.viem.deployContract("ResellNFT");

    const publicClient = await hre.viem.getPublicClient();

    return {
      resellNFT,
      owner,
      otherAccount,
      publicClient,
    };
  }

  describe("Deployment", async () => {
    it("Should set right owner", async () => {
      const { resellNFT, owner } = await loadFixture(deployResellNFT);

      const _owner = await resellNFT.read.owner();
      expect(getAddress(owner.account.address)).to.equal(_owner);
    });
  });

  describe("Set Issuer", async () => {
    it("should revert if caller is not owner", async () => {
      const { resellNFT, otherAccount, owner } = await loadFixture(
        deployResellNFT
      );

      const resellNFTAsOtherAccount = await hre.viem.getContractAt(
        "ResellNFT",
        resellNFT.address,
        { client: { wallet: otherAccount } }
      );

      const issuer = owner.account.address;

      expect(
        resellNFTAsOtherAccount.write.setIssuer([issuer])
      ).to.be.rejectedWith();
    });

    it("should set issuer if caller is owner", async () => {
      const { resellNFT, otherAccount, owner } = await loadFixture(
        deployResellNFT
      );

      const issuer = otherAccount.account.address;

      expect(resellNFT.write.setIssuer([issuer])).to.be.fulfilled;
    });
  });

  describe("Minting", async () => {
    it("should revert if caller is not owner or issuer", async () => {
      const { resellNFT, otherAccount, owner } = await loadFixture(
        deployResellNFT
      );

      const resellNFTAsOtherAccount = await hre.viem.getContractAt(
        "ResellNFT",
        resellNFT.address,
        { client: { wallet: otherAccount } }
      );

      const to = owner.account.address;
      const tokenURI = "ipfs://abcd";

      expect(
        resellNFTAsOtherAccount.write.mintAndUpdateProductPrice([
          to,
          tokenURI,
          100n,
        ])
      ).to.be.rejectedWith();
    });

    it("should mint if caller is owner", async () => {
      const { resellNFT, otherAccount, owner, publicClient } =
        await loadFixture(deployResellNFT);

      const to = otherAccount.account.address;
      const tokenURI = "ipfs://abcd";

      const hash = await resellNFT.write.mintAndUpdateProductPrice([
        to,
        tokenURI,
        100n,
      ]);
      await publicClient.waitForTransactionReceipt({ hash });

      const balance = await resellNFT.read.balanceOf([to]);

      expect(balance).to.equal(BigInt(1));
    });
  });
});
